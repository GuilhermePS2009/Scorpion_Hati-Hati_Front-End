import { Link } from "react-router-dom";
import './css/feedPrestador.css'
import { useEffect, useState } from "react";
import api from "../services/api";

const tiposFiltro = {
  1: ["1.1", "1.2", "1.3", "1.4", "1.5"],
  2: ["2.1", "2.2", "2.3", "2.4", "2.5"],
  3: ["3.1", "3.2", "3.3", "3.4", "3.5"],
};

function FeedPrestador() {
  const [vagas, setVagas] = useState([]);

  // estados do filtro (precisam ficar DENTRO do componente)
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [tipoAberto, setTipoAberto] = useState(null);
  const [filtros, setFiltros] = useState({ 1: null, 2: null, 3: null });

  const selecionados = Object.values(filtros).filter(Boolean);

  function escolherOpcao(tipo, opcao) {
    // clicar de novo na mesma opção desmarca
    setFiltros({ ...filtros, [tipo]: filtros[tipo] === opcao ? null : opcao });
  }

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
          <div className="botao botaoSel"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
        </Link>

        <Link to="/perfilPrestador">
          <div className="botao"><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
        </Link>

        <Link to="/perfilPrestador">
          <div className="botao"><img src="src/assets/perfilFoto.png" alt="Img do Perfil"/>Perfil</div>
        </Link>
      </div>

      <main className="conteudoP">
        <input type="search" placeholder="Pesquisar..." aria-label="Pesquisar"/>

        <div className="filtro-boxP">
          <button
            type="button"
            className="filtro-botaoP"
            onClick={() => setFiltroAberto(!filtroAberto)}
            aria-expanded={filtroAberto}
          >
            <span className="icone-filtroP" aria-hidden="true"></span>
            <span>{selecionados.length > 0 ? selecionados.join(", ") : "Todos"}</span>
          </button>

          {filtroAberto && (
            <div className="filtro-painelP">
              {Object.keys(tiposFiltro).map((tipo) => (
                <div key={tipo} className="filtro-tipoP">
                  <button
                    type="button"
                    className={"filtro-tipo-botaoP" + (filtros[tipo] ? " ativo" : "")}
                    onClick={() => setTipoAberto(tipoAberto === tipo ? null : tipo)}
                  >
                    {tipo}
                  </button>

                  {tipoAberto === tipo && (
                    <div className="filtro-opcoesP">
                      {tiposFiltro[tipo].map((op) => (
                        <button
                          type="button"
                          key={op}
                          className={"filtro-opcaoP" + (filtros[tipo] === op ? " sel" : "")}
                          onClick={() => escolherOpcao(tipo, op)}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lista-vagas">
          {vagas.map((v) => (
            <div className="vaga" key={v.id}>
              {v.tipoServico && <p className="vaga-titulo">{v.tipoServico}</p>}
              {v.dataHoraVaga && <p>Data e hora: {new Date(v.dataHoraVaga).toLocaleString()}</p>}
              {v.localizacao && <p>Localização: {v.localizacao}</p>}
              {v.nomeContratante && <p>Contratante: {v.nomeContratante}</p>}
              {v.pessoaCuidada && <p>Cuidado: {v.pessoaCuidada}</p>}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default FeedPrestador