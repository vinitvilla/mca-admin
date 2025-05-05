// src/app/store/modules/content/reducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentState, PageContent, ContentField } from './types';

const initialState: ContentState = {
  pagesContentData: {},
  updatedPagesContentData: {},
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setPagesContentData(state, action: PayloadAction<PageContent>) {
      state.pagesContentData = action.payload;
      state.updatedPagesContentData = JSON.parse(JSON.stringify(action.payload)); // Deep copy
    },
    setUpdatedPagesContentData(state, action: PayloadAction<PageContent>) {
      state.updatedPagesContentData = action.payload;
    },
    updateField(state, action: PayloadAction<{ pageId: string; field: ContentField }>) {
      const { pageId, field } = action.payload;
      const currentFields = state.updatedPagesContentData[pageId] || [];
      const fieldIndex = currentFields.findIndex(f => f.fieldId === field.fieldId);
      if (fieldIndex >= 0) {
        currentFields[fieldIndex] = field;
      } else {
        currentFields.push(field);
      }
      state.updatedPagesContentData[pageId] = [...currentFields];
    },
    resetUpdatedContent(state, action: PayloadAction<string>) {
      state.updatedPagesContentData[action.payload] = state.pagesContentData[action.payload];
    },
  },
});

export const { setPagesContentData, setUpdatedPagesContentData, updateField, resetUpdatedContent } = contentSlice.actions;
export default contentSlice.reducer;