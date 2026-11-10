import { Link } from "react-router-dom";
import './css/cadastro.css'
import { useState, useEffect } from "react";
import api from "../services/api";



const formVazio = {
  nome: "",
  cidade: "",
  estado: "",
  cep: "",
  tipoUsuario: true
}

function cadastro() {
  const [form, setForm] = useState(formVazio)

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviar(e){
    e.preventDefault()

    const novoUsuario = {
      nome: form.nome,
      cidade: form.cidade,
      estado: form.estado,
      cep: form.cep
    }

    try {
      if (contratante)
      await api.post("http://localhost:8080/contratantes/cadastrar")
      else // prestador
      await api.post("http://localhost:8080/prestadores/cadastrar")
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="cadastroFolha">
        <p className="um">Cadastro</p>

        <form>
        <label>Nome de usuário: </label> <input type="text" onChange={mudar}/><br/>
        <label>Cidade: </label><input type="text" onChange={mudar}/> <br/>
        <label>Estado: </label>
        <selec onChange={mudar}t>
        <option disabled>Selecione</option>
        <option>SP</option>
        </selec><br/>
        <label >CEP: </label><input type="text" onChange={mudar}/> <br/>
        <input type="checkbox" value="Usuario"/><label>Contratante</label><br/>
        <input type="checkbox" value="Usuario"/><label>Prestador</label><br/>
        <button type="submit">Criar</button>
        </form>
      </div>
    </>
  )
}

export default cadastro