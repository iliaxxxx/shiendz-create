export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  emoji: string;
  prompt: string;
  example?: string;
}

export const categories = [
  { id: "avatar", name: "Аватарки", emoji: "🎭" },
  { id: "sticker", name: "Стикеры", emoji: "✨" },
  { id: "art", name: "Арт", emoji: "🎨" },
  { id: "meme", name: "Мемы", emoji: "😂" },
  { id: "photo", name: "Фотоэффекты", emoji: "📸" },
  { id: "fashion", name: "Мода", emoji: "👗" },
];

export const templates: Template[] = [
  // Аватарки
  {
    id: "anime-avatar",
    name: "Аниме аватар",
    description: "Превращает фото в аниме-стиль",
    category: "avatar",
    emoji: "🌸",
    prompt:
      "Transform this photo into a high-quality anime style portrait. Keep the person's features recognizable but render in beautiful anime art style with vibrant colors, clean lines, and expressive eyes. Studio Ghibli inspired aesthetic.",
  },
  {
    id: "pixel-avatar",
    name: "Пиксель арт",
    description: "8-bit пиксельная версия",
    category: "avatar",
    emoji: "👾",
    prompt:
      "Convert this photo into a charming 16-bit pixel art portrait. Use a limited but vibrant color palette. The person should be recognizable in pixel form. Retro gaming aesthetic, clean pixel edges.",
  },
  {
    id: "cyberpunk-avatar",
    name: "Киберпанк",
    description: "Неоновый киберпанк портрет",
    category: "avatar",
    emoji: "🤖",
    prompt:
      "Transform this photo into a cyberpunk style portrait with neon lighting, futuristic cybernetic augmentations, glowing elements. Dark background with vivid neon pink, blue and purple accents. High contrast, cinematic look.",
  },
  {
    id: "cartoon-avatar",
    name: "Мультяшный",
    description: "Мультяшный портрет в стиле Pixar",
    category: "avatar",
    emoji: "🎬",
    prompt:
      "Transform this photo into a Pixar/Disney 3D cartoon style character portrait. Exaggerated cute proportions, smooth rendering, expressive eyes, warm lighting. The person should be clearly recognizable but stylized as an animated character.",
  },
  {
    id: "oil-painting",
    name: "Масло",
    description: "Классический портрет маслом",
    category: "avatar",
    emoji: "🖼️",
    prompt:
      "Transform this photo into a classical oil painting portrait in the style of Renaissance masters. Rich warm colors, dramatic chiaroscuro lighting, visible brushstrokes, ornate dark background. Museum-quality fine art aesthetic.",
  },

  // Стикеры
  {
    id: "chibi-sticker",
    name: "Чиби стикер",
    description: "Милый чиби-персонаж для стикерпака",
    category: "sticker",
    emoji: "🍡",
    prompt:
      "Create a cute chibi sticker character based on this person's photo. Big head, small body, kawaii expressions. White outline border around the character on a transparent-looking clean background. Sticker pack ready, vibrant flat colors.",
  },
  {
    id: "emoji-sticker",
    name: "Эмодзи лицо",
    description: "Твоё лицо как эмодзи",
    category: "sticker",
    emoji: "😊",
    prompt:
      "Transform this person's face into a custom emoji/emoticon style. Round circular format like a standard emoji, simplified features but recognizable as the person. Bright yellow background, bold outlines, expressive. Clean vector-like style.",
  },
  {
    id: "pop-art-sticker",
    name: "Поп-арт",
    description: "Стикер в стиле поп-арт",
    category: "sticker",
    emoji: "💥",
    prompt:
      "Transform this photo into a bold pop art sticker in the style of Roy Lichtenstein / Andy Warhol. Ben-Day dots, strong black outlines, limited vivid color palette (red, blue, yellow). Comic book aesthetic with halftone patterns.",
  },

  // Арт
  {
    id: "watercolor",
    name: "Акварель",
    description: "Нежная акварельная картина",
    category: "art",
    emoji: "💧",
    prompt:
      "Transform this photo into a beautiful watercolor painting. Soft flowing edges, translucent color washes, visible paper texture, gentle blending. Delicate and artistic, with some areas more detailed and others deliberately loose and flowing.",
  },
  {
    id: "comic-book",
    name: "Комикс",
    description: "В стиле комикс-панели",
    category: "art",
    emoji: "💬",
    prompt:
      "Transform this photo into a dynamic comic book panel illustration. Bold ink outlines, dramatic shading with crosshatching, action lines, vibrant flat colors. Marvel/DC comic book style with high contrast and energy.",
  },
  {
    id: "vaporwave",
    name: "Вейпорвейв",
    description: "Ретро-эстетика 80-х",
    category: "art",
    emoji: "🌅",
    prompt:
      "Transform this photo into vaporwave/retrowave aesthetic art. Neon grid landscape, sunset gradient (pink to purple to blue), Roman statue style, glitch effects, VHS scanlines. 80s/90s nostalgia, lo-fi dreamy atmosphere.",
  },
  {
    id: "gta-style",
    name: "GTA стиль",
    description: "Как загрузочный экран GTA",
    category: "art",
    emoji: "🔫",
    prompt:
      "Transform this photo into GTA (Grand Theft Auto) loading screen art style. Bold graphic illustration with strong outlines, limited color palette, dramatic poses. Stephen Bliss illustration style. Gritty urban aesthetic.",
  },

  // Мемы
  {
    id: "chad-meme",
    name: "Gigachad",
    description: "Превращает в гигачада",
    category: "meme",
    emoji: "💪",
    prompt:
      "Transform this person into a humorous 'Gigachad' meme style. Extremely chiseled jawline, perfect physique implied, dramatic black and white photography with high contrast. Heroic lighting, ultra-masculine exaggeration. Funny but flattering.",
  },
  {
    id: "renaissance-meme",
    name: "Случайный ренессанс",
    description: "Accidental Renaissance мем",
    category: "meme",
    emoji: "🏛️",
    prompt:
      "Recreate this photo as an 'Accidental Renaissance' style scene. Dramatic Baroque/Renaissance painting lighting, rich oil painting textures, dramatic composition. As if Caravaggio or Rembrandt painted this candid moment. Dark, moody, theatrical.",
  },
  {
    id: "action-figure",
    name: "Фигурка",
    description: "Как коллекционная фигурка в коробке",
    category: "meme",
    emoji: "📦",
    prompt:
      "Create an image of this person as a collectible action figure in a toy packaging box. Clear plastic front, cardboard backing with graphics, accessories shown. Include a funny product name. Toy photography style, studio lighting.",
  },

  // Фотоэффекты
  {
    id: "tilt-shift",
    name: "Миниатюра",
    description: "Эффект миниатюрного мира",
    category: "photo",
    emoji: "🔍",
    prompt:
      "Apply a tilt-shift miniature effect to this photo. Make the scene look like a tiny model/diorama. Extreme shallow depth of field at top and bottom, saturated colors, enhanced contrast. Everything looks like a miniature toy world.",
  },
  {
    id: "double-exposure",
    name: "Двойная экспозиция",
    description: "Фото + природный пейзаж",
    category: "photo",
    emoji: "🌿",
    prompt:
      "Create a stunning double exposure effect combining this person's portrait with a beautiful nature landscape (forest, mountains, ocean). The landscape should blend artistically within the person's silhouette. Dreamy, ethereal mood.",
  },
  {
    id: "neon-glow",
    name: "Неоновое свечение",
    description: "Неоновые контуры и свечение",
    category: "photo",
    emoji: "💡",
    prompt:
      "Add dramatic neon glow effects to this photo. Neon light outlines around the subject in vibrant pink, blue, and purple. Dark background, light trails, bokeh effects. Club/party photography aesthetic, high energy.",
  },

  // Мода
  {
    id: "magazine-cover",
    name: "Обложка журнала",
    description: "Как обложка Vogue",
    category: "fashion",
    emoji: "📰",
    prompt:
      "Transform this photo into a high-fashion magazine cover in the style of Vogue or Harper's Bazaar. Professional retouching, dramatic lighting, fashion-forward styling. Add elegant typography overlay suggesting a luxury fashion magazine.",
  },
  {
    id: "streetwear",
    name: "Стритвир лук",
    description: "Модный уличный стиль",
    category: "fashion",
    emoji: "🧢",
    prompt:
      "Reimagine this person in a trendy streetwear look. Supreme, Off-White, Nike inspired styling. Urban backdrop, confident pose, professional fashion photography lighting. Hypebeast aesthetic, editorial quality.",
  },
  {
    id: "vintage-fashion",
    name: "Ретро мода",
    description: "Стиль 60-х / 70-х",
    category: "fashion",
    emoji: "🕶️",
    prompt:
      "Transform this photo into a vintage 1960s/1970s fashion editorial. Film grain, warm faded tones, retro clothing and styling. Think Twiggy or Studio 54 era. Bell-bottoms, round sunglasses, groovy aesthetic. Nostalgic and stylish.",
  },
];

export function getTemplatesByCategory(categoryId: string) {
  return templates.filter((t) => t.category === categoryId);
}

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}
