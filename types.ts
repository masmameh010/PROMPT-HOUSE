export enum AiModel {
  Gemini = 'Gemini',
  Dreamina = 'Dreamina',
  FLUX = 'FLUX',
  SD = 'SD',
  XL = 'XL',
  Illustrious = 'Illustrious',
  Grok = 'Grok'
}

export interface PromptItem {
  id: string;
  title: string;
  model: AiModel;
  subModel: string; // e.g., 'Nano Banana', 'Flux.1'
  imageUrl: string;
  prompt: string;
  negativePrompt?: string;
  tags?: string[];
  author?: string;
  dateAdded: string;
}

export interface FilterState {
  model: AiModel | 'All';
  search: string;
}