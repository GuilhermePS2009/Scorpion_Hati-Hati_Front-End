
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import "./css/botao.css";
import "./css/feedContratante.css";

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

function feedContratante() {
  const [vagas, setVagas] = useState([]);
  const [candidaturasPorVaga, setCandidaturasPorVaga] = useState({});
  const [erro, setErro] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [publicando, setPublicando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const idContratante = 1; // Somente para testes

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

  useEffect(() => {
    carregarVagas();
  }, []);

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

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

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
          <div className="botao">
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

        <div className="filtro-boxC">
          <span className="icone-filtroC" aria-hidden="true"></span>
          <select defaultValue="">
            <option value="" disabled>Filtro</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <div style={{ margin: "20px 0" }}>
          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
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
              {publicando ? "Publicando..." : "Publicar vaga"}
            </button>
          </form>
        )}

        {mensagem && <p>{mensagem}</p>}
        {erro && <p>{erro}</p>}

        <div className="lista-vagas">
          {vagas.map((vaga) => (
            <div className="vaga" key={vaga.id}>
              <h2>{vaga.tipoServico || "Serviço"}</h2>

              <p>{vaga.descricaoServicoVaga}</p>

              <p>
                Data:{" "}
                {vaga.dataHoraVaga
                  ? new Date(vaga.dataHoraVaga).toLocaleString("pt-BR")
                  : "Não informada"}
              </p>

              <p>Local: {vaga.localizacao}</p>

              <p>
                Valor: R$ {Number(vaga.valor || 0).toFixed(2)}
              </p>

              <h3>Candidaturas recebidas</h3>

              {(candidaturasPorVaga[vaga.id] || []).length === 0 ? (
                <p>Nenhuma candidatura recebida.</p>
              ) : (
                (candidaturasPorVaga[vaga.id] || []).map(
                  (candidatura) => (
                    <div key={candidatura.id}>
                      <p>
                        Prestador:{" "}
                        {candidatura.prestador?.nome || "Não informado"}
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

export default feedContratante;
