import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Button, Flex, Input, useMediaQuery } from '@chakra-ui/react';

const TextField = () => {
  const { currentUser, combinedId, message, setMessage } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(max-width: 767px)");
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

      // Cria um objeto para a nova mensagem com remetente e conteúdo
      const newMessage = {
        content: message,
        sender: currentUser.uid, // Adiciona o ID do remetente
      };

      // Adiciona a nova mensagem ao array existente
      const newMessages = [...existingMessages, newMessage];

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
    <Flex>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center" w={isMobile ? "100vw" : "calc(100vw - 260px)"} pr={2} pl={2} h={isMobile ? "14vh" : "calc(10vh - 75px)"}>
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
    </Flex>
  )
}

export default TextField
