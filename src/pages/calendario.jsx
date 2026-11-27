
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./css/calendario.css";

const ID_PRESTADOR = 2; // Prestador de teste

function Icone({ nome, tamanho = 24 }) {
  const propriedades = {
    width: tamanho,
    height: tamanho,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const desenhos = {
    casa: (
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
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
        <path d="M7 3v4M17 3v4M3 10h18M7 14h10M7 17h6" />
      </>
    ),
    esquerda: <path d="m15 18-6-6 6-6" />,
    direita: <path d="m9 18 6-6-6-6" />,
    menu: (
      <>
        <circle cx="12" cy="4" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </>
    ),
  };

  return <svg {...propriedades}>{desenhos[nome]}</svg>;
}

const feriados = {
  "2026-04-03": "Paixão de Cristo",
  "2026-04-21": "Tiradentes",
  "2026-05-01": "Dia do Trabalho",
};

const diasSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function chaveData(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

export default function Calendario() {
  const navigate = useNavigate();

  const [agendamentos, setAgendamentos] = useState([]);
  const [folgas, setFolgas] = useState([]);
  const [erroAgendamentos, setErroAgendamentos] = useState("");
  const [erroFolgas, setErroFolgas] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const [dataAtual, setDataAtual] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  });

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const resposta = await api.get(
          `/agendamentos/prestador/${ID_PRESTADOR}`
        );

        if (ativo) {
          setAgendamentos(resposta.data);
          setErroAgendamentos("");
        }
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);

        if (ativo) {
          setErroAgendamentos(
            "Não foi possível carregar os agendamentos."
          );
        }
      }

      try {
        const resposta = await api.get(
          `/folgas/prestador/${ID_PRESTADOR}`
        );

        if (ativo) {
          setFolgas(resposta.data);
          setErroFolgas("");
        }
      } catch (error) {
        console.error("Erro ao carregar folgas:", error);

        if (ativo) {
          setErroFolgas(
            "Não foi possível carregar as folgas."
          );
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, []);

  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();

  function mudarMes(direcao) {
    setDataAtual(new Date(ano, mes + direcao, 1));
    setMenuAberto(false);
  }

  function gerarDias() {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const dias = [];

    for (let i = 0; i < 42; i++) {
      const data = new Date(
        ano,
        mes,
        i - primeiroDiaSemana + 1
      );

      dias.push({
        data,
        chave: chaveData(data),
        numero: data.getDate(),
        mesAtual: data.getMonth() === mes,
      });
    }

    return dias;
  }

  const dias = gerarDias();

  function obterEvento(dia) {
    const agendamentosDoDia = agendamentos.filter(
      (agendamento) =>
        agendamento.dataHora?.slice(0, 10) === dia.chave
    );

    if (agendamentosDoDia.length > 0) {
      return {
        tipo: "agendamento",
        itens: agendamentosDoDia.map((agendamento) => ({
          hora: agendamento.dataHora.slice(11, 16),
          texto:
            agendamento.descricao || "Serviço agendado",
          cor: "verde",
        })),
      };
    }

    const folga = folgas.find(
      (item) => item.dataFolga === dia.chave
    );

    if (folga) {
      return {
        tipo: "folga",
        titulo: folga.motivo || "Folga",
      };
    }

    if (feriados[dia.chave]) {
      return {
        tipo: "feriado",
        titulo: feriados[dia.chave],
      };
    }

    return null;
  }

  return (
    <div className="pagina-calendario">
      <aside className="cal-sidebar">
        <div className="cal-sidebar-espaco" />

        <div className="cal-nav-item">
          <Icone nome="casa" tamanho={35} />
          <span>Feed</span>
        </div>

        <div className="cal-nav-item cal-nav-ativo">
          <Icone nome="chat" tamanho={35} />
          <span>Chat</span>
        </div>

        <div className="cal-nav-item">
          <Icone nome="perfil" tamanho={35} />
          <span>Perfil</span>
        </div>
      </aside>

      <main className="cal-conteudo">
        <header className="cal-cabecalho">
          <div className="cal-titulo-grupo">
            <div className="cal-icone-titulo">
              <Icone nome="calendario" tamanho={36} />
            </div>

            <h1>Calendário {ano}</h1>
          </div>

          <div className="cal-acoes-cabecalho">
            <button
              type="button"
              className="cal-botao-folgas"
              onClick={() => navigate("/folgas")}
            >
              Folgas
            </button>

            <div className="cal-menu-container">
              <button
                type="button"
                className="cal-menu-visual"
                aria-label="Abrir opções do calendário"
                aria-expanded={menuAberto}
                onClick={() => setMenuAberto(!menuAberto)}
              >
                <Icone nome="menu" tamanho={28} />
              </button>

              {menuAberto && (
                <div className="cal-menu-opcoes">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuAberto(false);
                      navigate("/folgas");
                    }}
                  >
                    Gerenciar folgas
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {erroAgendamentos && (
          <p role="alert">{erroAgendamentos}</p>
        )}

        {erroFolgas && <p role="alert">{erroFolgas}</p>}

        <div className="cal-seletor">
          <div className="cal-linha" />

          <div className="cal-mes-controle">
            <button
              type="button"
              onClick={() => mudarMes(-1)}
              aria-label="Mês anterior"
            >
              <Icone nome="esquerda" tamanho={29} />
            </button>

            <h2>{meses[mes]}</h2>

            <button
              type="button"
              onClick={() => mudarMes(1)}
              aria-label="Próximo mês"
            >
              <Icone nome="direita" tamanho={29} />
            </button>
          </div>

          <div className="cal-linha" />
        </div>

        <div className="cal-rolagem">
          <div className="cal-grade">
            {diasSemana.map((dia) => (
              <div className="cal-dia-semana" key={dia}>
                {dia}
              </div>
            ))}

            {dias.map((dia) => {
              const evento = obterEvento(dia);
              const tipo = evento?.tipo || "normal";

              return (
                <button
                  type="button"
                  key={dia.chave}
                  onClick={() =>
                    navigate(`/calendario/${dia.chave}`)
                  }
                  className={[
                    "cal-dia",
                    `cal-dia-${tipo}`,
                    !dia.mesAtual ? "cal-outro-mes" : "",
                  ].join(" ")}
                  aria-label={`${dia.numero} de ${
                    meses[dia.data.getMonth()]
                  } de ${dia.data.getFullYear()}`}
                >
                  <span className="cal-numero">
                    {dia.numero}
                  </span>

                  {evento?.tipo === "folga" && (
                    <div className="cal-evento-simples">
                      <Icone nome="calendario" tamanho={19} />
                      <span>
                        Folga
                        {evento.titulo !== "Folga"
                          ? `: ${evento.titulo}`
                          : ""}
                      </span>
                    </div>
                  )}

                  {evento?.tipo === "feriado" && (
                    <div className="cal-evento-simples">
                      <Icone nome="calendario" tamanho={19} />
                      <span>{evento.titulo}</span>
                    </div>
                  )}

                  {evento?.tipo === "agendamento" && (
                    <div className="cal-lista-eventos">
                      {evento.itens.map((item, indice) => (
                        <div
                          className="cal-evento-linha"
                          key={indice}
                        >
                          <span
                            className={`cal-bolinha ${item.cor}`}
                          />

                          <span>
                            <strong>{item.hora}</strong>{" "}
                            {item.texto}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
