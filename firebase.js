import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN292h7tunT8DMz4GmzOUN_qBLCd6AjSE",
  authDomain: "wetuli-c1747.firebaseapp.com",
  projectId: "wetuli-c1747",
  storageBucket: "wetuli-c1747.appspot.com",
  messagingSenderId: "564921133037",
  appId: "1:564921133037:web:63f2694cf19395ef09e9e4",
  measurementId: "G-YXRKGVFD9C",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
