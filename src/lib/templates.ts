export interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  photoCount: number;
  previewBg: string;
  previewAccent: string;
}

export const templates: Template[] = [
  {
    id: "booth-polka",
    name: "Polka Dots",
    description: "Горошек + кружевная рамка",
    photoCount: 3,
    previewBg: "#f5f0e8",
    previewAccent: "#1a1a1a",
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
    name: "Stripes",
    description: "Красно-белые полоски",
    photoCount: 3,
    previewBg: "#f5e8e8",
    previewAccent: "#c44040",
    prompt: `I'm giving you a vertical strip of 3 photos stacked on top of each other. Create a vintage photo booth result:

1. Keep ALL THREE photos clearly visible, stacked vertically in a column, evenly spaced. Each photo must remain EXACTLY as provided — same people, same poses, same composition. Do NOT alter, redraw, or reimagine the photos in any way.
2. Convert all three photos to BLACK AND WHITE with slight warm sepia tone, like a real photo booth.
3. Give each photo slightly rounded corners.
4. Place the photo strip on a background of RED AND WHITE VERTICAL STRIPES pattern (classic candy stripe / circus stripe fabric texture).
5. The final image should be tall portrait orientation (like a real photo booth strip).
6. The overall aesthetic should look like a vintage carnival photo booth — nostalgic, fun, romantic.

CRITICAL: The three photos must look IDENTICAL to the originals. Only change the color to B&W sepia. Do not redraw faces or change expressions.`,
  },
];

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}
