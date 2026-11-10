
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/agendamentos.css";

// Dados de exemplo para testar a tela.
// Depois serão substituídos pelos dados do sistema.
const agendamentos = {
  "2026-04-06": [
    {
      id: 1,
      nome: "Serviço 1",
      horario: "07:00",
      localizacao: "Rua das Acácias, 120",
      detalhes: "Serviço residencial agendado.",
      status: "Confirmado",
    },
    {
      id: 2,
      nome: "Serviço 2",
      horario: "20:30",
      localizacao: "Avenida Central, 450",
      detalhes: "Atendimento com o contratante.",
      status: "Confirmado",
    },
  ],

  "2026-04-15": [
    {
      id: 3,
      nome: "Serviço 1",
      horario: "07:00",
      localizacao: "Rua das Acácias, 120",
      detalhes: "Serviço residencial agendado.",
      status: "Confirmado",
    },
    {
      id: 4,
      nome: "Serviço 2",
      horario: "14:00",
      localizacao: "Rua das Flores, 85",
      detalhes: "Compromisso com o contratante.",
      status: "Pendente",
    },
  ],

  "2026-04-30": [
    {
      id: 5,
      nome: "Serviço 1",
      horario: "14:00",
      localizacao: "Rua das Acácias, 120",
      detalhes: "Serviço residencial agendado.",
      status: "Confirmado",
    },
    {
      id: 6,
      nome: "Serviço 2",
      horario: "20:30",
      localizacao: "Avenida Central, 450",
      detalhes: "Compromisso com o contratante.",
      status: "Pendente",
    },
  ],
};

// Ícones desenhados com SVG
function Icone({ tipo, tamanho = 24 }) {
  const props = {
    width: tamanho,
    height: tamanho,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const desenhos = {
    voltar: <path d="M19 12H5m7-7-7 7 7 7" />,

    casa: (
      <>
        <path d="m3 10 9-7 9 7v10H4V10z" />
        <path d="M9 21v-8h6v8" />
      </>
    ),

    chat: (
      <>
        <path d="M4 4h16v13H8l-4 4V4z" />
        <path d="M8 9h8M8 13h6" />
      </>
    ),

    perfil: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
      </>
    ),

    calendario: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18M7 14h10M7 17h5" />
      </>
    ),

    relogio: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    local: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    detalhes: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    fechar: <path d="M6 6l12 12M18 6 6 18" />,
  };

  return <svg {...props}>{desenhos[tipo]}</svg>;
}

// Converte a data da URL em uma data válida
function obterData(chave) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(chave || "")) {
    return null;
  }

  const [ano, mes, dia] = chave.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia
  ) {
    return null;
  }

  return data;
}

