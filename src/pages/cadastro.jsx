import { Link } from "react-router-dom";
import './css/cadastro.css'

function cadastro() {

  return (
    <>
      <div className="cadastroFolha">
        <p className="um">Cadastro</p>
        <p className="dois">Entrar como:</p><br></br>

        <Link to="/perfilContratante">
          <button className="botaoCadastro">Perfil Contratante</button><br></br>
        </Link>

        <Link to="/perfilPrestador">
          <button className="botaoCadastro">Perfil Prestador</button>
        </Link>
      </div>
    </>
  )
}

export default cadastro