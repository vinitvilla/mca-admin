// src/app/components/cms/PageEditor.tsx
import { ContentField } from '@/store/modules/content/types';
import ElementEditor from './ElementEditor';

export default function PageEditor({ pageId, fields, pageIndex }: { pageId: string; fields: ContentField[]; pageIndex: number }) {
  return (
    <div>
      {fields.map((field: ContentField, fieldIndex: number) => (
        <div key={field.fieldId} className="border p-4 mb-4">
          <ElementEditor
            field={field}
            path={[pageId, fieldIndex.toString()]}
          />
        </div>
      ))}
    </div>
  );
}