import { useState } from "react";
import { useHistory } from "react-router-dom";
import imgClose from "../../assets/fechar.svg";
import iconPasswordInvisible from "../../assets/password-invisible.svg";
import iconPasswordVisible from "../../assets/password-visible.svg";
import useUsers from "../../hooks/useUsers";
import toast from "../../helpers/toast"
import "./styles.css";

function SignUp() {
  const {
    userLocalStorage,
    setUserLocalStorage,
    message,
    setMessage,
  } = useUsers();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    id: new Date().getTime(),
  });

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.messageError("Verifique sua senha e a confirmação.")

      return;
    }
    const userVerify = userLocalStorage.find(
      (x) => x.username === user.username
    );
    if (userVerify) {
      toast.messageError("Nome indisponível")
      return;
    }
    toast.messageSuccess("Usuário cadastrado com sucesso!");
    history.push("/login");

  

    setUserLocalStorage([...userLocalStorage, user]);
    setUser({ username: "", password: "", confirmPassword: "" });
  }

  return (
    <div className="container-signup">

      <h1>Cadastrar</h1>
      <img
        className="close"
        src={imgClose}
        alt="Fechar"
        onClick={() => {
          setMessage({
            message: "Usuário cadastrado com sucesso!",
            error: false,
          });
          history.push("/");
        }}
      />
      {message.error && <span className="failed">{message.message}</span>}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            className="input-text"
            required
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
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
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type={passwordVisible ? "text" : "password"}
            id="password"
            minLength="8 char"
            placeholder="Digite sua senha aqui."
            pattern="(?=.*[a-z])(?=.*[0-9])(?=.*\W+)(?=^.{8,50}$).*$"
            title="Sua senha deve possuir pelo menos 1 numero, 1 letra e 1 caractere especial"
          />
          <img
            className="changePasswordType"
            src={passwordVisible ? iconPasswordVisible : iconPasswordInvisible}
            alt=""
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar senha:</label>
          <input
            className="input-text"
            required
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            type={confirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            minLength="8 char"
            placeholder="Confirme a senha digitada."
          />
          <img
            className="changePasswordType"
            src={confirmPasswordVisible ? iconPasswordVisible : iconPasswordInvisible}
            alt=""
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        </div>
        <button className="btn btn-signup">Cadastrar!</button>
      </form>
    </div>
  );
}

export default SignUp;
