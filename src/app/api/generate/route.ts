import { NextRequest, NextResponse } from "next/server";
import https from "node:https";
import { getTemplate } from "@/lib/templates";

const EVOLINK_API_URL =
  process.env.EVOLINK_API_URL || "https://api.evolink.ru/v1";
const EVOLINK_API_KEY = process.env.EVOLINK_API_KEY || "";

// Evolink cert sometimes expires — use a custom agent
const agent = new https.Agent({ rejectUnauthorized: false });

async function evolinkFetch(url: string, init: RequestInit) {
  // Node 18+ native fetch doesn't support agent directly,
  // fall back to https.request for SSL issues
  return new Promise<{ ok: boolean; status: number; json: () => Promise<any>; text: () => Promise<string> }>((resolve, reject) => {
    const parsed = new URL(url);
    const body = init.body as string;
    const req = https.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname + parsed.search,
        method: init.method || "POST",
        headers: {
          ...(init.headers as Record<string, string>),
          "Content-Length": Buffer.byteLength(body),
        },
        agent,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const raw = Buffer.concat(chunks).toString();
          resolve({
            ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300,
            status: res.statusCode || 0,
            json: () => Promise.resolve(JSON.parse(raw)),
            text: () => Promise.resolve(raw),
          });
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const templateId = formData.get("templateId") as string;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const template = getTemplate(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const isBooth = (template.photoCount || 1) > 1;
    const size = isBooth ? "1024x1536" : "1024x1024";

    const response = await evolinkFetch(
      `${EVOLINK_API_URL}/images/generations`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${EVOLINK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt: template.prompt,
          image: dataUrl,
          n: 1,
          size,
          quality: "high",
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Evolink error:", response.status, errBody);
      return NextResponse.json(
        { error: "Ошибка генерации изображения" },
        { status: 502 }
      );
    }

    const data = await response.json();

    let imageUrl: string;
    const img = data.data?.[0];
    if (img?.b64_json) {
      imageUrl = `data:image/png;base64,${img.b64_json}`;
    } else if (img?.url) {
      imageUrl = img.url;
    } else {
      console.error("Unexpected response:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Неожиданный ответ API" },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (err: any) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: err.message || "Внутренняя ошибка" },
      { status: 500 }
    );
  }
}
