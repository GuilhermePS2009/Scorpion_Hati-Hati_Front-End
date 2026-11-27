import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";
import { useEffect, useState } from "react";
import api from "../services/api";

const formVazio = {
    nome: "",
    senha: ""
}

function Login() {
    const navegacao = useNavigate();

    const [form, setForm] = useState(formVazio)
    const [usuario, setUsuario] = useState()

    async function entrar(e)
    {
        e.preventDefault()

        const dadosLogin = {
            nomeUsuario: form.nome,
            senha: form.senha
        }

        try {
            const response = await api.post("http://localhost:8080/contratantes/entrar", dadosLogin)
            setUsuario(response.data.u)
            localStorage.setItem("usuario", usuario)

            console.log(usuario)
            console.log(usuario.tipo)
            
            if(usuario.tipo == true)
                navegacao("/perfilContratante")
            else
                navegacao("/perfilPrestador")
        } catch (err) {
            console.error("Erro ao entrar:", err);
            alert("Não foi possível entrar.");
        }
    }

    function mudar(e)
    {
        setForm({...form, [e.target.name]: e.target.value})
    }

  return (
    <>
        <div className="login-topo">
            <h1 className="login-titulo">Hati-Hati</h1>
            <spam className="login-lema">Cuidar é prioridade, pois da oportunidade</spam>
        </div>
        <div className="login-conteudo">
            <img className="login-cachorro" src="src/assets/Gold.png"/>
            <div className="login-card">
                <form onSubmit={entrar}>
                    <spam className="login-card-titulo">Login</spam>
                    <input className="login-input" name="nome" type="text" placeholder="E-mail" onChange={mudar}/>
                    <input className="login-input" name="senha" type="password" placeholder="Senha" onChange={mudar}/>

                    {/*<Link to="/perfilContratante">*/}
                        <button type="submit" className="login-botao">Entrar</button><br></br>
                    {/*</Link>*/}
                    <spam className="login-texto">Não possue conta?</spam>
                </form>
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