export default function Agendamentos() {
  const navigate = useNavigate();
  const { data } = useParams();

  const dataSelecionada = obterData(data);
  const servicos = dataSelecionada
    ? agendamentos[data] || []
    : [];

  const diaSemana = dataSelecionada
    ? new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
      }).format(dataSelecionada)
    : "Data inválida";

  const dataFormatada = dataSelecionada
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(dataSelecionada)
    : "";

  // Por enquanto, os botões são apenas demonstrativos.
  function reagendar() {
    alert("A função de reagendamento será implementada em breve.");
  }

  function cancelar() {
    alert("A função de cancelamento será implementada em breve.");
  }

  return (
    <div className="ag-pagina">

      {/* MENU LATERAL */}
      <aside className="ag-sidebar">

        <button
          className="ag-menu-item ag-voltar"
          type="button"
          onClick={() => navigate("/calendario")}
        >
          <Icone tipo="voltar" tamanho={32} />
          <span>Voltar</span>
        </button>

        <button
          className="ag-menu-item"
          type="button"
          onClick={() => navigate("/feedPrestador")}
        >
          <Icone tipo="casa" tamanho={34} />
          <span>Feed</span>
        </button>

        <div className="ag-menu-item ag-menu-visual">
          <Icone tipo="chat" tamanho={34} />
          <span>Chat</span>
        </div>

        <button
          className="ag-menu-item"
          type="button"
          onClick={() => navigate("/perfilPrestador")}
        >
          <Icone tipo="perfil" tamanho={34} />
          <span>Perfil</span>
        </button>
      </aside>

      {/* CONTEÚDO DA PÁGINA */}
      <main className="ag-conteudo">

        <header className="ag-cabecalho">
          <div>
            <div className="ag-titulo">
              <div className="ag-icone-titulo">
                <Icone tipo="calendario" tamanho={28} />
              </div>

              <span>Meus Agendamentos</span>
            </div>

            <h1 className="ag-dia-semana">
              {diaSemana}
            </h1>

            <p className="ag-data">
              {dataFormatada}
            </p>
          </div>

          <div className="ag-calendario-grande">
            <Icone tipo="calendario" tamanho={55} />
          </div>
        </header>

        <div className="ag-linha-divisoria" />

        {/* CARTÕES DOS SERVIÇOS */}
        <section className="ag-lista-servicos">

          {servicos.length > 0 ? (
            servicos.map((servico, indice) => (
              <article
                className="ag-card"
                key={servico.id}
              >

                {/* CABEÇALHO DO CARD */}
                <div className="ag-card-cabecalho">

                  <div className="ag-servico-titulo">
                    <span className="ag-numero">
                      {String(indice + 1).padStart(2, "0")}
                    </span>

                    <h2>{servico.nome}</h2>
                  </div>

                  <span
                    className={
                      servico.status === "Confirmado"
                        ? "ag-status ag-confirmado"
                        : "ag-status ag-pendente"
                    }
                  >
                    {servico.status === "Confirmado" ? (
                      <Icone tipo="check" tamanho={19} />
                    ) : (
                      <Icone tipo="relogio" tamanho={19} />
                    )}

                    {servico.status}
                  </span>
                </div>

                {/* INFORMAÇÕES DO SERVIÇO */}
                <div className="ag-card-informacoes">

                  <div className="ag-informacao">
                    <div className="ag-info-icone">
                      <Icone tipo="relogio" tamanho={29} />
                    </div>

                    <div>
                      <span className="ag-label">HORÁRIO</span>
                      <strong>{servico.horario}</strong>
                    </div>
                  </div>

                  <div className="ag-informacao">
                    <div className="ag-info-icone">
                      <Icone tipo="local" tamanho={29} />
                    </div>

                    <div>
                      <span className="ag-label">LOCALIZAÇÃO</span>
                      <strong>{servico.localizacao}</strong>
                    </div>
                  </div>

                  <div className="ag-informacao">
                    <div className="ag-info-icone">
                      <Icone tipo="detalhes" tamanho={29} />
                    </div>

                    <div>
                      <span className="ag-label">DETALHES</span>
                      <strong>{servico.detalhes}</strong>
                    </div>
                  </div>

                </div>

                {/* BOTÕES */}
                <div className="ag-card-rodape">
                  <button
                    type="button"
                    className="ag-btn-reagendar"
                    onClick={reagendar}
                  >
                    <Icone tipo="calendario" tamanho={20} />
                    Reagendar
                  </button>

                  <button
                    type="button"
                    className="ag-btn-cancelar"
                    onClick={cancelar}
                  >
                    <Icone tipo="fechar" tamanho={20} />
                    Cancelar
                  </button>
                </div>

              </article>
            ))
          ) : (
            <div className="ag-sem-servicos">
              <Icone tipo="calendario" tamanho={45} />

              <h2>
                {dataSelecionada
                  ? "Nenhum serviço agendado"
                  : "Data inválida"}
              </h2>

              <p>
                {dataSelecionada
                  ? "Não há serviços de exemplo cadastrados para esta data."
                  : "Selecione uma data válida no calendário."}
              </p>

              <button
                type="button"
                onClick={() => navigate("/calendario")}
              >
                Voltar ao calendário
              </button>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}
