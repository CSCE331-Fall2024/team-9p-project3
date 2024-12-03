import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzH-e_Zk6B-teG7iQ3WzS3iktvbF1e-eI",
  authDomain: "csce331-project3-team9p.firebaseapp.com",
  projectId: "csce331-project3-team9p",
  storageBucket: "csce331-project3-team9p.firebasestorage.app",
  messagingSenderId: "924787381043",
  appId: "1:924787381043:web:f7cbc65bdab8dd96522446"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);