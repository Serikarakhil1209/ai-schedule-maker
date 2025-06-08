// src/Config/Config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCVysKV0aQq6KV_c23Zakxghi-LdeydO98",
  authDomain: "ai-goal-3baef.firebaseapp.com",
  projectId: "ai-goal-3baef",
  storageBucket: "ai-goal-3baef.firebasestorage.app",
  messagingSenderId: "384536603147",
  appId: "1:384536603147:web:b18a9e39e8a43dc1cb350e",
  measurementId: "G-9ZMBKMFXWH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth };
export {db};
