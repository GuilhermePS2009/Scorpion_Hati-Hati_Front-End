import { Link } from "react-router-dom";
import './css/cadastro.css'

function cadastro() {

  return (
    <>
      <div className="cadastroFolha">
        <p className="um">Cadastro</p>

        <label>Nome de usuário: </label> <input type="text" /><br/>
        <label>Cidade: </label><input type="text"/> <br/>
        <label>Estado: </label>
        <select>
        <option disabled>Selecione</option>
        <option>SP</option>
        </select><br/>
        <label >CEP: </label><input type="text" /> <br/>
        <input type="checkbox" value="Usuario"/><label>Contratante</label><br/>
        <input type="checkbox" value="Usuario"/><label>Prestador</label>
      </div>
    </>
  )
}

export default cadastro