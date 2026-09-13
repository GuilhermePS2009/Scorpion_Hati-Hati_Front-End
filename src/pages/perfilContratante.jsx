import { Link } from "react-router-dom";

function perfilContratante() {

  return (
    <>
        {/*style={{backgroundColor: "#6af6cf"}}*/}
        <div>
            <Link to="/feedContratante">
                <div><img src="src/assets/feedFoto.png" alt="Img da Feed"/><br/>Feed</div>
            </Link>

            <Link to="/perfilContratante">
                <div><img src="src/assets/chatFoto.png" alt="Img do Chat"/><br/>Chat</div>
            </Link>
            
            <Link to="/perfilContratante">
                <div><img src="src/assets/perfilFoto.png" alt="Img do Chat"/><br/>Perfil</div>
            </Link>
        </div>
            
            <input type="file" accept="image/*" />
            
            {/*Mudar para se adaptar a cada usuario*/}
            <p>Perfil Contratante</p>
            <p>Id: 001</p>

            <Link to="/perfilContratante">
                <div><img src="src/assets/chatFoto.png" alt="Img do Chat"/>Chat</div>
            </Link>

            <img src="src/assets/calendarioFoto.png"></img>

            <img src="src/assets/menuFoto.png"></img>

            <div></div>

            <label>
                <img src="src/assets/adicionarFoto.png" alt="Adicionar foto" />
                <input type="file" multiple hidden />
            </label>
    </>
  )
}

export default perfilContratante
