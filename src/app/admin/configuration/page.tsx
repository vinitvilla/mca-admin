// src/app/(admin)/users/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Users() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Configurations</h1>
      <Tabs defaultValue="social-media" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
          <TabsTrigger value="staffs">Staffs</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
        </TabsList>
        <TabsContent value="social-med">
        </TabsContent>
        <TabsContent value="staffs">
        </TabsContent>
        <TabsContent value="coaches">
        </TabsContent>
      </Tabs>
    </div>
  );
}