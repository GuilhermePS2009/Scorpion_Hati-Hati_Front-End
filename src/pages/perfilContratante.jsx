import { useState } from "react";
import { Link } from "react-router-dom";
import './css/perfilContratante.css'
import './css/botao.css'

function PerfilContratante() {
  const [foto, setFoto] = useState("src/assets/Foto.webp");

  function escolher(e) {
    const arquivo = e.target.files[0];
    if (arquivo) setFoto(URL.createObjectURL(arquivo));
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
            <label>
            <img src="src/assets/criarVagaFoto.png" alt="Adicionar anexo" />
            <input type="file" multiple hidden />
            <span>Criar</span>
            </label>
        </section>
      </main>
    </>
  )
}

export default PerfilContratante