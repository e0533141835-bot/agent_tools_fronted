import { getAuth } from "firebase/auth"; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8ImfMj_sdAl3HWVwrENBAuerHnua38fI",
  authDomain: "practicom-app.firebaseapp.com",
  projectId: "practicom-app",
  storageBucket: "practicom-app.firebasestorage.app",
  messagingSenderId: "873165747799",
  appId: "1:873165747799:web:9f9c041ab50719fced1512"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);