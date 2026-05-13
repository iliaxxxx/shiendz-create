"use client";

import { useEffect, useRef, useState, use } from "react";
import { getTemplate } from "@/lib/templates";
import { useTelegram } from "@/lib/telegram";
import { useRouter } from "next/navigation";

type Status = "idle" | "generating" | "done" | "error";

interface PhotoSlot {
  file: File | null;
  preview: string | null;
}

export default function CreatePage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = use(params);
  const template = getTemplate(templateId);
  const router = useRouter();
  const { haptic, backButton } = useTelegram();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeSlotRef = useRef(0);

  const [photos, setPhotos] = useState<PhotoSlot[]>(
    () => [{ file: null, preview: null }, { file: null, preview: null }, { file: null, preview: null }]
  );
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (backButton) {
      backButton.show();
      const handler = () => router.back();
      backButton.onClick(handler);
      return () => {
        backButton.hide();
        backButton.offClick(handler);
      };
    }
  }, [backButton, router]);

  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center text-tg-hint min-h-screen">
        Шаблон не найден
      </div>
    );
  }

  const allReady = photos.every((p) => p.file !== null);
  const filledCount = photos.filter((p) => p.file).length;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("Макс. 10 МБ");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const idx = activeSlotRef.current;
      setPhotos((prev) => {
        const next = [...prev];
        next[idx] = { file, preview: ev.target?.result as string };
        return next;
      });
    };
    reader.readAsDataURL(file);
    haptic?.impactOccurred("light");
    e.target.value = "";
  };

  const openPicker = (i: number) => {
    activeSlotRef.current = i;
    fileInputRef.current?.click();
  };

  const combinePhotos = async (): Promise<Blob> => {
    const images = await Promise.all(
      photos.map(
        (p) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = p.preview!;
          })
      )
    );

    const w = 800;
    const ph = Math.round(w * 0.75);
    const gap = 6;
    const h = ph * 3 + gap * 2;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);

    images.forEach((img, i) => {
      const y = i * (ph + gap);
      const ir = img.width / img.height;
      const sr = w / ph;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (ir > sr) { sw = img.height * sr; sx = (img.width - sw) / 2; }
      else { sh = img.width / sr; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, y, w, ph);
    });

    return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9));
  };

  const handleGenerate = async () => {
    if (!allReady) return;
    setStatus("generating");
    setError("");
    haptic?.impactOccurred("medium");

    try {
      const stripBlob = await combinePhotos();
      const formData = new FormData();
      formData.append("templateId", template.id);
      formData.append("image", stripBlob, "strip.jpg");

      const res = await fetch("/api/generate", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Ошибка генерации");
      }
      const data = await res.json();
      setResult(data.imageUrl);
      setStatus("done");
      haptic?.notificationOccurred("success");
    } catch (err: any) {
      setError(err.message || "Что-то пошло не так");
      setStatus("error");
      haptic?.notificationOccurred("error");
    }
  };

  const handleReset = () => {
    setPhotos([{ file: null, preview: null }, { file: null, preview: null }, { file: null, preview: null }]);
    setResult(null);
    setStatus("idle");
    setError("");
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        paddingTop: "calc(var(--tg-safe-area-inset-top, 0px) + var(--tg-content-safe-area-inset-top, 44px))",
        paddingBottom: "var(--tg-safe-area-inset-bottom, 0px)",
      }}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Header */}
      <div className="px-5 pt-2 pb-2">
        <h1 className="text-2xl font-serif font-black text-tg-text">{template.name}</h1>
        <p className="text-[11px] text-tg-hint mt-0.5">{template.description}</p>
      </div>

      <div className="flex-1 flex flex-col px-5 gap-3">
        {result ? (
          /* Result */
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center">
              <div className="w-full rounded-2xl overflow-hidden shadow-xl">
                <img src={result} alt="Result" className="w-full" />
              </div>
            </div>
            <div className="flex gap-3 py-4">
              <button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = result;
                  a.download = `shiendz-${template.id}.png`;
                  a.click();
                }}
                className="flex-1 py-3 rounded-full bg-tg-button text-tg-button-text font-bold text-sm active:scale-[0.97] transition-transform"
              >
                Сохранить
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-full bg-card text-tg-text font-bold text-sm active:scale-[0.97] transition-transform"
              >
                Ещё раз
              </button>
            </div>
          </div>
        ) : (
          /* Upload 3 photos — compact */
          <>
            <div className="flex gap-2">
              {photos.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => openPicker(i)}
                  className="flex-1 rounded-xl overflow-hidden active:scale-[0.96] transition-transform"
                >
                  {slot.preview ? (
                    <img src={slot.preview} alt={`${i + 1}`} className="w-full aspect-square object-cover" />
                  ) : (
                    <div className="w-full aspect-square bg-card flex items-center justify-center">
                      <span className="text-2xl font-bold text-tg-hint/40">{i + 1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="text-center text-[11px] text-tg-hint">
              {filledCount}/3 фото загружено
            </p>

            {status === "generating" && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 border-[3px] border-tg-hint/20 border-t-tg-text rounded-full animate-spin" />
                <p className="text-sm text-tg-hint">Создаём фотобудку...</p>
              </div>
            )}

            {error && (
              <div className="p-2.5 rounded-xl bg-premium/10 text-premium text-sm text-center">
                {error}
              </div>
            )}

            {allReady && status !== "generating" && (
              <button
                onClick={handleGenerate}
                className="w-full py-3.5 rounded-full bg-tg-button text-tg-button-text font-bold text-sm tracking-wide uppercase active:scale-[0.97] transition-transform shadow-lg"
              >
                Создать
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
