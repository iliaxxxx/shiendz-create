"use client";

import { useEffect, useState } from "react";
import { categories, getTemplatesByCategory, type Template } from "@/lib/templates";
import { useTelegram } from "@/lib/telegram";
import Link from "next/link";

export default function Home() {
  const { tg, ready, expand } = useTelegram();
  const [activeCategory, setActiveCategory] = useState("avatar");

  useEffect(() => {
    ready();
    expand();
  }, []);

  const currentTemplates = getTemplatesByCategory(activeCategory);

  return (
    <div className="flex flex-col min-h-screen pb-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-tg-bg/80 backdrop-blur-xl border-b border-tg-hint/10 px-4 pt-3 pb-2">
        <h1 className="text-xl font-bold text-tg-text">Shiendz Create</h1>
        <p className="text-sm text-tg-hint mt-0.5">
          Выбери шаблон и загрузи фото
        </p>

        {/* Category pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-tg-button text-tg-button-text shadow-sm"
                  : "bg-tg-secondary text-tg-text"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {currentTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const { haptic } = useTelegram();

  return (
    <Link
      href={`/create/${template.id}`}
      onClick={() => haptic?.impactOccurred("light")}
      className="flex flex-col rounded-2xl bg-tg-secondary overflow-hidden active:scale-[0.97] transition-transform"
    >
      <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-tg-button/20 to-tg-link/20">
        <span className="text-5xl">{template.emoji}</span>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-tg-text">{template.name}</h3>
        <p className="text-xs text-tg-hint mt-0.5 line-clamp-2">
          {template.description}
        </p>
      </div>
    </Link>
  );
}
