import { useState } from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import imgClose from "../../assets/fechar.svg"
import useUsers from "../../hooks/useUsers";

function ContainerSignup() {
    const { setUserLocalStorage, openModal, setOpenModal, message, setMessage } = useUsers();
  
    const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
   
  
    const history = useHistory();

    

    function handleSubmit(event) {
        event.preventDefault();
        console.log(user);
        if (user.password !== user.confirmPassword){
            setOpenModal(true)
            setMessage({message:"Verifique sua senha e a confirmação.", error:true})
             return;
            }
            setMessage({message:"Usuário cadastrado com sucesso!", error:false})
        setOpenModal(true);
  
        setUserLocalStorage(user)
        setUser({ username: "", password: "", confirmPassword: "" });


    }

    return (
        <div className="container-signup">

            {
                openModal &&
                <div className="modal-success-background" onClick={() => setOpenModal(false)}>
                    <div className={`modal-success-container ${message.error ? "failed" : ""}`}>

                        <img className="close-modal" src={imgClose} alt="Fechar" onClick={() => setOpenModal(false)} />
                        <span>{message.message}</span>
                        {
                        !message.error &&
                        <button className={`btn-login-modal ${message.error ? "failed" : ""}`} onClick={() => history.push("/login")}>Entrar</button>}
                    </div>

                </div>
            }


            <h1>Cadastrar</h1>
            <img className="close" src={imgClose} alt="Fechar" onClick={() => history.push('/')} />
            <form className="form-signup" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Usuário:</label>
                    <input required value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        type="text" placeholder="Digite seu nome." id="username" />

                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input required value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        type="password"
                        id="password"
                        minLength="8 char"
                        placeholder="Digite sua senha aqui."
                        pattern="(?=.*[a-z])(?=.*[0-9])(?=.*\W+)(?=^.{8,50}$).*$"
                        title="Sua senha deve possuir pelo menos 1 numero, 1 letra e 1 caractere especial"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar senha:</label>
                    <input required value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        type="password"
                        id="confirmPassword"
                        minLength="8 char"
                        placeholder="Confirme a senha digitada."
                    />
                </div>
                <button className="btn">Cadastrar!</button>
            </form>
        </div>
    );
}

export default ContainerSignup;