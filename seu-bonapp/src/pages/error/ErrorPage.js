import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

const ErrorPage = () => {
  return (
    <Center h="80vh">
      <Box bg="white" p={8} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="gray.800" textAlign="center">
          Oops, ocorreu um erro!
        </Text>
        <Text fontSize="md" color="gray.600" mt={2} textAlign="center">
          Parece que algo deu errado. Por favor, tente novamente mais tarde.
        </Text>
      </Box>
    </Center>
  );
}

export default ErrorPage;

