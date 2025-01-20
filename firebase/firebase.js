// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyC0p4jpwojNAwfhHc4GdT30pGCewnoSEM8",
//   authDomain: "graph-paths-contest.firebaseapp.com",
//   projectId: "graph-paths-contest",
//   storageBucket: "graph-paths-contest.firebasestorage.app",
//   messagingSenderId: "199009773144",
//   appId: "1:199009773144:web:ff99617682b1ad9342cc2d",
//   measurementId: "G-E202VTDE75",
// };

// const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGJoMlgHbVS9L3VTQWN00ibNlKItaCIWM",
  authDomain: "wumpus-world-11957.firebaseapp.com",
  projectId: "wumpus-world-11957",
  storageBucket: "wumpus-world-11957.firebasestorage.app",
  messagingSenderId: "32490201883",
  appId: "1:32490201883:web:be1d5066279491c00ca9be",
  measurementId: "G-0F8LJNZRPQ"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);