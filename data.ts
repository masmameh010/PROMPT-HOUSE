import { AiModel, PromptItem } from './types';

// INSTRUCTIONS FOR OWNER:
// To add a new image/prompt:
// 1. Upload your image to Cloudinary.
// 2. Copy the Image URL.
// 3. Add a new object to the 'PROMPTS' array below.

export const PROMPTS: PromptItem[] = [
  {
    id: '1',
    title: 'Pools',
    model: AiModel.Gemini,
    subModel: 'Nano Banana 2.5',
    imageUrl: 'https://imgur.com/gallery/new-prompt-I0LoGXQ#YSk7iFs', // Replace with your Cloudinary URL
    prompt: 'A casual snapshot style, featuring a fair complexion, cool-toned skin, and a fresh, elegant makeup look. A high-profile internet celebrity with an hourglass figure [Uploaded image] , she wears a one-shoulder off-white one-piece swimsuit with a single shoulder strap and a cutout waist, highlighting her body lines. The high-cut swimsuit is paired with a simple, delicate necklace. She poses with a sweet and elegant expression using a casual filter, at a popular rooftop pool. Standing in the pool against a backdrop of a city skyline, the photo adds a touch of everyday life. She looks directly at the camera, using a first-person perspective with her legs close to her body and a low angle.
',
    negativePrompt: '-',
    dateAdded: '2025-12-09',
    tags: ['Realistic', 'People', 'Character']
  },
  {
    id: '2',
    title: 'Abstract Fluid Dreams',
    model: AiModel.Gemini,
    subModel: 'Nano Banana Pro',
    imageUrl: 'https://picsum.photos/seed/fluid/800/1000',
    prompt: 'Swirling liquid colors, abstract expressionism, gold and turquoise, ethereal atmosphere, macro photography style.',
    dateAdded: '2023-10-26',
    tags: ['Abstract', 'Artistic']
  },
  {
    id: '3',
    title: 'Cozy Coffee Shop Anime Style',
    model: AiModel.Illustrious,
    subModel: 'V1',
    imageUrl: 'https://picsum.photos/seed/coffee/800/800',
    prompt: 'Anime style illustration, a cozy coffee shop interior, warm lighting, rain on window, lo-fi aesthetic, highly detailed.',
    negativePrompt: 'photorealistic, 3d render',
    dateAdded: '2023-10-25',
    tags: ['Anime', 'Scenery', 'Cozy']
  },
  {
    id: '4',
    title: 'Hyper-realistic Portrait',
    model: AiModel.SD,
    subModel: 'SDXL',
    imageUrl: 'https://picsum.photos/seed/portrait/800/1200',
    prompt: 'Close up portrait of an elderly woman with wisdom in her eyes, tribal markings, natural lighting, bokeh background, 85mm lens.',
    dateAdded: '2023-10-24',
    tags: ['Portrait', 'Realistic']
  },
  {
    id: '5',
    title: 'Surreal Space Whale',
    model: AiModel.Dreamina,
    subModel: 'Seedream 4',
    imageUrl: 'https://picsum.photos/seed/whale/1000/600',
    prompt: 'A giant whale flying through a nebula in deep space, stars reflecting on skin, bioluminescent glow, majestic.',
    dateAdded: '2023-10-23',
    tags: ['Space', 'Surreal', 'Nature']
  },
  {
    id: '6',
    title: 'Minimalist Logo Vector',
    model: AiModel.Grok,
    subModel: 'V1',
    imageUrl: 'https://picsum.photos/seed/logo/800/800',
    prompt: 'Minimalist vector logo of a fox, flat design, orange and white, white background, clean lines.',
    dateAdded: '2023-10-22',
    tags: ['Logo', 'Design']
  }
];
