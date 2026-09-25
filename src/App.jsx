import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import PerfilContratante from './pages/perfilContratante';
import PerfilPrestador from './pages/perfilPrestador';
import FeedContratante from './pages/feedContratante';
import FeedPrestador from './pages/feedPrestador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" replace />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfilContratante" element={<PerfilContratante />} />
        <Route path="/perfilPrestador" element={<PerfilPrestador />} />
        <Route path="/feedContratante" element={<FeedContratante />} />
        <Route path="/feedPrestador" element={<FeedPrestador />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App