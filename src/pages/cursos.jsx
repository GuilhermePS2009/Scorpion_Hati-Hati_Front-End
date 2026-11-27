import { useState } from "react";
import { Link } from "react-router-dom";
import './css/perfilPrestador.css'
import './css/botao.css'


function Cursos(){
    
    return(
        <>
            <div className="botoes">
                <Link to="/feedContratante">
                <div className="botao"><img src="src/assets/feedFoto.png" alt="Img da Feed"/>Feed</div>
                </Link>

                <Link to="/perfilContratante">
                <div className="botao"><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
                </Link>

                <Link to="/perfilContratante">
                <div className="botao botaoSel"><img src="src/assets/perfilFoto.png" alt="Img do Perfil"/>Perfil</div>
                </Link>
            </div>
      </>
    )
}
export default Cursos