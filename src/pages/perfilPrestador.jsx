import { useState } from "react";
import { Link } from "react-router-dom";
import './css/perfilPrestador.css'
import './css/botao.css'

function PerfilPrestador() {
  const [foto, setFoto] = useState("src/assets/Foto.webp");

  function escolher(e) {
    const arquivo = e.target.files[0];
    if (arquivo) setFoto(URL.createObjectURL(arquivo));
  }

  return (
    <>
      <div className="botoes">
        <Link to="/feedPrestador">
          <div className="botao"><img src="src/assets/feedFoto.png" alt="Feed" />Feed</div>
        </Link>

        <Link to="/perfilPrestador">
          <div className="botao"><img src="src/assets/chatFoto.png" alt="Chat" />Chat</div>
        </Link>

        <Link to="/perfilPrestador">
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
            <h1>Usuário Prestador</h1>
            <p>ID: 001</p>
          </div>

          <div className="menu" role="img" aria-label="Menu"></div>
        </header>

        <div className="acoes">
          <Link to="/perfilPrestador" className="btn-chat">
            <img src="src/assets/chatFoto.png" alt="" />
            Chat
          </Link>

          <div className="calendario" role="img" aria-label="Calendário"></div>

          {/*<div className="avaliacoes">
            {avaliacoes.map((a) => (
              <div className="avaliacao" key={a.rosto} style={{ "--cor": a.cor }}>
                <div className="rosto">{a.rosto}</div>
                <span>{a.pct}%</span>
              </div>
            ))}
          </div>*/}
        </div>

        <div className="linha"></div>

        <section className="anexos">
          <label>
            <img src="src/assets/adicionarFoto.png" alt="Adicionar anexo" />
            <input type="file" multiple hidden />
            <span>Anexos</span>
          </label>
        </section>
      </main>
    </>
  )
}

export default PerfilPrestador
