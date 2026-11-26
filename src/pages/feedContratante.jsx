import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import './css/botao.css'
import './css/feedContratante.css'
import api from "../services/api";

const siglaParaEstado = {
  'SP': "São Paulo",
  'RJ': "Rio de Janeiro",
  'GO': "Goiás"
}

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
                <div className="botao botaoSel botaoF"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
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
              <span>Filtro</span>
              <div>
                <select>
                  <option selected disabled>1</option>
                  <option>1.1</option>
                  <option>1.2</option>
                  <option>1.3</option>
                  <option>1.4</option>
                  <option>1.5</option>
                </select>
                <select>
                  <option selected disabled>2</option>
                  <option>2.1</option>
                  <option>2.2</option>
                  <option>2.3</option>
                  <option>2.4</option>
                  <option>2.5</option>
                </select>
                <select>
                  <option selected disabled>3</option>
                  <option>3.1</option>
                  <option>3.2</option>
                  <option>3.3</option>
                  <option>3.4</option>
                  <option>3.5</option>
                </select>
              </div>
            </div>

            <div /*className="lista-prestadores"*/>
              {prestadores.map((p) => (
                <div /*classname="prestador"*/ key={p.id}>
                  {p.nome && <p>Nome: {p.nome}</p>}
                  {p.estado && <p>Estado: {siglaParaEstado[p.estado]}</p>}
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
