import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Button, Flex, Input } from '@chakra-ui/react';

const TextField = () => {
  const { currentUser, handleSelect, combinedId, message, setMessage } = useContext(AuthContext);
  

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      return; // Não envie mensagens em branco
    }

    try {
      const chatDocRef = doc(db, "chats", combinedId);

      // Busca o documento atual para obter o array de mensagens existente
      const chatDocSnap = await getDoc(chatDocRef);
      const existingMessages = chatDocSnap.data().messages || [];

      // Adiciona a nova mensagem ao array existente
      const newMessages = [...existingMessages, message];

      // Atualiza o documento com o novo array de mensagens
      await updateDoc(chatDocRef, {
        messages: newMessages,
      });

      // Limpa o campo de mensagem após o envio
      setMessage("");
    } catch (error) {
      console.error("Erro ao adicionar mensagem:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center">
          <Input
            type="text"
            placeholder="Digite a mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            bg="white"
            py={2}
            px={4}
            mr={2}
            flex="1"
            _focus={{
              boxShadow: "none",
              borderColor: "brand.blue",
            }}
          />
          <Button
            type="submit"
            colorScheme="brand"
            bg= "brand.blue"
            px={6}
            py={3}
            _hover={{
              bgColor: "brand.yellow",
              color: "black"
            }}
          >
            Enviar
          </Button>
        </Flex>
      </form>
    </div>
  )
}

export default TextField
