import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro";

function App() {

  return (
    <>
      <h1>Pg 1</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App