"use client";

import { useEffect, useState } from "react";
import { categories, getTemplatesByCategory, type Template } from "@/lib/templates";
import { useTelegram } from "@/lib/telegram";
import { TemplatePreview } from "@/components/TemplatePreview";
import Link from "next/link";

export default function Home() {
  const { tg, ready, expand, haptic, requestFullscreen } = useTelegram();
  const [activeCategory, setActiveCategory] = useState("trending");

  useEffect(() => {
    ready();
    expand();
    // Request fullscreen after a small delay (needs user gesture on some clients)
    const timer = setTimeout(() => {
      try { requestFullscreen(); } catch {}
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const currentTemplates = getTemplatesByCategory(activeCategory);

  return (
    <div className="flex flex-col min-h-screen" style={{ paddingTop: "var(--tg-content-safe-area-inset-top, 0px)" }}>
      {/* Header — offset below Telegram close button */}
      <div className="px-5 pt-14 pb-1">
        <h1 className="text-[42px] font-serif font-black text-tg-text leading-none tracking-tight">
          Шаблоны
        </h1>
        <p className="text-xs tracking-[0.15em] text-tg-hint mt-2 uppercase">
          Выбери шаблон и загрузи фото
        </p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-5 mt-4 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              haptic?.impactOccurred("light");
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all border ${
              activeCategory === cat.id
                ? "bg-accent text-tg-text border-accent"
                : "bg-card text-tg-text border-card hover:border-tg-hint/30"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="masonry px-4 mt-4 pb-24">
        {currentTemplates.map((template, i) => (
          <Link
            key={template.id}
            href={`/create/${template.id}`}
            onClick={() => haptic?.impactOccurred("light")}
            className="masonry-item block active:scale-[0.97] transition-transform"
          >
            <TemplatePreview template={template} />
          </Link>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-tg-bg/90 backdrop-blur-xl border-t border-tg-hint/10 px-6 pt-2" style={{ paddingBottom: "max(env(safe-area-inset-bottom, 8px), var(--tg-safe-area-inset-bottom, 8px))" }}>
        <div className="flex justify-around items-center">
          <TabIcon active>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </TabIcon>
          <TabIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          </TabIcon>
          <TabIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
            </svg>
          </TabIcon>
          <TabIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </TabIcon>
          <TabIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
          </TabIcon>
        </div>
      </div>
    </div>
  );
}

function TabIcon({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`p-2 ${active ? "text-tg-text" : "text-tg-hint"}`}>
      {children}
    </button>
  );
}
