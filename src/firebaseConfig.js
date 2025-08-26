// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBaEgIjr8eAhWKL6t3q_9W0g6h95TZL9ZI",
  authDomain: "cluevault-8b393.firebaseapp.com",
  projectId: "cluevault-8b393",
  storageBucket: "cluevault-8b393.firebasestorage.app",
  messagingSenderId: "769830596358",
  appId: "1:769830596358:web:3ac28e398cfe7805e8b887",
  measurementId: "G-XF6BN385R9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
