import { NextRequest, NextResponse } from "next/server";
import { getTemplate } from "@/lib/templates";

const EVOLINK_API_URL =
  process.env.EVOLINK_API_URL || "https://api.evolink.ru/v1";
const EVOLINK_API_KEY = process.env.EVOLINK_API_KEY || "";

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
      return NextResponse.json(
        { error: "Template not found" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    // Call GPT Image 2 via Evolink
    const response = await fetch(`${EVOLINK_API_URL}/images/generations`, {
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
        size: "1024x1024",
        quality: "high",
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Evolink error:", response.status, errBody);
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Evolink may return b64_json or url
    let imageUrl: string;
    const img = data.data?.[0];
    if (img?.b64_json) {
      imageUrl = `data:image/png;base64,${img.b64_json}`;
    } else if (img?.url) {
      imageUrl = img.url;
    } else {
      console.error("Unexpected response:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Unexpected API response" },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (err: any) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
