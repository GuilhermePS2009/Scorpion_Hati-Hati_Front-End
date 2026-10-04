import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/perfilContratante.css'
import './css/botao.css'
import api from "../services/api";

const formVazio = {
  tipo: "",
  dataHora: "",
  duracao: "",
  valor: "",
  local: "",
  contratante: "",
  pessoa: "",
  idade: "",
  observacao: "",
};

function PerfilContratante() {
  const [foto, setFoto] = useState("src/assets/Foto.webp");
  const [aberto, setAberto] = useState(false);
  const [form, setForm] = useState(formVazio);

  const [vagas, setVagas] = useState([])
    /*(() => {
    const salvo = localStorage.getItem("vagas");
    return salvo ? JSON.parse(salvo) : [];
  });*/

  /*useEffect(() => {
    localStorage.setItem("vagas", JSON.stringify(vagas));
  }, [vagas]); */

  useEffect(() => {
    api
      .get("/vagas/GetAll")
      .then((response) => {
        console.log("Resposta:", response.data, response.data[0].idContratante);
        setVagas(response.data)
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err)
      })
  }, [])
  function escolher(e) {
    const arquivo = e.target.files[0];
    if (arquivo) setFoto(URL.createObjectURL(arquivo));
  }

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function enviar(e) {
    e.preventDefault();
    setVagas([...vagas, { id: Date.now(), ...form }]);
    setForm(formVazio);
    setAberto(false);
  }

  return (
    <>
      <div className="botoes">
        <Link to="/feedContratante">
          <div className="botao"><img src="src/assets/feedFoto.png" alt="Feed" />Feed</div>
        </Link>

        <Link to="/perfilContratante">
          <div className="botao"><img src="src/assets/chatFoto.png" alt="Chat" />Chat</div>
        </Link>

        <Link to="/perfilContratante">
          <div className="botao"><img src="src/assets/perfilFoto.png" alt="Perfil" />Perfil</div>
        </Link>
      </div>

      <main className="conteudo">
        <header className="cabecalho">
          <label className="foto-perfil">
            <img src={foto} alt="Foto de perfil" />
            <input type="file" accept="image/*" hidden onChange={escolher} />
          </label>

          <div className="info">
            <h1>Usuário Contratante</h1>
            <p>ID: 001</p>
          </div>

          <div className="menu" role="img" aria-label="Menu"></div>
        </header>

        <div className="acoes">
          <Link to="/perfilContratante" className="btn-chat">
            <img src="src/assets/chatFoto.png" alt="" />
            Chat
          </Link>
          <div className="calendario" role="img" aria-label="Calendário"></div>
        </div>

        <div className="linha"></div>

        <section className="anexos">
          <button type="button" className="btn-criar" onClick={() => setAberto(true)}>
            <img src="src/assets/criarVagaFoto.png" alt="Criar vaga" />
            <span>Criar</span>
          </button>

          <div className="lista-vagas">
            {vagas.map((v) => (
              <div className="vaga" key={v.id}>
                {v.dataHoraVaga && (
                  <span>Data e hora do serviço: {new Date(v.dataHoraVaga).toLocaleString("pt-BR")}</span>
                )}
                {/*v.duracao && <span>Duração: {v.duracao}</span>*/}
                {/*v.valor && <span>R$ {v.valor}</span>*/}
                {/*v.local && <span>Local: {v.local}</span>*/}
                {v.idContratante && <span>Contratante: 
                  <br></br><span style={{paddingLeft: '10px', width: '170px', display: 'block'}}>
                    Nome: {v.idContratante.nome}<br></br>
                    Pontos de avaliações: {v.idContratante.avaliacoes}<br></br>
                    Cidade: {v.idContratante.cidade}<br></br>
                    Estado: {v.idContratante.estado}<br></br>
                    CEP: {v.idContratante.cep}
                    </span>
                  </span>}
                {/*v.pessoa && (
                  <span>
                    Pessoa cuidada: {v.pessoa}
                    {v.idade && `, ${v.idade} anos`}
                  </span>
                )*/}
                {v.descricaoServicoVaga && <p>Descrição: {v.descricaoServicoVaga}</p>}
                <button
                  type="button"
                  onClick={() => setVagas(vagas.filter((x) => x.id !== v.id))}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </section>

        {aberto && (
          <div className="overlay" onClick={() => setAberto(false)}>
            <form
              className="modal"
              onClick={(e) => e.stopPropagation()}
              onSubmit={enviar}
            >
              <h2>Criar vaga</h2>

              <label>
                Tipo de serviço:
                <input name="tipo" value={form.tipo} onChange={mudar} required />
              </label>

              <label>
                Data e horário:
                <input name="dataHora" type="datetime-local" value={form.dataHora} onChange={mudar} />
              </label>

              <label>
                Duração:
                <input name="duracao" value={form.duracao} onChange={mudar} />
              </label>

              <label>
                Valor (R$):
                <input name="valor" type="number" min="0" value={form.valor} onChange={mudar} />
              </label>

              <label>
                Localização:
                <input name="local" value={form.local} onChange={mudar} />
              </label>

              <label>
                Contratante:
                <input name="contratante" value={form.contratante} onChange={mudar} />
              </label>

              <label>
                Pessoa cuidada:
                <input name="pessoa" value={form.pessoa} onChange={mudar} />
              </label>

              <label>
                Idade da pessoa cuidada:
                <input name="idade" type="number" min="0" value={form.idade} onChange={mudar} />
              </label>

              <label>
                Observações:
                <textarea name="observacao" rows="3" value={form.observacao} onChange={mudar} />
              </label>

              <div className="modal-botoes">
                <button type="button" className="cancelar" onClick={() => setAberto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="salvar">Salvar</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  )
}

export default PerfilContratante
