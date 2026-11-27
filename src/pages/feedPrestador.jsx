
import { Link } from "react-router-dom";
import "./css/feedPrestador.css";
import { useEffect, useState } from "react";
import api from "../services/api";

const tiposFiltro = {
  "Área de Serviço": [
    "Cuidador de idosos",
    "Cuidador infantil",
    "Cuidador de pessoas com deficiência (PcD)",
    "Cuidador de pessoas com doenças crônicas",
    "Cuidador pós-operatório",
    "Enfermagem",
    "Psicologia",
    "Psiquiatria",
    "Neuropsicologia",
    "Psicopedagogia",
    "Fisioterapia",
    "Acupuntura",
    "Intérprete de Libras",
    "Babá",
  ],
  Local: [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES",
    "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR",
    "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
    "SP", "SE", "TO",
  ],
  3: ["3.1", "3.2", "3.3", "3.4", "3.5"],
};

function FeedPrestador() {
  const [vagas, setVagas] = useState([]);
  const [candidaturas, setCandidaturas] = useState([]);

  // Estados dos filtros
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [tipoAberto, setTipoAberto] = useState(null);
  const [filtros, setFiltros] = useState({
    1: null,
    2: null,
    3: null,
  });

  const selecionados = Object.values(filtros).filter(Boolean);

  // Selecionar ou desmarcar opção do filtro
  function escolherOpcao(tipo, opcao) {
    setFiltros({
      ...filtros,
      [tipo]: filtros[tipo] === opcao ? null : opcao,
    });
  }

  // Carregar vagas
  function carregarVagas() {
    return api
      .get("/vagas/GetAll")
      .then((response) => setVagas(response.data))
      .catch((err) =>
        console.error("Ops! Ocorreu um erro: " + err)
      );
  }

  // Carregar candidaturas do prestador
  async function carregarCandidaturas() {
    try {
      const resposta = await api.get("/candidaturas/prestador/2");

      setCandidaturas(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar candidaturas:", erro);
    }
  }

  // Carregar vagas e candidaturas ao iniciar
  useEffect(() => {
    carregarVagas();
    carregarCandidaturas();
  }, []);

  // Candidatar-se a uma vaga
  async function candidatarSe(idVaga) {
    try {
      const idPrestador = 2; // Prestador de teste

      await api.post(
        `/candidaturas/vaga/${idVaga}/prestador/${idPrestador}`
      );

      await carregarCandidaturas();

      alert("Candidatura enviada com sucesso!");
    } catch (erro) {
      console.error("Erro ao enviar candidatura:", erro);

      alert(
        "Não foi possível enviar a candidatura. Verifique se você já se candidatou."
      );
    }
  }

  return (
    <>
      <div className="botoes">
        <Link to="/feedPrestador">
          <div className="botao botaoSel">
            <img src="src/assets/feedFoto.png" alt="Img da Feed" />
            Feed
          </div>
        </Link>

        <Link to="/perfilPrestador">
          <div className="botao">
            <img src="src/assets/chatFoto.png" alt="Img do Chat" />
            Chat
          </div>
        </Link>

        <Link to="/perfilPrestador">
          <div className="botao">
            <img src="src/assets/perfilFoto.png" alt="Img do Perfil" />
            Perfil
          </div>
        </Link>
      </div>

      <main className="conteudoP">
        <input
          type="search"
          placeholder="Pesquisar..."
          aria-label="Pesquisar"
        />

        {/* FILTROS */}
        <div className="filtro-boxP">
          <button
            type="button"
            className="filtro-botaoP"
            onClick={() => setFiltroAberto(!filtroAberto)}
            aria-expanded={filtroAberto}
          >
            <span
              className="icone-filtroP"
              aria-hidden="true"
            ></span>

            <span>
              {selecionados.length > 0
                ? selecionados.join(", ")
                : "Todos"}
            </span>
          </button>

          {filtroAberto && (
            <div className="filtro-painelP">
              {Object.keys(tiposFiltro).map((tipo) => (
                <div key={tipo} className="filtro-tipoP">
                  <button
                    type="button"
                    className={
                      "filtro-tipo-botaoP" +
                      (filtros[tipo] ? " ativo" : "")
                    }
                    onClick={() =>
                      setTipoAberto(
                        tipoAberto === tipo ? null : tipo
                      )
                    }
                  >
                    {tipo}
                  </button>

                  {tipoAberto === tipo && (
                    <div className="filtro-opcoesP">
                      {tiposFiltro[tipo].map((op) => (
                        <button
                          type="button"
                          key={op}
                          className={
                            "filtro-opcaoP" +
                            (filtros[tipo] === op ? " sel" : "")
                          }
                          onClick={() =>
                            escolherOpcao(tipo, op)
                          }
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

        {/* LISTAGEM DE VAGAS E CANDIDATURAS */}
        <div className="lista-vagas">
          {vagas.map((v) => {
            const candidatura = candidaturas.find(
              (c) => c.vaga?.id === v.id
            );

            return (
              <div className="vaga" key={v.id}>
                {v.tipoServico && (
                  <p className="vaga-titulo">
                    {v.tipoServico}
                  </p>
                )}

                {v.dataHoraVaga && (
                  <p>
                    Data e hora:{" "}
                    {new Date(v.dataHoraVaga).toLocaleString()}
                  </p>
                )}

                {v.localizacao && (
                  <p>Localização: {v.localizacao}</p>
                )}

                {v.nomeContratante && (
                  <p>Contratante: {v.nomeContratante}</p>
                )}

                {v.pessoaCuidada && (
                  <p>Cuidado: {v.pessoaCuidada}</p>
                )}

                <button
                  type="button"
                  disabled={!!candidatura}
                  onClick={() => candidatarSe(v.id)}
                >
                  {candidatura?.status === "ACEITA"
                    ? "Candidatura aceita"
                    : candidatura?.status === "PENDENTE"
                    ? "Candidatura pendente"
                    : candidatura
                    ? "Já candidatado"
                    : "Candidatar-se"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default FeedPrestador;
