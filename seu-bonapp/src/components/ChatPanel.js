import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import FriendsList from "./FriendsList";
import Messages from "./Messages";
import TextField from "./TextField";
import Bemvindo from "./Bemvindo";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  logout: () => void;
  displayName: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={"gray.900"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <img src={logo} style={{ height: "30px" }} alt="" />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} color="grey" />
      </Flex>
   
      <NavItem icon={LinkItems[0].icon}>Home</NavItem>      
  
      <Text color="white">
        <FriendsList />
      </Text>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        color="white"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.blue",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, logout, displayName, specificUser, ...rest }: MobileProps) => {
  return (
    <Flex  display="flex"  ml={{ base: 0, md: 60 }}>
      <Flex display="flex" justify="flex-end"
        width='100%'
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "space-between" }}
        {...rest}
      >
        {specificUser ? <Flex display="flex" alignItems="center">
          <Avatar
              size="sm"
              name={specificUser.displayName}
              marginRight="8px"
            />
            <Text fontSize="sm">{specificUser.displayName}</Text>
        </Flex> : <h1></h1>}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
        <Flex alignItems="center">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
      
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
      
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
  bg={useColorModeValue("white", "gray.900")}
  borderColor={useColorModeValue("gray.200", "gray.700")}
  textAlign="center" // Centralizar horizontalmente
>
  <VStack alignItems="center" spacing={1}>
    <Avatar mt="10px" size="md" name={displayName} />
    <Text  fontSize="sm">{displayName}</Text>
    <Text  fontSize="xs" color="gray.600">
      Membro
    </Text>
  </VStack>
  <MenuItem mt="10px">Editar perfil</MenuItem>
  <MenuItem>Configurações</MenuItem>
  <MenuDivider />
  <MenuItem color="red.600" onClick={logout}>
    Sair
  </MenuItem>
</MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { currentUser, combinedId, specificUser } = useContext(AuthContext);
  const { displayName } = currentUser;

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} logout={logout} displayName={displayName} specificUser={specificUser}/>
      <Box ml={{ base: 0, md: 60 }}  p="4">
        {/* Content */}

        {!combinedId ? <Bemvindo />
        :
        <Flex justify="space-between" flexDirection="column" h='88vh'>
          <div>
            <Messages />
          </div>
          <div>
            <TextField />
          </div>
        </Flex>
        }
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
