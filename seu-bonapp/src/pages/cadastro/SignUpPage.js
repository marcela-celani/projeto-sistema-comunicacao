"use client";

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
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const SignUpPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const displayName = `${firstName} ${lastName}`
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user.user, {
        displayName: displayName,
      });

      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,
        displayName,
        email,
      });

      console.log(user);
      setLoading(false);
      navigate("/");
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
            Cadastre-se!
          </Heading>
          <Text fontSize={isMobile ? "m" : "lg"} color={"gray.400"}>
            Utilize o sistema de comunicação interno da Seu Boné ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={("white", "gray.700")}
          boxShadow={"lg"}
          p={isMobile ? 6 : 8}
        >
          <Stack spacing={3} color={"gray.100"}>
            <form onSubmit={handleSubmit} color={"gray.100"}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel color={"gray.400"}>Nome</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel color={"gray.400"}>Sobrenome</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel mt={4} color={"gray.400"}>
                  E-mail{" "}
                </FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel mt={2} color={"gray.400"}>
                  Senha
                </FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      color={"gray.400"}
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={8} pt={2}>
                <Button
                  mt={isMobile ? 6 : 10}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"brand.yellow"}
                  color={"black"}
                  _hover={{
                    bg: "brand.blue",
                    color: "white",
                  }}
                >
                  Cadastrar
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              <Text align={"center"} color={"gray.400"}>
                Já possui conta?{" "}
                <ChakraLink color={"blue.400"}>
                  <Link to="/">Login</Link>
                </ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default SignUpPage;
