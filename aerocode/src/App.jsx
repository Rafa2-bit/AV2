import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Aeronaves from './pages/Aeronaves'
import DetalheAeronave from './pages/DetalheAeronave'
import NovaAeronave from './pages/NovaAeronave'
import Funcionarios from './pages/Funcionarios'
import Relatorios from './pages/Relatorios'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/aeronaves" element={<Layout><Aeronaves /></Layout>} />
      <Route path="/aeronaves/nova" element={<Layout><NovaAeronave /></Layout>} />
      <Route path="/aeronaves/:id" element={<Layout><DetalheAeronave /></Layout>} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/funcionarios" element={<Layout><Funcionarios /></Layout>} />
      <Route path="/relatorios" element={<Layout><Relatorios /></Layout>} />
    </Routes>
  )
}
