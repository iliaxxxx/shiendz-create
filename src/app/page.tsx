"use client";

import { useEffect } from "react";
import { templates } from "@/lib/templates";
import { useTelegram } from "@/lib/telegram";
import Link from "next/link";

export default function Home() {
  const { ready, expand, haptic, requestFullscreen } = useTelegram();

  useEffect(() => {
    ready();
    expand();
    const timer = setTimeout(() => {
      try { requestFullscreen(); } catch {}
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        paddingTop: "calc(var(--tg-safe-area-inset-top, 0px) + var(--tg-content-safe-area-inset-top, 44px))",
        paddingBottom: "var(--tg-safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="px-5 pt-2 pb-1">
        <h1 className="text-[38px] font-serif font-black text-tg-text leading-none tracking-tight">
          Фотобудка
        </h1>
        <p className="text-xs tracking-[0.12em] text-tg-hint mt-1.5 uppercase">
          Загрузи 3 фото — получи стильную полоску
        </p>
      </div>

      <div className="flex gap-3 px-5 mt-4 flex-1">
        {templates.map((t) => (
          <Link
            key={t.id}
            href={`/create/${t.id}`}
            onClick={() => haptic?.impactOccurred("light")}
            className="flex-1 active:scale-[0.97] transition-transform"
          >
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ background: t.previewBg }}
            >
              <div className="aspect-[3/5] flex items-center justify-center p-3 relative">
                <BoothPreview accent={t.previewAccent} isStripes={t.id === "booth-stripes"} />
              </div>
              <div className="px-3 pb-3 pt-1">
                <p className="text-sm font-bold text-tg-text">{t.name}</p>
                <p className="text-[11px] text-tg-hint mt-0.5">{t.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BoothPreview({ accent, isStripes }: { accent: string; isStripes: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        {isStripes ? (
          <div className="w-full h-full flex">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full"
                style={{ background: i % 2 === 0 ? accent : "transparent" }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            {Array.from({ length: 10 }).map((_, row) => (
              <div key={row} className="flex justify-around">
                {Array.from({ length: 5 }).map((_, col) => (
                  <div key={col} className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Strip */}
      <div className="relative z-10 w-[60%] flex flex-col gap-1 p-1 bg-white/25 rounded border border-white/30">
        <div className="w-full aspect-[4/3] bg-white/20 rounded-sm" />
        <div className="w-full aspect-[4/3] bg-white/20 rounded-sm" />
        <div className="w-full aspect-[4/3] bg-white/20 rounded-sm" />
      </div>
    </div>
  );
}
