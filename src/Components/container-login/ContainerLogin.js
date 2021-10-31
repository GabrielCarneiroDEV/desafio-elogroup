import { useState } from "react";
import { useHistory } from "react-router-dom";
import imgClose from "../../assets/fechar.svg";
import useUsers from "../../hooks/useUsers";
import "./styles.css";

function ContainerLogin() {
    const { userLocalStorage, setToken, openModal, setOpenModal } = useUsers();
    console.log(userLocalStorage.password);

    const [userLogin, setUserLogin] = useState({ username: "", password: "" });
    const history = useHistory();

    function handleLogin(event) {

        event.preventDefault();
        console.log(userLogin);
       

        if (userLocalStorage.username === userLogin.username && userLocalStorage.password === userLogin.password) {
            setToken("AUTORIZADO");
            setUserLogin({ username: "", password: "" });
            history.push("/dashboard")
        } else {
            setOpenModal(true);
            setToken();
        }

    }

    return (
        <div className="container-login">
             {
                openModal &&
                <div className="modal-success-background" onClick={() => setOpenModal(false)}>
                    <div className="modal-success-container failed">

                        <img className="close-modal" src={imgClose} alt="Fechar" onClick={() => setOpenModal(false)} />
                        <span>Usuário ou senha incorreto!</span>

                    </div>

                </div>
            }
            <h1>Entrar</h1>
            <img className="close" src={imgClose} alt="Fechar" onClick={() => history.push("/")} />
            <form className="form-login" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Usuário:</label>
                    <input required value={userLogin.username}
                        onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })}
                        type="text" placeholder="Digite seu nome." id="username" />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input required value={userLogin.password}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                        type="password"
                        id="password"
                        minLength="8 char"
                        placeholder="Digite sua senha aqui."
                    />
                </div>
                <button className="btn">Confirmar!</button>
            </form>
        </div>
    );
}

export default ContainerLogin;