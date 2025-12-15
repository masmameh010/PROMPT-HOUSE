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
    id: '1765541140661',
    title: 'Chinese Clothes On Sofa',
    model: AiModel.Gemini,
    subModel: 'Nano Banana 2.5',
    imageUrl: 'https://res.cloudinary.com/imajinasilokal/image/upload/v1765541121/bananalokal_1765427248561_igp2nr.png',
    prompt: 'A young Chinese woman wearing glasses, dressed in a modern cheongsam, with gray sheer pantyhose covering her long legs and pointed high heels, sat shyly on a leather chair in a modern living room. She Shyly Smile To Camera, Behind her was a colorful Several anime-style Poster On wall, and warm lighting made her face blush slightly.',
    dateAdded: '2025-12-12',
    tags: ['LOKAL']
  },
  
  {
    id: '1765541741577',
    title: 'Dog Mask Girl',
    model: AiModel.Gemini,
    subModel: 'Nano Banana 2.5',
    imageUrl: 'https://res.cloudinary.com/imajinasilokal/image/upload/v1765541580/bananalokal_1765414802115_snzkaa.png',
    prompt: 'Portrait photography works, focusing on the effects of light and shadow, with rich and layered colors, showcasing a unique artistic atmosphere, sophisticated composition, woman , ball, black and blue, exquisite dog mask, alluring, gold edge effect, close-up of face, upper body lying on the table, playfully sticking out tongue, drool dripping onto the table, beautiful and delicate color matching, rich details, dynamic capture. 9:16',
    dateAdded: '2025-12-12',
    tags: ['LOKAL']
  },
  
  {
    id: '1765541817235',
    title: 'Sit On Sofa With Cinematic Light',
    model: AiModel.Gemini,
    subModel: 'Nano Banana PRO',
    imageUrl: 'https://res.cloudinary.com/imajinasilokal/image/upload/v1765541627/Gemini_Generated_Image_vsmqw5vsmqw5vsmq_iwzylf.png',
    prompt: 'Dramatic lensing, blurry trendy cool portraits and scenes, iconic scene, retro, vintage, sense of presence, déjà vu, emotional atmosphere, moody ambiance, film grain, cinematic look, Dutch angle, hazy aesthetic, soft focus, motion blur, Instagram style, strong perspective, visual impact, alluring, ethereal, dreamcore, Rembrandt lighting, light and shadow rendering, avant-garde artistic aesthetic, rich in detail, sophisticated feel, layered blur blending, masterpiece. Focus on a graceful influencer girl [uploaded image] , exquisite facial features, soft style makeup, warm reddish-brown lip color, eyes are soft with a hint of coolness, overall demeanor is calm yet tells a story; perfect curvy and full figure, wearing the clothes from the reference image (halterneck style), arrogant and mischievous expression. The beautiful woman is sitting on an indoor sofa.',
    dateAdded: '2025-12-12',
    tags: ['LOKAL']
  },
    
  {
    id: '1765541872261',
    title: 'Pink Rangers is Action',
    model: AiModel.Gemini,
    subModel: 'Nano Banana 2.5',
    imageUrl: 'https://res.cloudinary.com/imajinasilokal/image/upload/v1765541576/bananalokal_1765392180192_jqtil3.png',
    prompt: 'At home, a beautiful female [uploaded image]  warrior wearing a pink Power Rangers bodysuit adorned with white curves, white mid-length boots, white mid-length gloves, and long black hair. A  man in ordinary casual home clothes stands behind her; only his body from the neck down appears in the shot. The man lifts her by supporting the insides of her knees with separated hands. Her body is suspended in the air, legs Spreads natural, her leg is apart, and lower legs hanging down. She makes the V-sign with both hands, shown in a close-up overhead shot.',
    dateAdded: '2025-12-12',
    tags: ['LOKAL']
  },
      
  {
    id: '1765541963355',
    title: 'Selfie Black Maid Costume',
    model: AiModel.Gemini,
    subModel: 'Nano Banana 2.5',
    imageUrl: 'https://res.cloudinary.com/imajinasilokal/image/upload/v1765541571/dreamina-2025-12-10-5900-A_beautiful_19-year-old_indonesian_influ..._bukbst.jpg',
    prompt: 'A beautiful 19-year-old indonesian influencer [uploaded image] with an hourglass figure, large bust, and fair skin. The photos feature a whitening and beautifying filter, brown hair, and an outdoor nighttime street scene (background, road, trees, dim lighting) that gives her skin a translucent, ethereal quality, creating a casual, nighttime internet vibe that is both everyday and atmospheric. The photos are taken with a mobile phone style, using everyday filters, and feature a sexy black and white maid-style dress with a sleeveless halter design and ribbon embellishments, shot from a low angle in a side profile.',
    dateAdded: '2025-12-12',
    tags: ['LOKAL']
  },
    
  {
    id: '1765541963356', 
    title: 'Chill in Window',
    model: AiModel.Gemini,
    subModel: 'Nano Banana 2.5',
    imageUrl: 'https://res.cloudinary.com/imajinasilokal/image/upload/v1765541575/bananalokal_10_3_rkwhdw.png',
    prompt: 'A woman [Uploaded image] sits on the wide windowsill of a quiet apartment, her back against the cool glass. Rain streaks down the pane outside. She wears a simple, oversized grey t-shirt, the fabric clinging damply to her skin. Her legs are drawn up, and one hand rests on her knee while the other holds a steaming mug, her gaze directed out the window, lost in thought. The entire image should be rendered to mimic the aesthetic of a high-quality DSLR camera from the early 2000s. This includes heavy pixelation, visible digital noise and grain, very high resolution, clearly porous skin texture, fine hairs on the hands and thighs, muted and desaturated colors, poor contrast, and generally soft or blurry focus. The lighting should appear flat and uneven, a characteristic of modern camera technology that captures the subtle details of skin texture, giving it an authentic, highly nostalgic, and somewhat raw hyper close-up snapshot feel. AR 9:16.',
    dateAdded: '2025-12-12',
    tags: ['LOKAL']
  },
  
  // PASTE KODE BARU DI SINI
  
];