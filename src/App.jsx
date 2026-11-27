
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Cadastro from "./pages/cadastro";
import PerfilContratante from './pages/perfilContratante';
import PerfilPrestador from './pages/perfilPrestador';
import FeedContratante from './pages/feedContratante';
import FeedPrestador from './pages/feedPrestador';

import Login from './pages/login';
import Cursos from './pages/cursos';

import Calendario from './pages/calendario';
import Folgas from "./pages/folgas";
import Agendamentos from './pages/agendamentos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        <Route path="/perfilContratante" element={<PerfilContratante />} />
        <Route path="/perfilPrestador" element={<PerfilPrestador />} />

        <Route path="/feedContratante" element={<FeedContratante />} />
        <Route path="/feedPrestador" element={<FeedPrestador />} />

        {/* HEAD */}
        <Route path="/cursos" element={<Cursos />} />

        {/* calendario */}
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/folgas" element={<Folgas />} />

        {/* ROTA DOS AGENDAMENTOS */}
        <Route
          path="/calendario/:data"
          element={<Agendamentos />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;