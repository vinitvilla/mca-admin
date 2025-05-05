// src/app/components/cms/ElementEditor.tsx
import { useDispatch } from 'react-redux';
import { updateField } from '@/store/modules/content/reducer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContentField } from '@/store/modules/content/types';

export default function ElementEditor({ field, path }: { field: ContentField; path: string[] }) {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateField({
      pageId: path[0],
      field: { ...field, content: e.target.value },
    }));
  };

  if (field.type === 'text') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{field.fieldId}</label>
        <Input
          value={field.content}
          onChange={handleChange}
          maxLength={field.maxChar}
        />
      </div>
    );
  }
  if (field.type === 'textarea') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{field.fieldId}</label>
        <Textarea
          value={field.content}
          onChange={handleChange}
          maxLength={field.maxChar}
        />
      </div>
    );
  }
  return <p>{field.content}</p>; // Placeholder for other types
}