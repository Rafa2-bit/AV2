import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './Navbar.module.css'

const NAV = [
  { to: '/dashboard',   label: 'Dashboard',    icon: '⬡' },
  { to: '/aeronaves',   label: 'Aeronaves',    icon: '✈' },
  { to: '/funcionarios',label: 'Funcionários', icon: '◈' },
  { to: '/relatorios',  label: 'Relatórios',   icon: '▣' },
]

const nivelLabel = { administrador: 'Admin', engenheiro: 'Eng.', operador: 'Op.' }
const nivelColor = { administrador: 'badge-red', engenheiro: 'badge-blue', operador: 'badge-gray' }

export default function Navbar() {
  const navigate = useNavigate()
  const { usuarioLogado, logout } = useApp()

  function handleLogout() { logout(); navigate('/') }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate('/dashboard')}>
        <span className={styles.logoIcon}>✈</span>
        <span className={styles.logoText}>AEROCODE</span>
      </div>
      <ul className={styles.links}>
        {NAV.map(n => (
          <li key={n.to}>
            <NavLink to={n.to} className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              <span className={styles.linkIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {usuarioLogado && (
        <div className={styles.user}>
          <span className={styles.userName}>{usuarioLogado.funcionario?.nome?.split(' ')[0]}</span>
          <span className={`badge ${nivelColor[usuarioLogado.nivel]}`}>{nivelLabel[usuarioLogado.nivel]}</span>
        </div>
      )}
      <button className={styles.logout} onClick={handleLogout}>⏻ Sair</button>
    </nav>
  )
}
