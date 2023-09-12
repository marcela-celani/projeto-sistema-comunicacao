import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   setCurrentUser(user);
      // }
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [combinedId, setCombinedId] = useState("");
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState("");
  const [specificUser, setSpecificUser] = useState("");

  const handleSelect = async (user) => {
    //checa se o chat existe, senão cria um novo combinando os ids
    setSpecificUser(user);

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    setCombinedId(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //cria um chat na coleção chats no firebase
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //update nas informações do chat
        await updateDoc(doc(db, "chats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "chats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  console.log(currentUser)
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleSelect,
        combinedId,
        chatData,
        setChatData,
        message,
        setMessage,
        specificUser,
        setCombinedId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
