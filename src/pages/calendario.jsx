
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./css/calendario.css";

// Ícones utilizados na tela
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
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
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
        <path d="M7 3v4M17 3v4M3 10h18M7 14h10M7 17h6" />
      </>
    ),
    relogio: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
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

// Eventos de exemplo do calendário
const eventos = {
  "2026-04-03": {
    tipo: "feriado",
    titulo: "Paixão de Cristo",
  },
  "2026-04-06": {
    tipo: "agendamento",
    itens: [
      { hora: "7:00", texto: "serviço agendado", cor: "verde" },
      { hora: "20:30", texto: "serviço agendado", cor: "verde" },
    ],
  },
  "2026-04-15": {
    tipo: "agendamento",
    itens: [
      { hora: "7:00", texto: "serviço agendado", cor: "verde" },
      { hora: "14:00", texto: "compromisso", cor: "vermelho" },
    ],
  },
  "2026-04-18": {
    tipo: "ocupado",
    titulo: "Todos horários ocupados",
  },
  "2026-04-21": {
    tipo: "feriado",
    titulo: "Tiradentes",
  },
  "2026-05-01": {
    tipo: "feriado",
    titulo: "Dia do Trabalho",
  },
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
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro",
];

// Formata a data sem problemas de fuso horário
function chaveData(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

export default function Calendario() {

  const navigate = useNavigate();
  // Começamos em abril de 2026, como na referência
  const [dataAtual, setDataAtual] = useState(
    new Date(2026, 3, 1)
  );
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();

  function mudarMes(direcao) {
    setDataAtual(new Date(ano, mes + direcao, 1));
    setDiaSelecionado(null);
  }

  function gerarDias() {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const dias = [];

    // 42 posições: seis semanas completas
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
        domingo: data.getDay() === 0,
      });
    }

    return dias;
  }

  const dias = gerarDias();

  function obterEvento(dia) {
    if (eventos[dia.chave]) {
      return eventos[dia.chave];
    }

    if (dia.domingo) {
      return {
        tipo: "folga",
        titulo: "Folga",
      };
    }

    return null;
  }

  return (
    <div className="pagina-calendario">
      {/* MENU LATERAL */}
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="cal-conteudo">

        {/* CABEÇALHO */}
        <header className="cal-cabecalho">
          <div className="cal-titulo-grupo">
            <div className="cal-icone-titulo">
              <Icone nome="calendario" tamanho={36} />
            </div>

            <h1>Calendário {ano}</h1>
          </div>

          <div className="cal-menu-visual">
            <Icone nome="menu" tamanho={28} />
          </div>
        </header>

        {/* SELETOR DE MÊS */}
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

        {/* CALENDÁRIO */}
        <div className="cal-rolagem">
          <div className="cal-grade">

            {/* DIAS DA SEMANA */}
            {diasSemana.map((dia) => (
              <div className="cal-dia-semana" key={dia}>
                {dia}
              </div>
            ))}

            {/* DIAS DO MÊS */}
            {dias.map((dia) => {
              const evento = obterEvento(dia);
              const tipo = evento?.tipo || "normal";
              const selecionado = diaSelecionado === dia.chave;

              return (
                <button
                  type="button"
                  key={dia.chave}
                  onClick={() => navigate(`/calendario/${dia.chave}`)}
                  className={[
                    "cal-dia",
                    `cal-dia-${tipo}`,
                    !dia.mesAtual ? "cal-outro-mes" : "",
                    selecionado ? "cal-selecionado" : "",
                  ].join(" ")}
                  aria-label={`${dia.numero} de ${
                    meses[dia.data.getMonth()]
                  } de ${dia.data.getFullYear()}`}
                  aria-pressed={selecionado}
                >
                  <span className="cal-numero">
                    {dia.numero}
                  </span>

                  {evento?.tipo === "folga" && (
                    <div className="cal-evento-simples">
                      <Icone nome="calendario" tamanho={19} />
                      <span>Folga</span>
                    </div>
                  )}

                  {evento?.tipo === "feriado" && (
                    <div className="cal-evento-simples">
                      <Icone nome="calendario" tamanho={19} />
                      <span>{evento.titulo}</span>
                    </div>
                  )}

                  {evento?.tipo === "ocupado" && (
                    <div className="cal-evento-simples">
                      <Icone nome="relogio" tamanho={21} />
                      <span>{evento.titulo}</span>
                    </div>
                  )}

                  {evento?.tipo === "agendamento" && (
                    <div className="cal-lista-eventos">
                      {evento.itens.map((item, indice) => (
                        <div className="cal-evento-linha" key={indice}>
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
