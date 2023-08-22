import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, Input, InputGroup, InputLeftElement, InputRightElement, ListItem, UnorderedList } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FriendsList = () => {
  const { currentUser, handleSelect } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);

  
useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const items = querySnapshot.docs.map((doc) => doc.data());
  
      // Filtrar os usuários para remover o usuário atual
      const filteredUsers = items.filter((user) => user.uid !== currentUser.uid);
  
      setUser(filteredUsers);
    };
  
    fetchData();
  }, [currentUser]);


  return (
    <div
  style={{
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
  }}
>
  <InputGroup marginBottom="15px">
    <InputRightElement pointerEvents="none">
      <SearchIcon color="brand.yellow" />
    </InputRightElement>
    <Input
      type="text"
      placeholder="Pesquisar"
      onChange={(e) => setUsername(e.target.value)}
    />
  </InputGroup>
  <UnorderedList listStyleType="none" padding="0" margin="0">
    {user.filter(
          (item) =>
            item.displayName &&
            item.displayName
              .toLowerCase()
              .includes(username.toLowerCase())
        ).map((item, index) => (
      <ListItem
        key={index}
        marginBottom="10px"
        display="flex"
        alignItems="center"
        padding= '10px'
        _hover={{ backgroundColor: 'gray.700', borderRadius: '8px',
        padding: '10px' }}
      >
        <Avatar
          size="sm"
          name={item.displayName}
          src={item.avatarUrl} // Substitua por propriedade de URL da imagem
          marginRight="10px"
        />
        <Link
          href="#"
          color="#fff"
          _hover={{ color: '#66ccff' }}
          onClick={() => handleSelect(item)}
        >
          {item.displayName}
        </Link>
      </ListItem>
    ))}
  </UnorderedList>
</div>
  );
};

export default FriendsList;
