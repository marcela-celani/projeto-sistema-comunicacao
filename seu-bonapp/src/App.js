import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyBNjQYWfIbOQ4wnah09PiVaBaoFRBtxTnE",
  authDomain: "seu-bonapp.firebaseapp.com",
  projectId: "seu-bonapp",
});

// Inicializando Firebase


const App = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp)
  const useCollectionRef = collection(db, 'users')

  const createUser = async() => {
    const user = await addDoc(useCollectionRef, {
      name, email
    })
    console.log(user)
  }

  const deleteUser = async(id) => {
    const user = doc(db, 'users', id)
    await deleteDoc(user)
  }

  const getUsers = async () => {
    const data = await getDocs(useCollectionRef)
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  useEffect(()=> {
    getUsers()
  },[users])

  return (
    <>
    <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <button onClick={createUser}>Criar user</button>
    
        {users.map((user) => {
          return (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <button onClick={()=> deleteUser(user.id)}>Deletar user</button>
          </ul>
          )
        })}
    </>
  );
}

export default App;
