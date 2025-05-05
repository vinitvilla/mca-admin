'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setPagesContentData, setUpdatedPagesContentData, updateField, resetUpdatedContent } from '@/store/modules/content/reducer';
import { useAuth } from '@/contexts/AuthContext';
import SettingsPage from '@/app/components/Settings';
import CMS from '@/app/components/cms/ContentManagement';

export default function ContentManagement() {
  const { user, loading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { pagesContentData, updatedPagesContentData } = useSelector((state: RootState) => state.content);
  const [selectedPage, setSelectedPage] = useState('home');
  const [pages, setPages] = useState<{ pageId: string; title: string }[]>([]);

  useEffect(() => {
    fetch('/api/admin/pages')
      .then(res => res.json())
      .then(data => setPages(data));
  }, []);

  useEffect(() => {
    if (selectedPage && user) {
      user.getIdToken().then(token => {
        fetch(`/api/admin/content?pageId=${selectedPage}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => {
            dispatch(setPagesContentData({ [selectedPage]: data.latest }));
            dispatch(setUpdatedPagesContentData({ [selectedPage]: data.temporary.length ? data.temporary : data.latest }));
          })
          .catch(err => console.error(err));
      });
    }
  }, [selectedPage, user, dispatch]);

  const hasChanges = JSON.stringify(pagesContentData[selectedPage]) !== JSON.stringify(updatedPagesContentData[selectedPage]);

  const handleSave = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: selectedPage, fields: updatedPagesContentData[selectedPage], action: 'save' }),
    });
  };

  const handleDiscard = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: selectedPage }),
    });
    dispatch(resetUpdatedContent(selectedPage));
  };

  const handlePublish = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: selectedPage, fields: updatedPagesContentData[selectedPage], action: 'publish' }),
    });
    dispatch(setPagesContentData({ [selectedPage]: updatedPagesContentData[selectedPage] }));
    dispatch(resetUpdatedContent(selectedPage));
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <CMS />
  );
}