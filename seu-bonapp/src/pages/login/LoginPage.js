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
  Link as ChakraLink
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo from '../../assets/logo.png'

const LoginPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

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
          <img src={logo} alt='logo'/>
          <Heading fontSize={'4xl'} mt={10} color={'white'}>Faça o Login</Heading>
          <Text fontSize={'lg'} color={'gray.400'}>
            para utilizar o sistema de comunicação interno da Seu Boné ✌️
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
                <FormLabel color={'gray.400'}>Email address</FormLabel>
                <Input type="email"     
                name="email" />
              </FormControl>
              <FormControl mt={2} color={'gray.400'} id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password"
                name="senha" />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox mt={2} color={'gray.400'}>Lembre-se de mim</Checkbox>
                  <Text mt={2} color={'blue.400'}>Esqueceu sua senha?</Text>
                  
                </Stack>
                <Button
                  type="submit"
                  bg={'brand.yellow'}
                  color={'black'}
                  _hover={{
                    bg: 'brand.blue',
                    color: 'white'
                  }}>
                  Login
                </Button>
                  <Link to="/" ><ChakraLink color={'blue.400'}>Crie sua conta</ChakraLink></Link>
              </Stack>
            </form> 
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
