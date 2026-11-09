import { Link } from "react-router-dom";
import './css/botao.css'
import './css/feedContratante.css'

function feedContratante() {

  return (
    <>
      <div className="botoes">
            <Link to="/feedContratante">
                <div className="botao"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
            </Link>

            <Link to="/perfilContratante">
                <div className="botao"><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
            </Link>
            
            <Link to="/perfilContratante">
                <div className="botao"><img src="src/assets/perfilFoto.png" alt="Img do Chat"/>Perfil</div>
            </Link>
        </div>
        <main className="conteudoC">
            <input type="search" placeholder="Pesquisar..." aria-label="Pesquisar"/>
            <div className="filtro-boxC">
              <span className="icone-filtroC" aria-hidden="true"></span>
              <select defaultValue="todos">
                <option value="">
                <select>
                  <option value="Todos" disabled>Todos</option>
                  <option value="Cuidador">Cuidador</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                </option>

                <option>
                <select>
                  <option value="Todos" disabled>Todos</option>
                  <option value="Cuidador">Cuidador</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                </option>
              </select>
            </div>
        </main>
    </>
  )
}

export default feedContratante
