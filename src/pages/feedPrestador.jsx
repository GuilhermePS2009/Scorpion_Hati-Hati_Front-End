import { Link } from "react-router-dom";
import './css/feedPrestador.css'
import { useEffect, useState } from "react";
import api from "../services/api";

function feedPrestador() {
  const [vagas, setVagas] = useState([]);
  const [candidaturas, setCandidaturas] = useState([]);


 
    useEffect(() => {
      carregarVagas();
      carregarCandidaturas();
    }, []);

  function carregarVagas(){
    return api
      .get("/vagas/GetAll")
      .then((response) => setVagas(response.data))
      .catch((err) => console.error("Ops! Ocorreu um erro: " + err))
  }


async function carregarCandidaturas() {
  try {
    const resposta = await api.get("/candidaturas/prestador/2");
    setCandidaturas(resposta.data);
  } catch (erro) {
    console.error("Erro ao carregar candidaturas:", erro);
  }
}



async function candidatarSe(idVaga) {
  try {
    const idPrestador = 2; // Prestador de teste

    await api.post(
      `/candidaturas/vaga/${idVaga}/prestador/${idPrestador}`
    );
    await carregarCandidaturas();
    alert("Candidatura enviada com sucesso!");
  } catch (erro) {
    console.error("Erro ao enviar candidatura:", erro);

    alert(
      "Não foi possível enviar a candidatura. Verifique se você já se candidatou."
    );
  }
}


  return (
    <>
      <div className="botoes">
            <Link to="/feedPrestador">
                <div className="botao"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
            </Link>

            <Link to="/perfilPrestador">
                <div className="botao"><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
            </Link>
            
            <Link to="/perfilPrestador">
                <div className="botao"><img src="src/assets/perfilFoto.png" alt="Img do Chat"/>Perfil</div>
            </Link>
        </div>
        <main className="conteudoP">
            <input type="search" placeholder="Pesquisar..." aria-label="Pesquisar"/>
            <div className="filtro-boxP">
              <span className="icone-filtroP" aria-hidden="true"></span>
              <select defaultValue="">
                <option value="" disabled>Filtro</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="lista-vagas">
              {vagas.map((v) => {
                const candidatura = candidaturas.find(
                  (c) => c.vaga?.id === v.id
                );

                return (
                  <div className="vaga" key={v.id}>

                  
                  {v.tipoServico && <p className="vaga-titulo">{v.tipoServico}</p>}
                  {v.dataHoraVaga && <p>Data e hora: {new Date(v.dataHoraVaga).toLocaleString()}</p>}
                  {/*v.dataHoraVaga && <p>Hora: {new Date(v.dataHoraVaga)}</p>*/}
                  {v.localizacao && <p>Localização: {v.localizacao}</p>}
                  {v.nomeContratante && <p>Contratante: {v.nomeContratante}</p>}
                  {v.pessoaCuidada && <p>Cuidado: {v.pessoaCuidada}</p>}

                  <button
                    type="button"
                    disabled={!!candidatura}
                    onClick={() => candidatarSe(v.id)}
                  >
                    {candidatura?.status === "ACEITA"
                      ? "Candidatura aceita"
                      : candidatura?.status === "PENDENTE"
                      ? "Candidatura pendente"
                      : candidatura
                      ? "Já candidatado"
                      : "Candidatar-se"}
                  </button>

                </div>
              );
})}
            </div>

        </main>
    </>
  )
}

export default feedPrestador
