import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
  
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            

      });
      

    }, [currentUser]);
    console.log(currentUser);

    
  
    return (
      <AuthContext.Provider value={ {currentUser} }>
        {children}
      </AuthContext.Provider>
    );
};