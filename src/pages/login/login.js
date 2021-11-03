import { useState } from "react";
import { useHistory } from "react-router-dom";
import imgClose from "../../assets/fechar.svg";
import iconPasswordInvisible from "../../assets/password-invisible.svg";
import iconPasswordVisible from "../../assets/password-visible.svg";
import useUsers from "../../hooks/useUsers";
import "./styles.css";

function Login() {
  const { userLocalStorage, setToken, openModal, setOpenModal } = useUsers();

  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const history = useHistory();

  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleLogin(event) {
    event.preventDefault();

    const findUser = userLocalStorage.find(
      (user) => user.username === userLogin.username
    );

    if (findUser && findUser.password === userLogin.password) {
      setToken(findUser.id);
      setUserLogin({ username: "", password: "" });
      history.push("/dashboard");
    } else {
      setOpenModal(true);
      setToken();
    }
  }

  return (
    <div className="container-login">
      <h1>Entrar</h1>
      {openModal && (
        <span className="failed">Usuário ou senha incorretos!</span>
      )}
      <img
        className="close"
        src={imgClose}
        alt="Fechar"
        onClick={() => {
          setOpenModal(false);
          history.push("/");
        }}
      />
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            className="input-text"
            required
            value={userLogin.username}
            onChange={(e) => {
              setUserLogin({ ...userLogin, username: e.target.value });
              setOpenModal(false);
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
            required
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
              setOpenModal(false);
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
