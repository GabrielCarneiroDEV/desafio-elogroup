import { useState } from "react";
import { useHistory } from "react-router-dom";
import imgClose from "../../assets/fechar.svg";
import iconPasswordInvisible from "../../assets/password-invisible.svg";
import iconPasswordVisible from "../../assets/password-visible.svg";
import toast from "../../helpers/toast";
import useUsers from "../../hooks/useUsers";
import "./styles.css";

function Login() {
  const { setUserLocalStorage, setToken } = useUsers();

  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const history = useHistory();

  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    
    try {
      const response = await fetch('https://api-leads-control.herokuapp.com/login', 
      {
        method: "POST",
        headers: {
          'Content-Type':'application/json',

        },
        body: JSON.stringify({name: userLogin.username, password:userLogin.password})
        
      })
      const data = await response.json()
      
      if(!response.ok){        
        throw new Error(data.mensagem)
      }
      setToken(data.token)
      setUserLocalStorage({name: data.name, id: data.id})
      toast.messageSuccess(`Bem-vindo ${data.name}!`)
      setUserLogin({ username: "", password: "", confirmPassword: "" });
      history.push("/dashboard");

    } catch (error) {
     return toast.messageError(error.message);
      
    }

    // const findUser = userLocalStorage.find(
    //   (user) => user.username === userLogin.username
    // );

    // if (findUser && findUser.password === userLogin.password) {
    //   setToken(findUser.id);
    //   setUserLogin({ username: "", password: "" });
    //   history.push("/dashboard");
    // } else {
    //   toast.messageError("Usuário ou senha incorretos!");
    //   setToken();
    // }
  }

  return (
    <div className="container-login">
      <h1>Entrar</h1>
      <img
        className="close"
        src={imgClose}
        alt="Fechar"
        onClick={() => {
          history.push("/");
        }}
      />
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nome:</label>
          <input
            className="input-text"
            value={userLogin.username}
            onChange={(e) => {
              setUserLogin({ ...userLogin, username: e.target.value });
            }}
            type="text"
            placeholder="Digite seu nome."
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            className="input-text"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
            type={passwordVisible ? "text" : "password"}
            id="password"
            minLength="8 char"
            placeholder="Digite sua senha aqui."
          />
          <img
            className="changePasswordType"
            src={passwordVisible ? iconPasswordVisible : iconPasswordInvisible}
            alt=""
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        <button className="btn">Confirmar!</button>
      </form>
    </div>
  );
}

export default Login;
