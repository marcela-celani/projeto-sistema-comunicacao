import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import Bemvindo from "./Bemvindo";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const Messages = () => {
  const {
    currentUser,
    handleSelect,
    combinedId,
    chatData,
    setChatData,
    message,
    setMessage,
  } = useContext(AuthContext);

  // Mostra chat de mensagens na tela
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
    <Box>
  {chatData && chatData.messages ? (
    chatData.messages.map((message, index) => (
      <Flex
        key={index}
        p={2}
        mb={2}
        borderRadius="md"
        backgroundColor={
          message.sender === currentUser.uid
            ? "brand.lightblue"
            : "gray.300"
        }
        color="black"
        width="fit-content"
        maxWidth="300px"
        marginLeft={
          message.sender === currentUser.uid ? "auto" : "0"
        }
        marginRight={
          message.sender !== currentUser.uid ? "auto" : "0"
        }
      >
        <Text>{message.content}</Text>
      </Flex>
    ))
  ) : (
    <Bemvindo />
  )}
</Box>
  );
};

export default Messages;
