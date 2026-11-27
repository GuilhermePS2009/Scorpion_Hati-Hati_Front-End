
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./css/botao.css";
import "./css/feedContratante.css";

import api from "../services/api";

const siglaParaEstado = {
  SP: "São Paulo",
  RJ: "Rio de Janeiro",
  GO: "Goiás",
};

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

const formularioInicial = {
  tipoServico: "Cuidador",
  descricaoServicoVaga: "",
  dataHoraVaga: "",
  prestadorRequerido: "Cuidador",
  duracao: "",
  valor: "",
  localizacao: "",
  pessoaCuidada: "",
  idadePessoaCuidada: "",
  nomeContratante: "Contratante Teste",
};

function FeedContratante() {
  // Dados dos prestadores
  const [prestadores, setPrestadores] = useState([]);

  // Dados das vagas
  const [vagas, setVagas] = useState([]);
  const [candidaturasPorVaga, setCandidaturasPorVaga] = useState({});

  // Estados dos filtros
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [tipoAberto, setTipoAberto] = useState(null);
  const [filtros, setFiltros] = useState({
    1: null,
    2: null,
    3: null,
  });

  const selecionados = Object.values(filtros).filter(Boolean);

  // Estados do formulário
  const [erro, setErro] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [publicando, setPublicando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const idContratante = 1; // Somente para testes

  // Seleção dos filtros
  function escolherOpcao(tipo, opcao) {
    setFiltros({
      ...filtros,
      [tipo]: filtros[tipo] === opcao ? null : opcao,
    });
  }

  // Buscar prestadores
  function buscarPrestadores() {
    return api
      .get("/prestadores/getAll")
      .then((response) => setPrestadores(response.data))
      .catch((err) =>
        console.error("Ops! Ocorreu um erro: " + err)
      );
  }

  // Buscar candidaturas de cada vaga
  async function carregarCandidaturas(listaVagas) {
    const resultados = await Promise.all(
      listaVagas.map(async (vaga) => {
        const resposta = await api.get(
          `/candidaturas/vaga/${vaga.id}`
        );

        return [vaga.id, resposta.data];
      })
    );

    setCandidaturasPorVaga(Object.fromEntries(resultados));
  }

  // Buscar vagas do contratante
  async function carregarVagas() {
    try {
      const resposta = await api.get("/vagas/GetAll");

      const minhasVagas = resposta.data.filter(
        (vaga) => vaga.idContratante?.id === idContratante
      );

      setVagas(minhasVagas);

      await carregarCandidaturas(minhasVagas);

      setErro("");
    } catch (error) {
      console.error("Erro ao carregar vagas:", error);
      setErro("Não foi possível carregar as vagas.");
    }
  }

  // Carregar prestadores e vagas ao iniciar
  useEffect(() => {
    buscarPrestadores();
    carregarVagas();
  }, []);

  // Aceitar candidatura
  async function aceitarCandidatura(idCandidatura) {
    try {
      await api.post(
        `/candidaturas/${idCandidatura}/aceitar/contratante/${idContratante}`
      );

      await carregarCandidaturas(vagas);

      alert("Candidatura aceita! Agendamento criado.");
    } catch (error) {
      console.error("Erro ao aceitar candidatura:", error);
      alert("Não foi possível aceitar a candidatura.");
    }
  }

  // Atualizar campos do formulário
  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  // Publicar nova vaga
  async function publicarVaga(evento) {
    evento.preventDefault();

    if (publicando) return;

    setPublicando(true);
    setMensagem("");

    try {
      const novaVaga = {
        tipoVaga: true,
        tipoServico: formulario.tipoServico,
        descricaoServicoVaga: formulario.descricaoServicoVaga,
        dataHoraVaga: formulario.dataHoraVaga + ":00",
        prestadorRequerido: formulario.prestadorRequerido,
        duracao: formulario.duracao,
        valor: Number(formulario.valor),
        localizacao: formulario.localizacao,
        pessoaCuidada: formulario.pessoaCuidada,
        idadePessoaCuidada: Number(formulario.idadePessoaCuidada),
        nomeContratante: formulario.nomeContratante,
        idContratante: {
          id: idContratante,
        },
      };

      await api.post("/vagas/criar", novaVaga);

      setFormulario(formularioInicial);
      setMostrarFormulario(false);

      await carregarVagas();

      setMensagem("Vaga enviada! Confira a lista abaixo.");
    } catch (error) {
      console.error("Erro ao publicar vaga:", error);

      setMensagem(
        "Não foi possível confirmar a publicação. Verifique o console e o banco antes de tentar novamente."
      );
    } finally {
      setPublicando(false);
    }
  }

  return (
    <>
      <div className="botoes">
        <Link to="/feedContratante">
          <div className="botao botaoSel">
            <img src="src/assets/feedFoto.png" alt="Feed" />
            Feed
          </div>
        </Link>

        <Link to="/perfilContratante">
          <div className="botao">
            <img src="src/assets/chatFoto.png" alt="Chat" />
            Chat
          </div>
        </Link>

        <Link to="/perfilContratante">
          <div className="botao">
            <img src="src/assets/perfilFoto.png" alt="Perfil" />
            Perfil
          </div>
        </Link>
      </div>

      <main className="conteudoC">
        <input
          type="search"
          placeholder="Pesquisar..."
          aria-label="Pesquisar"
        />

        {/* FILTROS */}
        <div className="filtro-boxC">
          <button
            type="button"
            className="filtro-botao"
            onClick={() => setFiltroAberto(!filtroAberto)}
            aria-expanded={filtroAberto}
          >
            <span
              className="icone-filtroC"
              aria-hidden="true"
            ></span>

            <span>
              {selecionados.length > 0
                ? selecionados.join(", ")
                : "Todos"}
            </span>
          </button>

          {filtroAberto && (
            <div className="filtro-painel">
              {Object.keys(tiposFiltro).map((tipo) => (
                <div key={tipo} className="filtro-tipo">
                  <button
                    type="button"
                    className={
                      "filtro-tipo-botao" +
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
                    <div className="filtro-opcoes">
                      {tiposFiltro[tipo].map((op) => (
                        <button
                          type="button"
                          key={op}
                          className={
                            "filtro-opcao" +
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

        {/* PUBLICAR NOVA VAGA */}
        <div style={{ margin: "20px 0" }}>
          <button
            type="button"
            onClick={() =>
              setMostrarFormulario(!mostrarFormulario)
            }
          >
            {mostrarFormulario
              ? "Fechar formulário"
              : "+ Publicar nova vaga"}
          </button>
        </div>

        {mostrarFormulario && (
          <form
            onSubmit={publicarVaga}
            style={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#e8faf5",
              marginBottom: "24px",
              maxWidth: "550px",
            }}
          >
            <h2>Publicar nova vaga</h2>

            <div className="campos-nova-vaga">
              <label>
                Tipo de serviço
                <input
                  name="tipoServico"
                  value={formulario.tipoServico}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Descrição do serviço
                <textarea
                  name="descricaoServicoVaga"
                  value={formulario.descricaoServicoVaga}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Data e horário
                <input
                  type="datetime-local"
                  name="dataHoraVaga"
                  value={formulario.dataHoraVaga}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Profissional requerido
                <input
                  name="prestadorRequerido"
                  value={formulario.prestadorRequerido}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Duração (ex.: 3 horas)
                <input
                  name="duracao"
                  value={formulario.duracao}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Valor em reais
                <input
                  type="number"
                  name="valor"
                  min="0.01"
                  step="0.01"
                  value={formulario.valor}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Localização
                <input
                  name="localizacao"
                  value={formulario.localizacao}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Pessoa que receberá os cuidados
                <input
                  name="pessoaCuidada"
                  value={formulario.pessoaCuidada}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Idade da pessoa
                <input
                  type="number"
                  name="idadePessoaCuidada"
                  min="0"
                  max="130"
                  value={formulario.idadePessoaCuidada}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Nome do contratante
                <input
                  name="nomeContratante"
                  value={formulario.nomeContratante}
                  onChange={atualizarCampo}
                  required
                />
              </label>
            </div>

            <button type="submit" disabled={publicando}>
              {publicando
                ? "Publicando..."
                : "Publicar vaga"}
            </button>
          </form>
        )}

        {mensagem && <p>{mensagem}</p>}
        {erro && <p>{erro}</p>}

        {/* LISTAGEM DE PRESTADORES */}
        <h2>Prestadores disponíveis</h2>

        <div>
          {prestadores.map((p) => (
            <div key={p.id}>
              {p.nome && <p>Nome: {p.nome}</p>}

              {p.estado && (
                <p>
                  Estado: {siglaParaEstado[p.estado] || p.estado}
                </p>
              )}

              {p.cidade && <p>Cidade: {p.cidade}</p>}

              {p.avaliacoes ? (
                <p>Nota: {p.avaliacoes}</p>
              ) : (
                <p>Nota: Não avaliado</p>
              )}

              {p.cep && <p>CEP: {p.cep}</p>}

              <br />
            </div>
          ))}
        </div>

        {/* LISTAGEM DE VAGAS */}
        <h2>Minhas vagas publicadas</h2>

        <div className="lista-vagas">
          {vagas.map((vaga) => (
            <div className="vaga" key={vaga.id}>
              <h2>{vaga.tipoServico || "Serviço"}</h2>

              <p>{vaga.descricaoServicoVaga}</p>

              <p>
                Data:{" "}
                {vaga.dataHoraVaga
                  ? new Date(
                      vaga.dataHoraVaga
                    ).toLocaleString("pt-BR")
                  : "Não informada"}
              </p>

              <p>Local: {vaga.localizacao}</p>

              <p>
                Valor: R${" "}
                {Number(vaga.valor || 0).toFixed(2)}
              </p>

              <h3>Candidaturas recebidas</h3>

              {(candidaturasPorVaga[vaga.id] || []).length ===
              0 ? (
                <p>Nenhuma candidatura recebida.</p>
              ) : (
                (candidaturasPorVaga[vaga.id] || []).map(
                  (candidatura) => (
                    <div key={candidatura.id}>
                      <p>
                        Prestador:{" "}
                        {candidatura.prestador?.nome ||
                          "Não informado"}
                      </p>

                      <p>Status: {candidatura.status}</p>

                      {candidatura.status === "PENDENTE" && (
                        <button
                          type="button"
                          onClick={() =>
                            aceitarCandidatura(candidatura.id)
                          }
                        >
                          Aceitar candidatura
                        </button>
                      )}
                    </div>
                  )
                )
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default FeedContratante;
