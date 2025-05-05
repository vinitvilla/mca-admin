// src/app/components/cms/SectionEditor.tsx
import ElementEditor from './ElementEditor';
import { Element, ContentElement } from '@/app/types/cms';

interface SectionEditorProps {
  section: Element;
  updateData: (path: string[], value: any) => void;
  sectionPath: string[];
}

export default function SectionEditor({ section, updateData, sectionPath }: SectionEditorProps) {
  return (
    <div className="border rounded-md p-4 mb-4 bg-gray-50">
      <h3 className="text-lg font-medium mb-2">Section: {section.id}</h3>
      {section.content.map((element: ContentElement, index: number) => {
        const field =
          element.type === 'image' ? 'src' : element.type === 'gallery' ? 'images' : 'content';
        return (
          <ElementEditor
            key={element.id}
            element={element}
            onUpdate={(newValue) =>
              updateData([...sectionPath, 'content', index.toString(), field], newValue)
            }
          />
        );
      })}
    </div>
  );
}