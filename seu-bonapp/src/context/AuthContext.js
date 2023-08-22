import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        }
      });
    
      return () => {
        unsubscribe();
      };
    }, []);

    const [combinedId, setCombinedId] = useState('')
    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState("");

    const handleSelect = async (user) => {
      //check whether the group(chats in firestore) exists, if not create
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      
          setCombinedId(combinedId)
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          await updateDoc(doc(db, "chats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              // photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "chats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              // photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    
  
    return (
      <AuthContext.Provider value={ {currentUser, setCurrentUser, handleSelect, combinedId, chatData, setChatData, message, setMessage} }>
        {children}
      </AuthContext.Provider>
    );
};