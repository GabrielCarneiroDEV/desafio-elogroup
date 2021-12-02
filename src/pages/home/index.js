import { Link } from "react-router-dom";
import "./styles.css";

function Home() {

  return (
    <div className="container-home">
      <h1>Bem-Vindo</h1>
      <div className="container-btns">
        <Link to="/cadastrar" className="btn btn-open-signup">
          Cadastrar
        </Link>
        <Link to="/login" className="btn btn-open-login">
          Entrar
        </Link>
      </div>
    </div>
  );
}

export default Home;
