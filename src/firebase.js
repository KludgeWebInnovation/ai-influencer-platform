import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace this with your Firebase configuration from earlier
const firebaseConfig = {
  apiKey: "AIzaSyC09DCsc8eEuxd4fOotBeM4jzYZYcjyGKM"
  authDomain: "ai-influencer-platform-8c79d.firebaseapp.com",
  projectId: "ai-influencer-platform-8c79d",
  storageBucket: "ai-influencer-platform-8c79d.firebasestorage.app",
  messagingSenderId: "273865075438",
  appId: "1:273865075438:web:85f3967772c950bf72e1ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;