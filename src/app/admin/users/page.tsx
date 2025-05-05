// src/app/(admin)/users/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Players from '@/app/components/users/players/Players'; // Updated path
import Staffs from '@/app/components/users/Staffs';   // Updated path
import Coaches from '@/app/components/users/Coaches'; // Updated path

export default function Users() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="staffs">Staffs</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
        </TabsList>
        <TabsContent value="players">
          <Players />
        </TabsContent>
        <TabsContent value="staffs">
          <Staffs />
        </TabsContent>
        <TabsContent value="coaches">
          <Coaches />
        </TabsContent>
      </Tabs>
    </div>
  );
}