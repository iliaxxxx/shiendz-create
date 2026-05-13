"use client";

import { useEffect, useRef, useState, use } from "react";
import { getTemplate } from "@/lib/templates";
import { useTelegram } from "@/lib/telegram";
import { useRouter } from "next/navigation";

type Status = "idle" | "generating" | "done" | "error";

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

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("Файл слишком большой (макс. 10 МБ)");
      return;
    }
    setPhotoFile(file);
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
    haptic?.impactOccurred("light");
  };

  const handleGenerate = async () => {
    if (!photoFile) return;
    setStatus("generating");
    setError("");
    haptic?.impactOccurred("medium");

    try {
      const formData = new FormData();
      formData.append("image", photoFile);
      formData.append("templateId", template.id);

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
    setPhoto(null);
    setPhotoFile(null);
    setResult(null);
    setStatus("idle");
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen pb-8">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[32px] font-serif font-black text-tg-text leading-none">
          {template.name}
        </h1>
        <p className="text-xs tracking-[0.12em] text-tg-hint mt-1.5 uppercase">
          Загрузи фото для этого шаблона
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 gap-4">
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!photo ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-2xl border-2 border-dashed border-tg-hint/25 flex flex-col items-center justify-center gap-4 py-20 active:scale-[0.98] active:border-accent transition-all bg-card/30"
              >
                <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                  <svg className="w-9 h-9 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-tg-text">
                    Выбрать фото
                  </p>
                  <p className="text-xs text-tg-hint mt-1">
                    JPG, PNG до 10 МБ
                  </p>
                </div>
              </button>
            ) : (
              <div className="w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img src={photo} alt="Selected" className="w-full" />
                  {status === "generating" && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4">
                      <div className="w-14 h-14 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                      <p className="text-white text-sm font-medium tracking-wide">
                        Создаём магию...
                      </p>
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

            {error && (
              <div className="w-full p-3 rounded-xl bg-premium/10 text-premium text-sm text-center font-medium">
                {error}
              </div>
            )}

            {photo && status !== "generating" && (
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
