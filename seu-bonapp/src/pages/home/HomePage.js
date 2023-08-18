import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const HomePage = () => {
  
  const logout = () => {
    signOut(auth);
    console.log(auth)
  };

  return (
    <div>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default HomePage;
