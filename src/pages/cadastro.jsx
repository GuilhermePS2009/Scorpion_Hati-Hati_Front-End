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

  function mudarCheckbox(e) {
    setForm({ ...form, [e.target.name]: e.target.checked})
  }

  /*function mudarSelect(e) {
    let estado = siglaParaEstado[e.target.value]
    // console.log(estado)
    setForm({ ...form, [e.target.name]: estado})
  }*/

  async function enviar(e){
    e.preventDefault()

    const novoUsuario = {
      nome: form.nome,
      cidade: form.cidade,
      estado: form.estado,
      cep: form.cep,
      tipo: form.tipo
    }

    try {
      if (form.tipo == true) // contratante
        await api.post("http://localhost:8080/contratantes/cadastrar", novoUsuario)
      else // prestador
        await api.post("http://localhost:8080/prestadores/cadastrar", novoUsuario)
    } catch (error) {
      console.error("Erro ao criar vaga:", err);
      alert("Não foi possível criar a vaga.");
    }
  }

  return (
    <>
      <div className="cadastroFolha">
        <p className="um">Cadastro</p>

        <form onSubmit={enviar}>
        <label>Nome de usuário: </label> <input type="text" name="nome" onChange={mudar}/><br/>
        <label>Cidade: </label><input type="text" name="cidade" onChange={mudar}/> <br/>
        <label>Estado: </label>
        <select name="estado" onChange={mudar}>
          <option selected disabled>Selecione</option>
          <option>SP</option>
          <option>RJ</option>
          <option>GO</option>
        </select><br/>
        <label >CEP: </label><input type="text" name="cep" onChange={mudar}/> <br/>
        <input type="checkbox" name="tipo" value="Usuario" onChange={mudarCheckbox}/><label>Contratante</label><br/>
        <input type="checkbox" value="Usuario"/><label>Prestador</label><br/>
        <button type="submit">Criar</button>
        </form>
      </div>
    </>
  )
}

export default cadastro