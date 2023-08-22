'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {  useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext';

const SignUpPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    // const firstName = e.target.firstName.value;
    // const lastName = e.target.lastName.value;  
    const displayName  = e.target.displayName.value;
    const email = e.target.email.value; 
    const password = e.target.password.value;

    try {

      const user = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user.user, {
        displayName: displayName
      });
      

      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,
        displayName,
        email
      });

      console.log(user);
      setLoading(false);
      navigate('/login')

    } catch (error) {

      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)

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
      <Stack spacing={10} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <img src={logo} alt='logo'/>
          <Heading fontSize={'4xl'} textAlign={'center'} color={'white'} mt={10}>
            Cadastre-se!
          </Heading>
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
              <HStack>
                <Box>
                    <FormControl id="displayName" isRequired>
                      <FormLabel color={'gray.400'}>Nome</FormLabel>
                      <Input type="text" />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="lastName">
                      <FormLabel color={'gray.400'}>Sobrenome</FormLabel>
                      <Input type="text" />
                    </FormControl>
                </Box>
              </HStack>
                    <FormControl id="email" isRequired>
                      <FormLabel mt={2} color={'gray.400'}>E-mail </FormLabel>
                        <Input type="email" />
                      </FormControl>
                      <FormControl id="password" isRequired>
                        <FormLabel mt={2} color={'gray.400'}>Senha</FormLabel>
                    <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                    </InputGroup>
                      </FormControl>
              <Stack spacing={8} pt={2}>
                    <Button mt={2}
                    type='submit'
                    loadingText="Submitting"
                    size="lg"
                    bg={'brand.yellow'}
                    color={'black'}
                    _hover={{
                      bg: 'brand.blue',
                      color: 'white'
                    }}>
                    Cadastrar
                    </Button>
              </Stack>
            </form>
                
            <Stack pt={6}>
              <Text align={'center'} color={'gray.400'}>
                Já possui conta? <Link to="/login" ><ChakraLink color={'blue.400'}>Login</ChakraLink></Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
};
export default SignUpPage;