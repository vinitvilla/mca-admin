// src/store/modules/auth/types.ts
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

// Define a serializable user type
export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}