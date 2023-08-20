import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ChatPanel from '../../components/ChatPanel'

const HomePage = () => {

  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const logout = () => {
    signOut(auth);
    navigate('/')
  };

 



  return (
    <div>
      <Header />
      <button onClick={logout}>Sair</button>
      <Sidebar/>
      <ChatPanel/>
    </div>
  );
};

export default HomePage;
