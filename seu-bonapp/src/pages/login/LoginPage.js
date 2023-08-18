import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/homepage')
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  
  return (
    <div>
      <h1>Login</h1>
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
        <button>Login</button>
      </form>
      
      <div>
        <p>Não possui uma conta?</p>
        <Link to="/cadastro">Cria sua conta aqui!</Link>
      </div>
    </div>
  );
};

export default LoginPage;
