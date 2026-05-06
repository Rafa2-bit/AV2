import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { to: '/aeronaves', label: 'Aeronaves', icon: '✈' },
  { to: '/funcionarios', label: 'Funcionários', icon: '◈' },
  { to: '/relatorios', label: 'Relatórios', icon: '▣' },
]

export default function Navbar() {
  const navigate = useNavigate()
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
      <button className={styles.logout} onClick={() => navigate('/')}>
        ⏻ Sair
      </button>
    </nav>
  )
}
