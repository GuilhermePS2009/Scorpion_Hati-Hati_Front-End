import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/perfilContratante.css'
import './css/botao.css'
import api from "../services/api";

const formVazio = {
  tipoServico: "",
  dataHora: "",
  duracao: "",
  valor: "",
  localizacao: "",
  nomeContratante: "",
  pessoaCuidada: "",
  idadePessoaCuidada: "",
  observacao: "",
};

// TODO: trocar pelo id do contratante logado
const ID_CONTRATANTE = 1;

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
    carregarVagas();
  }, []);

  function escolher(e) {
    const arquivo = e.target.files[0];
    if (arquivo) setFoto(URL.createObjectURL(arquivo));
  }

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /*function enviar(e) {
    e.preventDefault();
    setVagas([...vagas, { id: Date.now(), ...form }]);
    setForm(formVazio);
    setAberto(false);
  }*/

  function carregarVagas() {
    api
      .get("/vagas/GetAll")
      .then((response) => setVagas(response.data))
      .catch((err) => console.error("Ops! Ocorreu um erro: " + err));
  }

  async function excluir(id) {
    if (!window.confirm("Deseja realmente excluir esta vaga?")) return;

    try {
      await api.delete(`/vagas/deletar/${id}`);
      setVagas(vagas.filter((x) => x.id !== id)); // tira da tela só depois de apagar no banco
    } catch (err) {
      console.error("Erro ao excluir vaga:", err.response?.status, err.response?.data || err.message);
      alert("Não foi possível excluir a vaga.");
    }
  }

  async function enviar(e) {
    e.preventDefault();

    const novaVaga = {
      tipoServico: form.tipoServico,
      dataHoraVaga: form.dataHora || null,
      duracao: form.duracao,
      valor: form.valor !== "" ? Number(form.valor) : null,
      localizacao: form.localizacao,
      pessoaCuidada: form.pessoaCuidada,
      idadePessoaCuidada: form.idadePessoaCuidada !== "" ? Number(form.idadePessoaCuidada) : 0,
      descricaoServicoVaga: form.observacao,
      nomeContratante: form.nomeContratante,
      idContratante: { id: ID_CONTRATANTE }, // ajustar o "1" para o id apropriado
    };  
    
    try {
      await api.post("/vagas/criar", novaVaga); // ajuste a rota
      carregarVagas();                           // recarrega a lista do banco
      setForm(formVazio);
      setAberto(false);
    }catch (err) {
      console.error("Erro ao criar vaga:", err);
      alert("Não foi possível criar a vaga.");
    }
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
                {v.nomeContratante && <p>Contratante: {v.nomeContratante}</p>}
                {v.pessoaCuidada && <p>Pessoa Cuidada: {v.pessoaCuidada}</p>}
                {v.idadePessoaCuidada && <p>Idade: {v.idadePessoaCuidada}</p>}
                {v.tipoServico && <p>Tipo: {v.tipoServico}</p>}
                {v.dataHoraVaga && <p>Data e hora: {new Date(v.dataHoraVaga).toLocaleString("pt-BR")}</p>}
                {v.duracao && <p>Duração: {v.duracao}</p>}
                {v.valor && <p>Valor: R${v.valor}</p>}
                {v.localizacao && <p>Local: {v.localizacao}</p>}
                {v.descricaoServicoVaga && <p>Descrição: {v.descricaoServicoVaga}</p>}



                {/*{v.dataHoraVaga && (
                  <span>Data e hora do serviço: {new Date(v.dataHoraVaga).toLocaleString("pt-BR")}</span>
                )}
                {v.duracao && <span>Duração: {v.duracao}</span>}
                {v.valor && <span>Valor: R$ {v.valor}</span>}
                {v.localizacao && <span>Local: {v.localizacao}</span>}
                {v.idContratante && <span>Contratante: 
                  <br></br><span style={{paddingLeft: '10px', width: '170px', display: 'block'}}>
                    Nome: {v.idContratante.nome}<br></br>
                    Pontos de avaliações: {v.idContratante.avaliacoes}<br></br>
                    Cidade: {v.idContratante.cidade}<br></br>
                    Estado: {v.idContratante.estado}<br></br>
                    CEP: {v.idContratante.cep}
                    </span>
                  </span>}
                {v.pessoaCuidada && (
                  <span>
                    Pessoa cuidada: {v.pessoaCuidada}
                    {v.idadePessoaCuidada && `, ${v.idadePessoaCuidada} anos`}
                  </span>
                )}
                {v.descricaoServicoVaga && <p>Descrição: {v.descricaoServicoVaga}</p>}*/}
                <button type="button" onClick={() => excluir(v.id)}>
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
                <input name="tipoServico" value={form.tipoServico} onChange={mudar} required />
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
                <input name="valor" type="number" min="0" step="0.01" value={form.valor} onChange={mudar} />
              </label>

              <label>
                Localização:
                <input name="localizacao" value={form.localizacao} onChange={mudar} />
              </label>

              <label>
                Contratante:
                <input name="nomeContratante" value={form.nomeContratante} onChange={mudar} />
              </label>

              <label>
                Pessoa cuidada:
                <input name="pessoaCuidada" value={form.pessoaCuidada} onChange={mudar} />
              </label>

              <label>
                Idade da pessoa cuidada:
                <input name="idadePessoaCuidada" type="number" min="0" value={form.idadePessoaCuidada} onChange={mudar} />
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

