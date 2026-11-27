import { Link, useNavigate } from "react-router-dom";
import './css/cadastro.css'
import { useState, useEffect } from "react";
import api from "../services/api";



const formVazio = {
  nome: "",
  senha: "",
  cidade: "",
  estado: "",
  cep: "",
  tipoUsuario: false
}

function cadastro() {
  const [form, setForm] = useState(formVazio)

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function mudarCheckbox(e) {
    setForm({ ...form, [e.target.name]: e.target.value == "Contratante"})
    console.log(e.target.value)
  }

  const navegacao = useNavigate()

  /*function mudarSelect(e) {
    let estado = siglaParaEstado[e.target.value]
    // console.log(estado)
    setForm({ ...form, [e.target.name]: estado})
  }*/

  async function enviar(e){
    e.preventDefault()

    const novoUsuario = {
      nome: form.nome,
      senha: form.senha,
      cidade: form.cidade,
      estado: form.estado,
      cep: form.cep,
      tipo: form.tipo
    }

    try {
      if (form.tipo == true) // contratante
      {
        await api.post("http://localhost:8080/contratantes/cadastrar", novoUsuario)
        navegacao("/perfilContratante")
      }
      else // prestador
      {
        await api.post("http://localhost:8080/prestadores/cadastrar", novoUsuario)
        navegacao("/perfilPrestador")
      }
    } catch (err) {
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
        <label>Senha: </label> <input type="password" name="senha" onChange={mudar}/><br/>
        <label>Cidade: </label><input type="text" name="cidade" onChange={mudar}/> <br/>
        <label>Estado: </label>
        <select name="estado" onChange={mudar}>
          <option selected disabled>Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
        </select><br/>
        <label >CEP: </label><input type="text" name="cep" onChange={mudar}/> <br/>
        <input type="radio" name="tipo" value="Contratante" onChange={mudarCheckbox}/>
        <label>Contratante</label>
        <br/>

        <input type="radio" name="tipo" value="Prestador" onChange={mudarCheckbox}/>
        <label>Prestador</label>
        <br/>

        <button type="submit">Criar</button>
        <Link to="/Login" className="cadastro-link">
          <spam>Fazer login</spam><br></br>
        </Link>
        </form>
      </div>
    </>
  )
}

export default cadastro