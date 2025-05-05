// src/app/types/cms.ts
export interface Page {
  name: string;
  url: string;
  title: string;
  elements: Element[];
}

export interface Element {
  id: string;
  type: string;
  backgroundImage?: string;
  content: ContentElement[];
}

export type ContentElement =
  | { id: string; type: 'text'; maxChar: number; content: string }
  | { id: string; type: 'textarea'; maxChar: number; content: string }
  | { id: string; type: 'image'; src: string; alt: string }
  | { id: string; type: 'gallery'; max: number; images: string[] }
  | { id: string; type: 'number'; content: number; label: string }
  | { id: string; type: 'button'; content: string; link: string };