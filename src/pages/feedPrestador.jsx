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
            <div className="filtro-boxP">
              <span className="icone-filtroP" aria-hidden="true"></span>
              <select defaultValue="">
                <option value="" disabled>Filtro</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="lista-vagas">
              {vagas.map((v) => (
                <div className="vaga" key={v.id}>
                  {v.dataHoraVaga && <p>Data: {new Date(v.dataHoraVaga).getDate().toLocaleString("pt-BR")}</p>}
                  {v.dataHoraVaga && <p>Hora: {new Date(v.dataHoraVaga).getHours().toLocaleString("pt-BR")}</p>}
                  {v.localizacao && <p>Localização: {v.localizacao}</p>}
                  {v.nomeContratante && <p>Contratante: {v.nomeContratante}</p>}
                  {v.tipoServico && <p>Cuidado: {v.tipoServico}</p>}
                </div>
              )
              )}
            </div>

        </main>
    </>
  )
}

export default feedPrestador
