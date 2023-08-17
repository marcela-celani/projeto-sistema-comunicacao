import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBNjQYWfIbOQ4wnah09PiVaBaoFRBtxTnE",
    authDomain: "seu-bonapp.firebaseapp.com",
    projectId: "seu-bonapp",
    storageBucket: "seu-bonapp.appspot.com",
    messagingSenderId: "1097533228569",
    appId: "1:1097533228569:web:8720e75d360aa277b64c88",
    measurementId: "G-MTBTP3496K",
  });

  const db = getFirestore(firebaseApp);
  const useCollectionRef = collection(db, "users");

  const createUser = async () => {
    const user = await addDoc(useCollectionRef, {
      name,
      email,
    });
    console.log(user);
  };

  const deleteUser = async (id) => {
    const user = doc(db, "users", id);
    await deleteDoc(user);
  };

  const getUsers = async () => {
    const data = await getDocs(useCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={createUser}>Criar user</button>

      {users.map((user) => {
        return (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <button onClick={() => deleteUser(user.id)}>Deletar user</button>
          </ul>
        );
      })}
    </div>
  );
};

export default HomePage;
