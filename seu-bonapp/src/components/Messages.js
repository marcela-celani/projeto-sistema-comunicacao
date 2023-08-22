import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import Bemvindo from "./Bemvindo";

const Messages = () => {
  const { currentUser, handleSelect, combinedId, chatData, setChatData, message, setMessage } = useContext(AuthContext);
  

  const fetchGroupData = async () => {
    if (combinedId) {
      const docRef = doc(db, "chats", `${combinedId}`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setChatData(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [combinedId, message]);

  return (
    <div>
      {chatData && chatData.messages
          ? chatData.messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))
          : <Bemvindo />}
    </div>
  );
};

export default Messages;
