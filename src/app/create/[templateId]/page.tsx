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

  const photoCount = template?.photoCount || 1;
  const isMulti = photoCount > 1;

  const [photos, setPhotos] = useState<PhotoSlot[]>(
    () => Array.from({ length: photoCount }, () => ({ file: null, preview: null }))
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

  const allPhotosReady = photos.every((p) => p.file !== null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("Файл слишком большой (макс. 10 МБ)");
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
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const openFilePicker = (slotIndex: number) => {
    activeSlotRef.current = slotIndex;
    fileInputRef.current?.click();
  };

  const combinePhotosToStrip = async (): Promise<Blob> => {
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

    const stripWidth = 800;
    const photoHeight = Math.round(stripWidth * 0.75); // 4:3 ratio per photo
    const gap = 8;
    const stripHeight = photoHeight * images.length + gap * (images.length - 1);

    const canvas = document.createElement("canvas");
    canvas.width = stripWidth;
    canvas.height = stripHeight;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, stripWidth, stripHeight);

    images.forEach((img, i) => {
      const y = i * (photoHeight + gap);
      // Cover-fit each photo
      const imgRatio = img.width / img.height;
      const slotRatio = stripWidth / photoHeight;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (imgRatio > slotRatio) {
        sw = img.height * slotRatio;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / slotRatio;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, y, stripWidth, photoHeight);
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.9);
    });
  };

  const handleGenerate = async () => {
    if (isMulti && !allPhotosReady) return;
    if (!isMulti && !photos[0].file) return;

    setStatus("generating");
    setError("");
    haptic?.impactOccurred("medium");

    try {
      const formData = new FormData();
      formData.append("templateId", template.id);

      if (isMulti) {
        const stripBlob = await combinePhotosToStrip();
        formData.append("image", stripBlob, "strip.jpg");
      } else {
        formData.append("image", photos[0].file!);
      }

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

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `shiendz-${template.id}.png`;
    a.click();
  };

  const handleReset = () => {
    setPhotos(Array.from({ length: photoCount }, () => ({ file: null, preview: null })));
    setResult(null);
    setStatus("idle");
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen pb-8" style={{ paddingTop: "var(--tg-content-safe-area-inset-top, 0px)" }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-3">
        <h1 className="text-[32px] font-serif font-black text-tg-text leading-none">
          {template.name}
        </h1>
        <p className="text-xs tracking-[0.12em] text-tg-hint mt-1.5 uppercase">
          {isMulti
            ? `Загрузи ${photoCount} фото для фотобудки`
            : "Загрузи фото для этого шаблона"}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Result */}
        {result && (
          <div className="w-full animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={result} alt="Result" className="w-full" />
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 rounded-full bg-tg-button text-tg-button-text font-bold text-sm tracking-wide active:scale-[0.97] transition-transform"
              >
                СОХРАНИТЬ
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-full bg-card text-tg-text font-bold text-sm tracking-wide active:scale-[0.97] transition-transform"
              >
                ЕЩЁ РАЗ
              </button>
            </div>
          </div>
        )}

        {/* Upload area */}
        {!result && (
          <>
            {isMulti ? (
              /* Multi-photo upload (photo booth) */
              <div className="w-full flex flex-col gap-3">
                {photos.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => openFilePicker(i)}
                    className="w-full rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
                  >
                    {slot.preview ? (
                      <div className="relative">
                        <img
                          src={slot.preview}
                          alt={`Фото ${i + 1}`}
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{i + 1}</span>
                        </div>
                        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] bg-card/50 border-2 border-dashed border-tg-hint/25 flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                          <span className="text-tg-hint text-lg font-bold">{i + 1}</span>
                        </div>
                        <p className="text-sm text-tg-hint">Фото {i + 1}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              /* Single photo upload */
              <>
                {!photos[0].preview ? (
                  <button
                    onClick={() => openFilePicker(0)}
                    className="w-full rounded-2xl border-2 border-dashed border-tg-hint/25 flex flex-col items-center justify-center gap-4 py-20 active:scale-[0.98] active:border-accent transition-all bg-card/30"
                  >
                    <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                      <svg className="w-9 h-9 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-tg-text">Выбрать фото</p>
                      <p className="text-xs text-tg-hint mt-1">JPG, PNG до 10 МБ</p>
                    </div>
                  </button>
                ) : (
                  <div className="w-full">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <img src={photos[0].preview} alt="Selected" className="w-full" />
                      {status === "generating" && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4">
                          <div className="w-14 h-14 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                          <p className="text-white text-sm font-medium tracking-wide">Создаём магию...</p>
                        </div>
                      )}
                      <button
                        onClick={handleReset}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Generating overlay for multi-photo */}
            {isMulti && status === "generating" && (
              <div className="w-full py-8 flex flex-col items-center gap-4">
                <div className="w-14 h-14 border-[3px] border-tg-hint/20 border-t-tg-text rounded-full animate-spin" />
                <p className="text-sm text-tg-hint font-medium">Создаём фотобудку...</p>
              </div>
            )}

            {error && (
              <div className="w-full p-3 rounded-xl bg-premium/10 text-premium text-sm text-center font-medium">
                {error}
              </div>
            )}

            {((isMulti && allPhotosReady) || (!isMulti && photos[0].preview)) &&
              status !== "generating" && (
                <button
                  onClick={handleGenerate}
                  className="w-full py-4 rounded-full bg-tg-button text-tg-button-text font-bold text-sm tracking-widest uppercase active:scale-[0.97] transition-transform shadow-lg"
                >
                  СОЗДАТЬ
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
}
