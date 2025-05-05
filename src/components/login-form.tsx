// src/components/LoginForm.tsx
'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from '@/hooks/useLogin';
import { useSelector } from 'react-redux';
import { AuthState } from '@/store/modules/auth/reducer';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: { auth: AuthState }) => state.auth);

  const {
    email,
    password,
    error,
    loading,
    handleLogin,
    handleLogout,
    setEmail,
    setPassword,
  } = useLogin(
    () => router.push('/'), // onLoginSuccess
    () => router.push('/login') // onLogoutSuccess
  );

  // Redirect based on auth state
  useEffect(() => {
    if (isAuthenticated && user?.roleName === 'admin') {
      router.push('/content');
    } else if (isAuthenticated) {
      router.push('/'); // Non-admins go to public home
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isAuthenticated ? 'Welcome' : 'Login'}
          </CardTitle>
          <CardDescription>
            {isAuthenticated
              ? `Logged in as ${user?.displayName || user?.email || 'User'} (${user?.roleName || 'Unknown Role'})`
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAuthenticated ? (
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button
                onClick={handleLogout}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}