'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/homepage')
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email"     
                name="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password"
                name="senha" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={'brand.blue'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.yellow',
                    color: 'black'
                  }}>
                  Login
                </Button>
                </Stack>
            </form> 
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
