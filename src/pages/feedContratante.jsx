import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import './css/botao.css'
import './css/feedContratante.css'
import api from "../services/api";

function feedContratante() {
  const [prestadores, setPrestadores] = useState([]);

  useEffect(() => {
    buscarPrestadores()
  }, [])

  function buscarPrestadores(){
    let prest = api
      .get("/prestadores/getAll")
      .then((response) => setPrestadores(response.data))
      .catch((err) => console.error("Ops! Ocorreu um erro: " + err))
    console.log(prest)
    return prest
  }

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

            <div /*className="lista-prestadores"*/>
              {prestadores.map((p) => (
                <div /*classname="prestador"*/ key={p.id}>
                  {p.nome && <p>Nome: {p.nome}</p>}
                  {p.estado && <p>Estado: {p.estado}</p>}
                  {p.cidade && <p>Cidade: {p.cidade}</p>}
                  {p.avaliacoes && <p>Nota: {p.avaliacoes} </p> || <p>Nota: Não avaliado</p>/* Se o contratante tiver uma nota registrada, ela é exibida, 
                                                                                               Caso contrário, é exibido que ele não é avaliado
                                                                                               Obs.: Se quiser pode mudar  */} 
                  {p.cep && <p>CEP: {p.cep}</p>}
                  <br/>
                </div>
          
              ))}    
            </div>
        </main>
    </>
  )
}

export default feedContratante
