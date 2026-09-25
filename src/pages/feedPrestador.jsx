import { Link } from "react-router-dom";
import './css/feedPrestador.css'

function feedPrestador() {

  return (
    <>
      <div className="botoes">
            <Link to="/feedPrestador">
                <div className="botao"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
            </Link>

            <Link to="/perfilPrestador">
                <div className="botao"><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
            </Link>
            
            <Link to="/perfilPrestador">
                <div className="botao"><img src="src/assets/perfilFoto.png" alt="Img do Chat"/>Perfil</div>
            </Link>
        </div>
        <main className="conteudoP">
            <input type="search" placeholder="Pesquisar..." aria-label="Pesquisar"/>
            <div className="filtro-box">
              <span className="icone-filtro" aria-hidden="true"></span>
              <select defaultValue="">
                <option value="" disabled>Filtro</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

        </main>
    </>
  )
}

export default feedPrestador
