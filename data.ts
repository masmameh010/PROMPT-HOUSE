import { AiModel, PromptItem } from './types';

// ==============================================================================
// PETUNJUK CARA UPDATE (MANUAL):
// ==============================================================================
// 1. Edit file ini ATAU public/prompts.json
// 2. Untuk "imageUrl", Anda punya 2 pilihan:
//    a. Link Online (Mudah): "https://cdn.discordapp.com/..." atau "https://github.com/..."
//    b. File Lokal (Ribet): Upload foto ke folder /public/images/, lalu tulis "/images/nama.jpg"
// 3. Pastikan format JSON valid (ada koma antar item).
// ==============================================================================

export const PROMPTS: PromptItem[] = [
  {
    id: "032",
    title: "Ballerina",
    model: AiModel.Gemini,
    subModel: "Nano 2.5",
    imageUrl: "https://res.cloudinary.com/imajinasilokal/image/upload/v1765948982/LOKAL_27_r2haov.jpg",
    prompt: "A sweet-smiling, 20-year-old ballerina, dressed in a black leotard, her expression focused, stretches her limbs against the gentle breeze, gracefully dancing on the stage against a backdrop of darkness. She performs highly difficult moves, the style rendered in a dark, realistic oil painting style.",
    dateAdded: "2025-12-16",
    tags: ["LOKAL"],
    author: "Admin"
  },
  {
    id: "031",
    title: "Baju Garang",
    model: AiModel.Gemini,
    subModel: "Nano 2.5",
    imageUrl: "https://res.cloudinary.com/imajinasilokal/image/upload/v1765948982/LOKAL_26_iqjcue.jpg",
    prompt: "Ju Jingyi, a woman from Jiangnan, with long, straight black hair, wears a coffee-colored steampunk-style leather jacket with multiple metal buttons, a turtleneck top, leather pants and a leather leotard, and leather boots. She also wears a leather hat, a belt, and a leather bag with metal embellishments at her waist. Cool, domineering, and featuring exaggerated earrings, she exudes trendy elements and a fashionable style...",
    dateAdded: "2025-12-16",
    tags: ["LOKAL"],
    author: "Admin"
  },
  {
    id: "030",
    title: "Seragam Pose Enak",
    model: AiModel.Gemini,
    subModel: "Nano 2.5",
    imageUrl: "https://res.cloudinary.com/imajinasilokal/image/upload/v1765948982/LOKAL_25_oh5dje.jpg",
    prompt: "A nighttime photo of a female model: bangs, bob haircut, POV perspective, random private space, wearing a white and navy blue sailor-style long-sleeved top (mainly white with navy blue details at the collar and front, and a matching bow tie), and black finger cots on the cuffs; a navy blue pleated skirt...",
    dateAdded: "2025-12-16",
    tags: ["LOKAL"],
    author: "Masmameh"
  },
  {
    id: "029",
    title: "Love Love Gesture",
    model: AiModel.Gemini,
    subModel: "Nano 2.5",
    imageUrl: "https://res.cloudinary.com/imajinasilokal/image/upload/v1765948982/LOKAL_24_ifg6ze.jpg",
    prompt: "A casual snapshot style, unprofessional lighting, front-facing photo, featuring a beautiful internet celebrity with fair skin, even and natural skin tone, and clearly visible brown hair. She exudes a pure and alluring vibe, sitting on Chongqing Metro Line 3 with her hands making a heart shape...",
    dateAdded: "2025-12-16",
    tags: ["LOKAL"],
    author: "Admin"
  },
  {
    id: "028",
    title: "Pose Santai Di Mobil",
    model: AiModel.Gemini,
    subModel: "Nano 2.5",
    imageUrl: "https://res.cloudinary.com/imajinasilokal/image/upload/v1765948983/LOKAL_23_eqmpqi.jpg",
    prompt: "A casual snapshot style shot of an 18-year-old high-value internet celebrity [uploaded image] with black hair, an hourglass figure, a large bust, and fair, translucent skin. She wears a light gray cropped tank top paired with distressed denim shorts, leaning against the rear of a light blue car...",
    dateAdded: "2025-12-16",
    tags: ["LOKAL"],
    author: "Masmameh"
  },
  {
    id: "022",
    title: "Violet Chill",
    model: AiModel.Gemini,
    subModel: "Nano 2.5",
    imageUrl: "https://res.cloudinary.com/imajinasilokal/image/upload/v1765948987/LOKAL_17_kadbut.jpg",
    prompt: "Strong perspective, cinematic feel, visual tension. Realistic style, Chinese artistic influencer [uploaded image] , full of internet aesthetic atmosphere. Fair skin and beautiful appearance, extremely high beauty score, aloof style, uninhibited, natural relaxed feeling...",
    dateAdded: "2025-12-16",
    tags: ["LOKAL"],
    author: "Mana"
  },
  // Data fallback ini dipotong agar tidak terlalu panjang. 
  // Sumber kebenaran utama adalah public/prompts.json
];