// src/hooks/useLogin.ts
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/store/modules/auth/actions';
import { SerializableUser } from '@/store/modules/auth/types';

interface LoginState {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
}

const serializeUser = (user: User): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

export function useLogin(
  onLoginSuccess?: () => void,
  onLogoutSuccess?: () => void
) {
  const dispatch = useDispatch();
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      setState(prev => ({ ...prev, error: 'Please fill in all fields' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);
      const firebaseUser = userCredential.user;
      console.log('Firebase UID:', firebaseUser.uid);

      // Fetch user data from PostgreSQL via API
      const token = await firebaseUser.getIdToken();
      const response = await fetch('/api/auth/user', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData: SerializableUser = await response.json();
      dispatch(setUser(userData));

      setState({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
      onLoginSuccess?.();
    } catch (err: any) {
      let errorMessage = 'Failed to login. Please try again.';
      switch (err.code) {
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
      }
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  const handleLogout = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signOut(auth);
      dispatch(clearUser());
      setState(prev => ({ ...prev, loading: false }));
      onLogoutSuccess?.();
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: 'Failed to logout. Please try again.',
        loading: false,
      }));
    }
  };

  const setEmail = (email: string) =>
    setState(prev => ({ ...prev, email }));

  const setPassword = (password: string) =>
    setState(prev => ({ ...prev, password }));

  return {
    email: state.email,
    password: state.password,
    error: state.error,
    loading: state.loading,
    handleLogin,
    handleLogout,
    setEmail,
    setPassword,
  };
}