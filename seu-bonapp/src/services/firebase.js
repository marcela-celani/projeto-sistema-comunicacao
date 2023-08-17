import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBNjQYWfIbOQ4wnah09PiVaBaoFRBtxTnE",
  authDomain: "seu-bonapp.firebaseapp.com",
  projectId: "seu-bonapp",
  storageBucket: "seu-bonapp.appspot.com",
  messagingSenderId: "1097533228569",
  appId: "1:1097533228569:web:8720e75d360aa277b64c88",
  measurementId: "G-MTBTP3496K",
});

export const auth = getAuth(firebaseApp)