import { Link } from "react-router-dom"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../../services/firebase";
import { useState } from "react";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  if (loading) {
    return console.log(user)
  }

  return (
    <div>
      <h1>Login</h1>
      <h2>Insira seu nome e email</h2>
      <form>
        <div>
          <input 
          type="text" 
          name="email"
          id="email"
          placeholder="Digite seu email"
          onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <input 
          type="password" 
          name="senha"
          id="senha"
          placeholder="Digite sua senha"
          onChange={(e)=> setPassword(e.target.value)}/>
        </div>
      </form>
      <button onClick={handleSignIn}>Login</button>
      <div>
        <p>Não possui uma conta?</p>
        <Link to='/cadastro'>Cria sua conta aqui!</Link>
      </div>
    </div>
  )
}

export default LoginPage