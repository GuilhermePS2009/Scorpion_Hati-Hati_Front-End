import { Link } from "react-router-dom";
import './css/feedPrestador.css'
import { useEffect, useState } from "react";
import api from "../services/api";

function feedPrestador() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => { 
    carregarVagas()
  }, []);

  function carregarVagas(){
    return api
      .get("/vagas/GetAll")
      .then((response) => setVagas(response.data))
      .catch((err) => console.error("Ops! Ocorreu um erro: " + err))
  }

  return (
    <>
      <div className="botoes">
            <Link to="/feedPrestador">
                <div className="botao botaoSel botaoF"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
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
            <div className="filtro-boxP">
              <span className="icone-filtroP" aria-hidden="true"></span>
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
            <div className="lista-vagas">
              {vagas.map((v) => (
                <div className="vaga" key={v.id}>
                  
                  {v.tipoServico && <p className="vaga-titulo">{v.tipoServico}</p>}
                  {v.dataHoraVaga && <p>Data e hora: {new Date(v.dataHoraVaga).toLocaleString()}</p>}
                  {/*v.dataHoraVaga && <p>Hora: {new Date(v.dataHoraVaga)}</p>*/}
                  {v.localizacao && <p>Localização: {v.localizacao}</p>}
                  {v.nomeContratante && <p>Contratante: {v.nomeContratante}</p>}
                  {v.pessoaCuidada && <p>Cuidado: {v.pessoaCuidada}</p>}
                </div>
              )
              )}
            </div>

        </main>
    </>
  )
}

export default feedPrestador
