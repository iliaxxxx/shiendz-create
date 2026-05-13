"use client";

export function getTelegram() {
  if (typeof window === "undefined") return null;
  return (window as any).Telegram?.WebApp ?? null;
}

export function useTelegram() {
  const tg = getTelegram();
  return {
    tg,
    user: tg?.initDataUnsafe?.user ?? null,
    initData: tg?.initData ?? "",
    colorScheme: tg?.colorScheme ?? "light",
    isFullscreen: tg?.isFullscreen ?? false,
    requestFullscreen: () => tg?.requestFullscreen?.(),
    exitFullscreen: () => tg?.exitFullscreen?.(),
    ready: () => tg?.ready?.(),
    expand: () => tg?.expand?.(),
    close: () => tg?.close?.(),
    haptic: tg?.HapticFeedback ?? null,
    mainButton: tg?.MainButton ?? null,
    backButton: tg?.BackButton ?? null,
  };
}
