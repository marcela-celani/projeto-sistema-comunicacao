import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react'

const Carregando = () => {
    return (
        <Center h="80vh">
          <Box bg="white" w="300px" p={8} borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" color="gray.800" textAlign="center">
              Carregando...
            </Text>
            <Text fontSize="md" color="gray.600" mt={2} textAlign="center">
              Por favor aguarde.
            </Text>
          </Box>
        </Center>
      );
}

export default Carregando
