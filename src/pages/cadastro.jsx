import { Link } from "react-router-dom";

function cadastro() {

  return (
    <>
      <h1>Cadastro</h1>

      <Link to="/perfilContratante">
        <button>Perfil Contratante</button>
      </Link>

      <Link to="/perfilPrestador">
        <button>Perfil Prestador</button>
      </Link>
    </>
  )
}

export default cadastro