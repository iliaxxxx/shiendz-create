"use client";

import type { Template } from "@/lib/templates";

export function TemplatePreview({ template }: { template: Template }) {
  const { previewBg, previewStyle, previewAccent, premium } = template;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: previewBg }}
    >
      <div className="w-full aspect-[3/4] flex items-center justify-center p-4 relative">
        {previewStyle === "heart" && <HeartPreview accent={previewAccent} />}
        {previewStyle === "polaroid" && <PolaroidPreview accent={previewAccent} />}
        {previewStyle === "stamp" && <StampPreview />}
        {previewStyle === "tape" && <TapePreview />}
        {previewStyle === "grid-text" && <GridTextPreview accent={previewAccent} />}
        {previewStyle === "film" && <FilmPreview accent={previewAccent} />}
        {previewStyle === "magazine" && <MagazinePreview />}
        {previewStyle === "circle" && <CirclePreview accent={previewAccent} />}
        {previewStyle === "torn" && <TornPreview />}
        {previewStyle === "collage" && <CollagePreview />}
        {previewStyle === "booth" && <BoothPreview accent={previewAccent} />}
      </div>

      {premium && (
        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-premium flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
          </svg>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
        <p className="text-white text-sm font-semibold drop-shadow-md">
          {template.name}
        </p>
      </div>
    </div>
  );
}

function HeartPreview({ accent }: { accent?: string }) {
  return (
    <div className="relative w-[70%] aspect-square">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
          <clipPath id="heart-clip">
            <path d="M50 88 C25 65, 0 50, 0 30 C0 13, 13 0, 25 0 C35 0, 45 8, 50 18 C55 8, 65 0, 75 0 C87 0, 100 13, 100 30 C100 50, 75 65, 50 88Z" />
          </clipPath>
        </defs>
        <rect clipPath="url(#heart-clip)" fill={accent || "#ddd"} width="100" height="100" opacity="0.3" />
        <path
          d="M50 88 C25 65, 0 50, 0 30 C0 13, 13 0, 25 0 C35 0, 45 8, 50 18 C55 8, 65 0, 75 0 C87 0, 100 13, 100 30 C100 50, 75 65, 50 88Z"
          fill="none"
          stroke={accent || "#fff"}
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>
      <div className="absolute inset-[15%] rounded-full bg-white/10 backdrop-blur-sm" />
    </div>
  );
}

function PolaroidPreview({ accent }: { accent?: string }) {
  return (
    <div
      className="w-[75%] bg-white rounded-sm shadow-xl p-2 pb-8 -rotate-3"
      style={{ borderBottom: accent ? `3px solid ${accent}` : undefined }}
    >
      <div className="w-full aspect-square bg-gray-200/30 rounded-sm" />
    </div>
  );
}

function StampPreview() {
  return (
    <div className="w-[80%] flex flex-col items-center gap-3">
      <div className="w-full aspect-[4/3] bg-white/10 rounded" />
      <div className="flex gap-2 items-center opacity-60">
        <div className="w-8 h-6 border border-white/40 rounded-sm" />
        <div className="h-px flex-1 bg-white/30" />
        <div className="w-8 h-6 border border-white/40 rounded-sm" />
      </div>
      <div className="w-[60%] h-3 bg-white/15 rounded" />
    </div>
  );
}

function TapePreview() {
  return (
    <div className="w-[80%] relative">
      <div className="w-full aspect-[4/3] bg-white/10 rounded border border-white/20" />
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200/40 -rotate-1" />
      <div className="absolute -bottom-2 right-4 w-12 h-4 bg-yellow-200/40 rotate-2" />
    </div>
  );
}

function GridTextPreview({ accent }: { accent?: string }) {
  const color = accent || "#c4453c";
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center gap-0.5 opacity-30 px-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} className="text-[8px] leading-tight whitespace-nowrap" style={{ color }}>
            love you love you love you love you love you
          </p>
        ))}
      </div>
      <div className="relative w-[55%] aspect-[3/4] bg-white/10 rounded border border-white/20 z-10" />
    </div>
  );
}

function FilmPreview({ accent }: { accent?: string }) {
  return (
    <div className="w-[90%] flex items-center gap-1">
      <div className="flex flex-col gap-1.5 shrink-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-2 h-3 rounded-sm bg-white/20" />
        ))}
      </div>
      <div className="flex-1 aspect-[3/4] bg-white/10 rounded-sm border border-white/15" />
      <div className="flex flex-col gap-1.5 shrink-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-2 h-3 rounded-sm bg-white/20" />
        ))}
      </div>
    </div>
  );
}

function MagazinePreview() {
  return (
    <div className="w-[80%] flex flex-col gap-2">
      <div className="h-3 w-[70%] bg-white/20 rounded" />
      <div className="w-full aspect-[4/3] bg-white/10 rounded" />
      <div className="h-2 w-full bg-white/10 rounded" />
      <div className="h-2 w-[80%] bg-white/10 rounded" />
    </div>
  );
}

function CirclePreview({ accent }: { accent?: string }) {
  return (
    <div
      className="w-[65%] aspect-square rounded-full border-4 shadow-xl bg-white/10"
      style={{ borderColor: accent || "rgba(255,255,255,0.3)" }}
    />
  );
}

function TornPreview() {
  return (
    <div className="w-[80%] relative">
      <div className="w-full aspect-[3/4] bg-white/10 rounded" />
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white/10 to-transparent" style={{ clipPath: "polygon(0 0, 5% 60%, 10% 20%, 15% 80%, 20% 10%, 25% 70%, 30% 30%, 35% 90%, 40% 0, 45% 60%, 50% 20%, 55% 80%, 60% 10%, 65% 70%, 70% 30%, 75% 90%, 80% 0, 85% 60%, 90% 20%, 95% 80%, 100% 0)" }} />
    </div>
  );
}

function CollagePreview() {
  return (
    <div className="w-[85%] grid grid-cols-2 gap-1.5">
      <div className="aspect-square bg-white/10 rounded" />
      <div className="aspect-[3/4] bg-white/10 rounded row-span-2" />
      <div className="aspect-square bg-white/10 rounded" />
    </div>
  );
}

function BoothPreview({ accent }: { accent?: string }) {
  const dotColor = accent || "#1a1a1a";
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 8 }).map((_, row) => (
          <div key={row} className="flex justify-around py-1">
            {Array.from({ length: 6 }).map((_, col) => (
              <div
                key={col}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: dotColor }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Photo strip */}
      <div className="relative z-10 w-[55%] flex flex-col gap-1.5 p-1.5 bg-white/20 rounded border border-white/30">
        <div className="w-full aspect-[4/3] bg-white/15 rounded-sm" />
        <div className="w-full aspect-[4/3] bg-white/15 rounded-sm" />
        <div className="w-full aspect-[4/3] bg-white/15 rounded-sm" />
      </div>
    </div>
  );
}
