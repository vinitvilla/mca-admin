// src/app/components/cms/StickyBar.tsx
import { useDispatch, useSelector } from 'react-redux';
import { setPagesContentData, resetUpdatedContent } from '@/store/modules/content/reducer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function StickyBar() {
  const dispatch = useDispatch();
  const { updatedPagesContentData } = useSelector((state: any) => state.content);
  const { user } = useAuth();

  const handleSave = async () => {
    try {
      const token = await user.getIdToken();
      for (const [pageId, fields] of Object.entries(updatedPagesContentData)) {
        const response = await fetch('/api/admin/content', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId, fields, action: 'save' }),
        });
        if (!response.ok) throw new Error('Failed to save');
      }
      dispatch(setPagesContentData(updatedPagesContentData));
      toast.success('Changes saved to temporary version');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save changes');
    }
  };

  const handlePublish = async () => {
    try {
      const token = await user.getIdToken();
      for (const [pageId, fields] of Object.entries(updatedPagesContentData)) {
        const response = await fetch('/api/admin/content', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId, fields, action: 'publish' }),
        });
        if (!response.ok) throw new Error('Failed to publish');
      }
      dispatch(setPagesContentData(updatedPagesContentData));
      toast.success('Content published successfully');
    } catch (error) {
      console.error('Error publishing data:', error);
      toast.error('Failed to publish changes');
    }
  };

  const handleDiscard = async () => {
    try {
      const token = await user.getIdToken();
      for (const pageId of Object.keys(updatedPagesContentData)) {
        const response = await fetch('/api/admin/content', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId }),
        });
        if (!response.ok) throw new Error('Failed to discard');
        dispatch(resetUpdatedContent(pageId));
      }
      toast.info('Changes discarded');
    } catch (error) {
      console.error('Error discarding changes:', error);
      toast.error('Failed to discard changes');
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white p-2 shadow-md flex justify-end space-x-4">
      <Button variant="outline" onClick={handleDiscard}>Discard</Button>
      <Button variant="outline" onClick={handleSave}>Save</Button>
      <Button onClick={handlePublish}>Publish</Button>
    </div>
  );
}