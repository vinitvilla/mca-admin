// src/app/admin/scripts/insertData/page.tsx
'use client';
import { Button } from '@/components/ui/button'; // Adjust based on your UI library
import { useAuth } from '@/contexts/AuthContext'; // Adjust based on your auth setup
import { useState } from 'react';
import { toast } from 'sonner';

export default function InsertData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleInsert = async () => {
    if (!user) {
      toast.error('Please log in to insert data');
      return;
    }

    setLoading(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/admin/insert', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to insert data');
      const data = await response.json();
      toast.success(`Data inserted successfully with timestamp: ${data.timestamp}`);
    } catch (error) {
      console.error('Error inserting data:', error);
      toast.error(`Failed to insert data: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleInsert} disabled={loading}>
        {loading ? 'Inserting...' : 'Insert Data into Firestore'}
      </Button>
    </div>
  );
}