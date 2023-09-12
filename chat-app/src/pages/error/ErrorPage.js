import { Box, Button, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  
  const handleNavigateToLogin = () => {
    navigate('/');
  };
  
  return (
    <Center h="80vh">
      <Box bg="white" p={8} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="gray.800" textAlign="center">
          Oops, ocorreu um erro!
        </Text>
        <Text fontSize="md" color="gray.600" mt={2} textAlign="center">
          Parece que algo deu errado. Por favor, tente novamente mais tarde.
        </Text>
        <Center mt={4}>
        <Button onClick={handleNavigateToLogin}
                  mt={4}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"brand.blue"}
                  color={"white"}
                  _hover={{
                    bg: "brand.purple",
                    color: "black",
                  }}
                >
                  Voltar para login
                </Button>
        </Center>
      </Box>
    </Center>
  );
}

export default ErrorPage;
