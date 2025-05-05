// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Load environment variables (use plain names, not NEXT_PUBLIC_ for server-side)
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Check if credentials are valid
if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
  throw new Error('Firebase credentials are missing or incomplete. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
}

if (!admin.apps.length) {
  try {
    console.log('Initializing Firebase Admin with credentials:', {
      projectId: firebaseConfig.projectId,
      clientEmail: firebaseConfig.clientEmail,
      privateKey: '***' // Mask private key for logging
    });
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
} else {
  console.log('Firebase Admin already initialized');
}

export const adminAuth = admin.auth();
export const db = admin.firestore();