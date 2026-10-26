import { Link } from "react-router-dom";

function Login() {
  return (
    <>
        <div>
            <h1>Hati-Hati</h1>
            <spam>Cuidar é prioridade, pois da oportunidade</spam>
        </div>
        <div>
            <img src="src/assets/feedFoto.png"/>
            <div>
                <spam>Login</spam>
                <input type="text"/>
                <input type="password"/>

                <Link to="/perfilContratante">
                    <button >Entrar</button><br></br>
                </Link>
                <spam>Não possue conta?</spam>
                <Link to="/Cadastro">
                    <spam >Cadaste-se</spam><br></br>
                </Link>
            </div>
            <img src="src/assets/feedFoto.png"/>
        </div>
    </>
  )
}

export default Login