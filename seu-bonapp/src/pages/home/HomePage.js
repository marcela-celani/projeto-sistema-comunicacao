import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const logout = () => {
    signOut(auth);
    navigate('/')
  };

 



  return (
    <div>
      {currentUser ? <h2>Benvindo {currentUser.email}</h2> : null}
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default HomePage;
