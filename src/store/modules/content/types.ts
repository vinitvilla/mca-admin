// src/app/store/modules/content/types.ts
export interface ContentField {
  fieldId: string;
  type: string;
  content: string;
  [key: string]: any; // For additional fields like maxChar, src, etc.
}

export interface PageContent {
  [pageId: string]: ContentField[];
}

export interface ContentState {
  pagesContentData: PageContent;
  updatedPagesContentData: PageContent;
}