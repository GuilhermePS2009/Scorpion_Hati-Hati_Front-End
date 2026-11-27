
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./css/folgas.css";

const ID_PRESTADOR = 2;

function formatarData(data) {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function Folgas() {
  const navigate = useNavigate();

  const [folgas, setFolgas] = useState([]);
  const [dataFolga, setDataFolga] = useState("");
  const [motivo, setMotivo] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [processandoExclusao, setProcessandoExclusao] =
    useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function carregarFolgas() {
    try {
      const resposta = await api.get(
        `/folgas/prestador/${ID_PRESTADOR}`
      );

      setFolgas(resposta.data);
      setErro("");
    } catch (error) {
      console.error("Erro ao carregar folgas:", error);
      setErro("Não foi possível carregar as folgas.");
    }
  }

  useEffect(() => {
    carregarFolgas();
  }, []);

  function limparFormulario() {
    setDataFolga("");
    setMotivo("");
    setIdEditando(null);
  }

  function editarFolga(folga) {
    setIdEditando(folga.id);
    setDataFolga(folga.dataFolga);
    setMotivo(folga.motivo || "");
    setMensagem("");
  }

  async function salvarFolga(evento) {
    evento.preventDefault();

    if (salvando) return;

    setSalvando(true);
    setMensagem("");

    const dados = {
      dataFolga,
      motivo,
    };

    try {
      const editando = idEditando !== null;

      if (editando) {
        await api.put(
          `/folgas/${idEditando}/prestador/${ID_PRESTADOR}`,
          dados
        );
      } else {
        await api.post(
          `/folgas/prestador/${ID_PRESTADOR}`,
          dados
        );
      }

      limparFormulario();
      await carregarFolgas();

      setMensagem(
        editando
          ? "Folga atualizada com sucesso!"
          : "Folga cadastrada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao salvar folga:", error);

      if (error.response?.status === 409) {
        setMensagem(
          "Essa data já possui uma folga ou um agendamento confirmado."
        );
      } else {
        setMensagem(
          "Não foi possível confirmar o salvamento. Verifique os registros antes de tentar novamente."
        );
      }
    } finally {
      setSalvando(false);
    }
  }

  async function excluirFolga(id) {
    const confirmou = window.confirm(
      "Deseja realmente excluir esta folga?"
    );

    if (!confirmou) return;

    setProcessandoExclusao(id);
    setMensagem("");

    try {
      await api.delete(
        `/folgas/${id}/prestador/${ID_PRESTADOR}`
      );

      if (idEditando === id) {
        limparFormulario();
      }

      await carregarFolgas();
      setMensagem("Folga excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir folga:", error);
      setMensagem("Não foi possível excluir a folga.");
    } finally {
      setProcessandoExclusao(null);
    }
  }

  return (
    <main className="pagina-folgas">
      <div className="folgas-topo">
        <button
          type="button"
          className="folgas-voltar"
          onClick={() => navigate("/calendario")}
        >
          ← Voltar ao calendário
        </button>

        <h1>Minhas folgas</h1>

        <p>
          Organize os dias em que você não estará
          disponível para trabalhar.
        </p>
      </div>

      <section className="folgas-card">
        <h2>
          {idEditando !== null
            ? "Editar folga"
            : "Cadastrar nova folga"}
        </h2>

        <form
          onSubmit={salvarFolga}
          className="folgas-form"
        >
          <label>
            Data da folga
            <input
              type="date"
              value={dataFolga}
              onChange={(e) =>
                setDataFolga(e.target.value)
              }
              required
            />
          </label>

          <label>
            Motivo (opcional)
            <input
              type="text"
              maxLength={255}
              placeholder="Ex.: Compromisso pessoal"
              value={motivo}
              onChange={(e) =>
                setMotivo(e.target.value)
              }
            />
          </label>

          <div className="folgas-acoes">
            <button
              type="submit"
              className="folgas-salvar"
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : idEditando !== null
                ? "Salvar alterações"
                : "+ Cadastrar folga"}
            </button>

            {idEditando !== null && (
              <button
                type="button"
                className="folgas-secundario"
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      {mensagem && (
        <p role="status">{mensagem}</p>
      )}

      {erro && (
        <p role="alert">{erro}</p>
      )}

      <section className="folgas-card">
        <h2>Folgas cadastradas</h2>

        {folgas.length === 0 ? (
          <p>Você ainda não cadastrou nenhuma folga.</p>
        ) : (
          <div className="folgas-lista">
            {folgas.map((folga) => (
              <div
                className="folgas-item"
                key={folga.id}
              >
                <div>
                  <strong>
                    {formatarData(folga.dataFolga)}
                  </strong>

                  <p>
                    {folga.motivo || "Dia inteiro"}
                  </p>
                </div>

                <div className="folgas-acoes">
                  <button
                    type="button"
                    className="folgas-secundario"
                    onClick={() => editarFolga(folga)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="folgas-excluir"
                    disabled={processandoExclusao === folga.id}
                    onClick={() => excluirFolga(folga.id)}
                  >
                    {processandoExclusao === folga.id
                      ? "Excluindo..."
                      : "Excluir"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
