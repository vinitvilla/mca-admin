'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';

const Topbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
      <Button variant="secondary"  onClick={() => router.back()}>
        <MoveLeft />
        Back
      </Button>
      <div>
        <Button variant="destructive" className="ml-2">
          Discard
        </Button>
        <Button variant="secondary" className="ml-2">
          Save
        </Button>
        <Button variant="secondary" className="ml-2 outline-solid">
          Publish
        </Button>

      </div>
    </div>
  );
};

export default Topbar;