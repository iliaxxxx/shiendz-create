export interface Template {
  id: string;
  name: string;
  category: string;
  prompt: string;
  premium?: boolean;
  photoCount?: number; // default 1, photo booth = 3
  // Visual preview config
  previewBg: string;
  previewStyle: "heart" | "polaroid" | "stamp" | "tape" | "grid-text" | "film" | "magazine" | "circle" | "torn" | "collage" | "booth";
  previewAccent?: string;
  aspectTall?: boolean;
}

export const categories = [
  { id: "trending", name: "В ТРЕНДЕ" },
  { id: "vintage", name: "ВИНТАЖ" },
  { id: "love", name: "ЛЮБОВЬ" },
  { id: "film", name: "ПЛЁНКА" },
  { id: "art", name: "АРТ" },
  { id: "pop", name: "ПОП" },
  { id: "minimal", name: "МИНИМАЛ" },
  { id: "meme", name: "МЕМЫ" },
];

export const templates: Template[] = [
  // TRENDING — photo booth first
  {
    id: "booth-polka",
    name: "Фотобудка Polka",
    category: "trending",
    previewBg: "#f5f0e8",
    previewStyle: "booth",
    previewAccent: "#1a1a1a",
    aspectTall: true,
    photoCount: 3,
    prompt: `I'm giving you a vertical strip of 3 photos stacked on top of each other. Create a vintage photo booth result:

1. Keep ALL THREE photos clearly visible, stacked vertically in a column, evenly spaced. Each photo must remain EXACTLY as provided — same people, same poses, same composition. Do NOT alter, redraw, or reimagine the photos in any way.
2. Convert all three photos to BLACK AND WHITE with slight sepia/warm tone, like a real photo booth.
3. Add a white lace/doily decorative rectangular border around the entire photo strip.
4. Place the framed strip on a background of WHITE fabric/paper with BLACK POLKA DOTS pattern (small regular dots).
5. The final image should be tall portrait orientation (like a real photo booth strip).
6. The overall aesthetic should look like a scrapbook page — tactile, handmade, vintage, romantic.

CRITICAL: The three photos must look IDENTICAL to the originals. Only change the color to B&W sepia. Do not redraw faces or change expressions.`,
  },
  {
    id: "booth-stripes",
    name: "Фотобудка Stripes",
    category: "trending",
    previewBg: "#f5e8e8",
    previewStyle: "booth",
    previewAccent: "#c44040",
    aspectTall: true,
    photoCount: 3,
    prompt: `I'm giving you a vertical strip of 3 photos stacked on top of each other. Create a vintage photo booth result:

1. Keep ALL THREE photos clearly visible, stacked vertically in a column, evenly spaced. Each photo must remain EXACTLY as provided — same people, same poses, same composition. Do NOT alter, redraw, or reimagine the photos in any way.
2. Convert all three photos to BLACK AND WHITE with slight warm sepia tone, like a real photo booth.
3. Give each photo slightly rounded corners.
4. Place the photo strip on a background of RED AND WHITE VERTICAL STRIPES pattern (classic candy stripe / circus stripe fabric texture).
5. The final image should be tall portrait orientation (like a real photo booth strip).
6. The overall aesthetic should look like a vintage carnival photo booth — nostalgic, fun, romantic.

CRITICAL: The three photos must look IDENTICAL to the originals. Only change the color to B&W sepia. Do not redraw faces or change expressions.`,
  },
  {
    id: "heart-lace",
    name: "Кружевное сердце",
    category: "trending",
    previewBg: "#a83232",
    previewStyle: "heart",
    previewAccent: "#fff",
    aspectTall: true,
    prompt: "Place this photo inside a decorative white lace heart frame on a rich red textured paper background. The heart should have intricate doily-like lace edges. Romantic vintage scrapbook aesthetic, warm tones.",
  },
  {
    id: "polaroid-ribbon",
    name: "Полароид",
    category: "trending",
    previewBg: "#f5f0e8",
    previewStyle: "polaroid",
    previewAccent: "#8b2020",
    prompt: "Present this photo as a vintage polaroid photograph with a white border, slightly tilted, with an elegant white satin ribbon bow on top. Place on a cream/beige background. Gift-wrapped photo aesthetic, warm film tones.",
  },
  {
    id: "love-stamp",
    name: "Для тебя",
    category: "trending",
    previewBg: "#d4a882",
    previewStyle: "stamp",
    aspectTall: true,
    prompt: "Create a vintage envelope/letter aesthetic with this photo. Black and white version of the photo, placed on aged paper with handwritten cursive text 'for you' underneath, decorative postal stamps, red wax seal. Love letter vintage aesthetic.",
  },
  {
    id: "love-text-wall",
    name: "Люблю тебя",
    category: "trending",
    previewBg: "#f5ede0",
    previewStyle: "grid-text",
    previewAccent: "#c4453c",
    premium: true,
    prompt: "Place this photo in the center of a background filled with repeated handwritten text 'love you' in red ink on cream paper. Photo should be in vintage film style. Add a red wax seal accent. Romantic letter aesthetic.",
  },

  // VINTAGE
  {
    id: "film-strip",
    name: "Киноплёнка",
    category: "vintage",
    previewBg: "#2a2a2a",
    previewStyle: "film",
    prompt: "Present this photo as if it's a frame from a 35mm film strip. Show sprocket holes on sides, film grain, slightly faded warm colors. Include film edge markings and frame numbers. Authentic analog photography look.",
  },
  {
    id: "retro-tv",
    name: "Ретро ТВ",
    category: "vintage",
    previewBg: "#c4a67a",
    previewStyle: "circle",
    prompt: "Place this photo inside a vintage 1970s television set screen. Rounded CRT screen, wood-grain TV cabinet, retro dials and antenna on top. Warm nostalgic tones, slight scan lines on the image.",
  },
  {
    id: "old-newspaper",
    name: "Газета",
    category: "vintage",
    previewBg: "#e8dcc0",
    previewStyle: "torn",
    aspectTall: true,
    prompt: "Transform this into a vintage newspaper clipping. Black and white halftone print style of the photo, placed in a newspaper layout with headline text, columns of text around it, aged yellowed paper texture, slightly torn edges.",
  },
  {
    id: "vhs-tape",
    name: "VHS",
    category: "vintage",
    previewBg: "#1a1a3a",
    previewStyle: "tape",
    premium: true,
    prompt: "Apply authentic VHS tape aesthetic to this photo. Scan lines, tracking errors, chromatic aberration, date stamp in corner (showing random 90s date), slightly warped and fuzzy. Blue-tinted paused VHS look with 'PLAY' indicator.",
  },

  // LOVE LETTERS
  {
    id: "wax-seal",
    name: "Сургуч",
    category: "love",
    previewBg: "#8b2020",
    previewStyle: "circle",
    previewAccent: "#d4a843",
    aspectTall: true,
    prompt: "Create a romantic composition: this photo in a circular frame with ornate gold edges, placed on dark red velvet background. A large decorative red wax seal with a heart imprint overlapping the bottom. Love letter romantic aesthetic.",
  },
  {
    id: "love-envelope",
    name: "Конверт",
    category: "love",
    previewBg: "#f5ede0",
    previewStyle: "stamp",
    prompt: "Place this photo as if it's being pulled out of a vintage cream envelope. Handwritten address on the envelope, postal stamps, red heart sticker seal. Romantic correspondence aesthetic, warm soft lighting.",
  },
  {
    id: "rose-frame",
    name: "Розы",
    category: "love",
    previewBg: "#3a1a1a",
    previewStyle: "collage",
    premium: true,
    prompt: "Frame this photo with an arrangement of deep red roses and green leaves. Dark moody background, the photo in the center with roses cascading around the edges. Romantic, dramatic, rich colors. Vintage Valentine aesthetic.",
  },
  {
    id: "handwritten",
    name: "Дорогой...",
    category: "love",
    previewBg: "#f0e6d6",
    previewStyle: "torn",
    prompt: "Present this photo on aged parchment paper with handwritten love letter text flowing around it. Cursive calligraphy, ink spots, fountain pen nearby. The photo slightly overlapping the handwritten text. Intimate letter aesthetic.",
  },

  // FILM
  {
    id: "kodak-gold",
    name: "Kodak Gold",
    category: "film",
    previewBg: "#d4a843",
    previewStyle: "film",
    previewAccent: "#c4453c",
    prompt: "Apply Kodak Gold 200 film stock look to this photo. Warm golden tones, slightly overexposed highlights, rich saturated colors, visible film grain. Include Kodak film border with frame numbers and 'KODAK GOLD 200' text on the edge.",
  },
  {
    id: "fuji-400",
    name: "Fuji 400H",
    category: "film",
    previewBg: "#4a6a5a",
    previewStyle: "polaroid",
    prompt: "Apply Fuji Pro 400H film stock aesthetic to this photo. Cool pastel tones, slightly muted greens and blues, soft highlights, fine grain. Dreamy ethereal quality. Include film rebate border with Fuji markings.",
  },
  {
    id: "disposable",
    name: "Мыльница",
    category: "film",
    previewBg: "#2a3a2a",
    previewStyle: "tape",
    aspectTall: true,
    prompt: "Make this look like it was taken on a cheap disposable camera. Flash-lit, slightly off-center framing, heavy vignetting, date stamp in orange (showing random date), green-tinted shadows, grainy. Authentic disposable camera aesthetic.",
  },
  {
    id: "cinema-scope",
    name: "CinemaScope",
    category: "film",
    previewBg: "#1a1a1a",
    previewStyle: "magazine",
    premium: true,
    prompt: "Transform this photo into a cinematic movie still. Wide 2.39:1 aspect ratio with black letterbox bars, film color grading (teal and orange), lens flare, cinematic lighting. Add subtle film grain. Movie poster quality.",
  },

  // ART
  {
    id: "oil-portrait",
    name: "Масло",
    category: "art",
    previewBg: "#3a2a1a",
    previewStyle: "circle",
    aspectTall: true,
    prompt: "Transform this photo into a classical oil painting portrait in the style of Renaissance masters. Rich warm colors, dramatic chiaroscuro lighting, visible brushstrokes, ornate gilded frame visible at edges. Museum-quality fine art.",
  },
  {
    id: "watercolor",
    name: "Акварель",
    category: "art",
    previewBg: "#e8dcc8",
    previewStyle: "torn",
    prompt: "Transform this photo into a beautiful watercolor painting. Soft flowing edges, translucent color washes, visible watercolor paper texture, gentle blending. Some areas detailed, others loose and flowing. Artistic and delicate.",
  },
  {
    id: "anime",
    name: "Аниме",
    category: "art",
    previewBg: "#c4a0d4",
    previewStyle: "polaroid",
    prompt: "Transform this photo into high-quality anime style art. Keep features recognizable but render in beautiful anime style with vibrant colors, clean lines, expressive eyes. Studio Ghibli inspired aesthetic, warm lighting.",
  },
  {
    id: "comic-panel",
    name: "Комикс",
    category: "art",
    previewBg: "#d4c43c",
    previewStyle: "tape",
    premium: true,
    prompt: "Transform this photo into a dynamic comic book panel. Bold ink outlines, dramatic shading with crosshatching, halftone dots, action lines. Vibrant flat colors, speech bubble with '...' text. Marvel comic book energy.",
  },

  // POP
  {
    id: "pop-art",
    name: "Поп-арт",
    category: "pop",
    previewBg: "#e83030",
    previewStyle: "grid-text",
    previewAccent: "#ffd700",
    prompt: "Transform this into Andy Warhol style pop art. Bold flat colors, high contrast, repeated in a 2x2 grid with different color schemes (like the Marilyn Monroe prints). Screen print aesthetic, vibrant and graphic.",
  },
  {
    id: "neon-glow",
    name: "Неон",
    category: "pop",
    previewBg: "#0a0a2a",
    previewStyle: "circle",
    previewAccent: "#ff00ff",
    aspectTall: true,
    prompt: "Add dramatic neon glow effects to this photo. Neon light outlines around the subject in vivid pink and cyan. Dark background, light trails, bokeh effects. Cyberpunk night club aesthetic.",
  },
  {
    id: "glitch",
    name: "Глитч",
    category: "pop",
    previewBg: "#1a1a1a",
    previewStyle: "tape",
    prompt: "Apply heavy glitch art effects to this photo. RGB channel splitting, pixel sorting, data corruption artifacts, scan lines, digital distortion. Vaporwave/glitch aesthetic, colorful errors on dark background.",
  },
  {
    id: "sticker-pack",
    name: "Стикер",
    category: "pop",
    previewBg: "#f5f0e8",
    previewStyle: "collage",
    prompt: "Transform this person into a cute die-cut sticker design. White outline border, slightly chibi/cartoon proportions, vibrant flat colors, kawaii expression. Clean vector-like style on a clean background. Sticker pack ready.",
  },

  // MINIMAL
  {
    id: "line-art",
    name: "Лайн-арт",
    category: "minimal",
    previewBg: "#f5f0e8",
    previewStyle: "circle",
    prompt: "Convert this photo into elegant continuous line art drawing. Single black line on white/cream background, minimal and artistic. Focus on capturing the essence with as few lines as possible. Gallery-worthy minimalist art.",
  },
  {
    id: "duotone",
    name: "Дуотон",
    category: "minimal",
    previewBg: "#1a3a5a",
    previewStyle: "magazine",
    aspectTall: true,
    prompt: "Apply a striking duotone effect to this photo. Two colors only: deep navy blue for shadows and warm gold/cream for highlights. High contrast, graphic design poster aesthetic. Bold and modern.",
  },
  {
    id: "silhouette",
    name: "Силуэт",
    category: "minimal",
    previewBg: "#f0a060",
    previewStyle: "polaroid",
    prompt: "Convert this photo into a dramatic silhouette against a warm sunset gradient background (orange to purple to dark blue). The person as a clean black silhouette, beautiful sky colors behind. Peaceful and cinematic.",
  },

  // MEMES
  {
    id: "action-figure",
    name: "Фигурка",
    category: "meme",
    previewBg: "#2a4a8a",
    previewStyle: "polaroid",
    aspectTall: true,
    prompt: "Create this person as a collectible action figure in retail packaging. Clear plastic front, cardboard backing with graphics and barcode. Include funny accessories and a product name. Professional toy photography, studio lighting.",
  },
  {
    id: "wanted",
    name: "Розыск",
    category: "meme",
    previewBg: "#d4a870",
    previewStyle: "torn",
    prompt: "Create an Old West 'WANTED' poster featuring this person. Aged yellowed paper, torn edges, 'WANTED DEAD OR ALIVE' text, reward amount '$10,000', sepia-toned photo, western typography. Authentic Wild West poster.",
  },
  {
    id: "trading-card",
    name: "Карточка",
    category: "meme",
    previewBg: "#d4a843",
    previewStyle: "magazine",
    premium: true,
    prompt: "Transform this person into a holographic trading card (Pokemon/Yu-Gi-Oh style). Holographic rainbow shimmer effect on the card, character stats at the bottom, card name at top, decorative border. Collectible card game aesthetic.",
  },
  {
    id: "renaissance",
    name: "Ренессанс",
    category: "meme",
    previewBg: "#3a2a1a",
    previewStyle: "heart",
    previewAccent: "#d4a843",
    prompt: "Recreate this photo as a dramatic 'Accidental Renaissance' painting. Baroque lighting, rich oil painting textures, dramatic composition. As if Caravaggio painted this candid moment. Dark, moody, theatrical masterpiece.",
  },
];

export function getTemplatesByCategory(categoryId: string) {
  return templates.filter((t) => t.category === categoryId);
}

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}
