'use client';
// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; // Adjust the import path as needed
import { useEffect } from 'react';
import Login from './Login';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Signup from './Signup';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return user
    ? <>{children}</>
    : <>
    <div className='flex w-full justify-center h-screen'>
      <Tabs defaultValue="login" className="flex flex-col justify-center items-center">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login /></TabsContent>
        <TabsContent value="signup"><Signup /></TabsContent>
      </Tabs>
    </div>
    </>
};

export default ProtectedRoute;