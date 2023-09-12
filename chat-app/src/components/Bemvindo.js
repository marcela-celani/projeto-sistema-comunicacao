import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'

const Bemvindo = () => {
  return (
    <Center h="80vh">
      <Box bg="white" p={8} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="gray.800" textAlign="center">
          Seja bem-vindo!
        </Text>
        <Text fontSize="md" color="gray.600" mt={2} textAlign="center">
          Inicie uma conversa selecionando um usuário na sua lista de amigos.
        </Text>
      </Box>
    </Center>
  );
}

export default Bemvindo
