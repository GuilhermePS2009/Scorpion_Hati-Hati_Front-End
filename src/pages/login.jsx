import { Link } from "react-router-dom";
import "./css/login.css";

function Login() {
  return (
    <>
        <div className="login-topo">
            <h1 className="login-titulo">Hati-Hati</h1>
            <spam className="login-lema">Cuidar é prioridade, pois da oportunidade</spam>
        </div>
        <div className="login-conteudo">
            <img className="login-cachorro" src="src/assets/Gold.png"/>
            <div className="login-card">
                <spam className="login-card-titulo">Login</spam>
                <input className="login-input" type="text" placeholder="E-mail"/>
                <input className="login-input" type="password" placeholder="Senha"/>

                <Link to="/perfilContratante">
                    <button className="login-botao">Entrar</button><br></br>
                </Link>
                <spam className="login-texto">Não possue conta?</spam>
                <Link to="/Cadastro" className="login-link">
                    <spam className="login-link">Cadastre-se</spam><br></br>
                </Link>
            </div>
            <img className="login-cachorro" src="src/assets/GoldRoupa.png"/>
        </div>
    </>
  )
}

export default Login