import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <h2>Insira seu nome e email</h2>
      <form>
        <div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu email"
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
      </form>
      <button onClick={handleSignIn}>Cadastrar</button>
      <div>
        <p>Já possui uma conta?</p>
        <Link to="/">Faça o login!</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
