import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0p4jpwojNAwfhHc4GdT30pGCewnoSEM8",
  authDomain: "graph-paths-contest.firebaseapp.com",
  projectId: "graph-paths-contest",
  storageBucket: "graph-paths-contest.firebasestorage.app",
  messagingSenderId: "199009773144",
  appId: "1:199009773144:web:ff99617682b1ad9342cc2d",
  measurementId: "G-E202VTDE75",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);