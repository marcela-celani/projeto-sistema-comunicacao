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
    <div>
      <div className="search">
        <form className="searchForm">
          <input
            type="text"
            placeholder="Find a user"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>
            <ul>
              {user
                .filter(
                  (item) =>
                    item.displayName &&
                    item.displayName
                      .toLowerCase()
                      .includes(username.toLowerCase())
                )
                .map((item, index) => (
                  <li key={index}>
                    <Link href="#" onClick={() => handleSelect(item)}>
                      {item.displayName}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FriendsList;
