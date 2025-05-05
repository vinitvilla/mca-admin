// src/app/components/cms/ContentManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagesContentData, updateField, resetUpdatedContent } from '@/store/modules/content/reducer';
import { useAuth } from '@/contexts/AuthContext'; // Adjust based on your auth setup
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageEditor from './PageEditor';
import StickyBar from './StickyBar';
import { Toaster } from 'sonner';
import { RootState } from '@/store/store';
import { ContentField, PageContent } from '@/store/modules/content/types';

export default function ContentManagement() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  // provide types for the pagesContentData and updatedPagesContentData
  const { pagesContentData, updatedPagesContentData }:
    { pagesContentData: PageContent, updatedPagesContentData: PageContent } = useSelector((state: RootState) => state.content);
  const [loading, setLoading] = useState<boolean>(true);
  const hasChanges = JSON.stringify(pagesContentData) !== JSON.stringify(updatedPagesContentData);

  useEffect(() => {
    if (!user) return;

    const fetchContent = async () => {
      try {
        const token = await user.getIdToken();
        const pageIds = ['home', 'about']; // Adjust based on your page IDs
        const contentData: any = {};

        for (const pageId of pageIds) {
          const response = await fetch(`/api/admin/content?pageId=${pageId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          contentData[pageId] = data.temporary.length > 0 ? data.temporary : data.latest;
        }

        dispatch(setPagesContentData(contentData));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, [user, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to edit content.</p>;

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      {hasChanges && <StickyBar />}
      <Tabs defaultValue="home">
        <TabsList>
          {Object.keys(updatedPagesContentData).map((pageId) => (
            <TabsTrigger key={pageId} value={pageId}>
              {pageId.charAt(0).toUpperCase() + pageId.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(updatedPagesContentData).map(([pageId, fields], index) => (
          <TabsContent key={pageId} value={pageId}>
            <PageEditor pageId={pageId} fields={fields} pageIndex={index} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}