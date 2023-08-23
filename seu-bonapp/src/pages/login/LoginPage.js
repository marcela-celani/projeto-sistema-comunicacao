"use client";

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
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import ErrorPage from "../error/ErrorPage";
import Carregando from "../../components/Carregando";

const LoginPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setCombinedId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    //Função para manter email e senha no local storage
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    //Requisição de login no firebase
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/homepage");
      setCombinedId(null);  
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if(error){
        alert('Email ou senha inválidos!')
      }
    }
  };

  //Set botão lembrar email e senha
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  //Renderizar nos inputs email e senha salvos no local storage
  useEffect(() => {
    const email = localStorage.getItem("savedEmail");
    const password = localStorage.getItem("savedPassword");

    if (email && password) {
      setSavedEmail(email);
      setSavedPassword(password);
    }
  }, []);

  if (loading) {
    return <Carregando />;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={("gray.50", "gray.800")}
    >
      <Stack
        spacing={isMobile ? 4 : 10}
        mx={4}
        py={isMobile ? 4 : 12}
        px={4}
        w="100%"
        maxW={"lg"}
      >
        <Stack align={"center"}>
          <img
            src={logo}
            alt="logo"
            style={{ maxWidth: isMobile ? "200px" : null }}
          />
          <Heading
            fontSize={isMobile ? "2xl" : "4xl"}
            textAlign={"center"}
            color={"white"}
            mt={isMobile ? 4 : 10}
          >
            Faça o Login!
          </Heading>
          <Text fontSize={isMobile ? "m" : "lg"} color={"gray.400"}>
            Utilize o sistema de comunicação interno da Seu Boné ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={("white", "gray.700")} boxShadow={"lg"} p={isMobile ? 6 : 8}>
          <Stack color={"gray.100"} spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel color={"gray.400"}>Email</FormLabel>
                <Input defaultValue={savedEmail} type="email" name="email" />
              </FormControl>
              <FormControl mt={2} color={"gray.400"} id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  defaultValue={savedPassword}
                  type="password"
                  name="senha"
                />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox
                    mt={2}
                    color={"gray.400"}
                    isChecked={rememberMe}
                    onChange={handleRememberMeChange}
                  >
                    Lembre-se de mim
                  </Checkbox>
                  <ChakraLink mt={2} color={"blue.400"}>
                    Esqueceu sua senha?
                  </ChakraLink>
                </Stack>
                <Button
                  type="submit"
                  bg={"brand.yellow"}
                  color={"black"}
                  _hover={{
                    bg: "brand.blue",
                    color: "white",
                  }}
                >
                  Login
                </Button>
                <ChakraLink color={"blue.400"}>
                  <Link to="/signup">Crie sua conta</Link>
                </ChakraLink>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
