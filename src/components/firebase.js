// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9VYWJV9WhOX6pbvKq56noGJiMb7zaR80",
    authDomain: "food-app-6aad2.firebaseapp.com",
    projectId: "food-app-6aad2",
    storageBucket: "food-app-6aad2.firebasestorage.app",
    messagingSenderId: "794894745550",
    appId: "1:794894745550:web:73e94d38100838f39a759f",
    measurementId: "G-S3Q54DSBCZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db };

