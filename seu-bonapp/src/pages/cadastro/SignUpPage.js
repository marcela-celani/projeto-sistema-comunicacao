import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {

      const user = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,

        email,
      });

      console.log(user);
      setLoading(false);
      navigate('/')

    } catch (error) {

      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)

    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <h2>Insira seu nome e email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu email"
          />
        </div>
        <div>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
          />
        </div>
        <button>Cadastrar</button>
      </form>
      <div>
        <p>Já possui uma conta?</p>
        <Link to="/">Faça o login!</Link>
      </div>
    </div>
  );
};
export default SignUpPage;
