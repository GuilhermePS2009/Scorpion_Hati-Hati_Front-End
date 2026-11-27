import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './css/botao.css'
import './css/feedContratante.css'
import api from "../services/api";

const siglaParaEstado = {
  'SP': "São Paulo",
  'RJ': "Rio de Janeiro",
  'GO': "Goiás"
}

const tiposFiltro = {
  "Área de Serviço": ["Cuidador de idosos", "Cuidador infantil", "Cuidador de pessoas com deficiência (PcD)", "Cuidador de pessoas com doenças crônicas", "Cuidador pós-operatório", "Enfermagem", "Psicologia", "Psiquiatria", "Neuropsicologia", "Psicopedagogia", "Fisioterapia", "Acupuntura", "Intérprete de Libras", "Babá"],
  "Local": ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
  3: ["3.1", "3.2", "3.3", "3.4", "3.5"],
};

function FeedContratante() {
  const [prestadores, setPrestadores] = useState([]);

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
    buscarPrestadores()
  }, [])

  function buscarPrestadores(){
    return api
      .get("/prestadores/getAll")
      .then((response) => setPrestadores(response.data))
      .catch((err) => console.error("Ops! Ocorreu um erro: " + err))
  }

  return (
    <>
      <div className="botoes">
        <Link to="/feedContratante">
          <div className="botao botaoSel"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
        </Link>

        <Link to="/perfilContratante">
          <div className="botao"><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
        </Link>

        <Link to="/perfilContratante">
          <div className="botao"><img src="src/assets/perfilFoto.png" alt="Img do Perfil"/>Perfil</div>
        </Link>
      </div>

      <main className="conteudoC">
        <input type="search" placeholder="Pesquisar..." aria-label="Pesquisar"/>

        <div className="filtro-boxC">
          <button
            type="button"
            className="filtro-botao"
            onClick={() => setFiltroAberto(!filtroAberto)}
            aria-expanded={filtroAberto}
          >
            <span className="icone-filtroC" aria-hidden="true"></span>
            <span>{selecionados.length > 0 ? selecionados.join(", ") : "Todos"}</span>
          </button>

          {filtroAberto && (
            <div className="filtro-painel">
              {Object.keys(tiposFiltro).map((tipo) => (
                <div key={tipo} className="filtro-tipo">
                  <button
                    type="button"
                    className={"filtro-tipo-botao" + (filtros[tipo] ? " ativo" : "")}
                    onClick={() => setTipoAberto(tipoAberto === tipo ? null : tipo)}
                  >
                    {tipo}
                  </button>

                  {tipoAberto === tipo && (
                    <div className="filtro-opcoes">
                      {tiposFiltro[tipo].map((op) => (
                        <button
                          type="button"
                          key={op}
                          className={"filtro-opcao" + (filtros[tipo] === op ? " sel" : "")}
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

        <div /*className="lista-prestadores"*/>
          {prestadores.map((p) => (
            <div /*className="prestador"*/ key={p.id}>
              {p.nome && <p>Nome: {p.nome}</p>}
              {p.estado && <p>Estado: {siglaParaEstado[p.estado]}</p>}
              {p.cidade && <p>Cidade: {p.cidade}</p>}
              {p.avaliacoes ? <p>Nota: {p.avaliacoes}</p> : <p>Nota: Não avaliado</p>}
              {p.cep && <p>CEP: {p.cep}</p>}
              <br/>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default FeedContratante