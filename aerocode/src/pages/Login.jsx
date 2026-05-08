import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './Login.module.css'

export default function Login() {
  const [loginVal, setLoginVal] = useState('')
  const [senhaVal, setSenhaVal] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const { login } = useApp()

  function handleLogin(e) {
    e.preventDefault()
    setErr('')
    const ok = login(loginVal.trim(), senhaVal)
    if (!ok) { setErr('Usuário ou senha inválidos.'); return }
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg}><div className={styles.bgGlow}/><div className={styles.bgGrid}/></div>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>✈</span>
          <h1 className={styles.brandName}>AEROCODE</h1>
          <p className={styles.brandSub}>Sistema de Gestão da Produção de Aeronaves</p>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-field">
            <label className="form-label">Login</label>
            <input value={loginVal} onChange={e=>setLoginVal(e.target.value)} placeholder="seu.login" autoComplete="username"/>
          </div>
          <div className="form-field">
            <label className="form-label">Senha</label>
            <input type="password" value={senhaVal} onChange={e=>setSenhaVal(e.target.value)} placeholder="••••••••" autoComplete="current-password"/>
          </div>
          {err && <p className={styles.err}>{err}</p>}
          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>Acessar Sistema</button>
        </form>
        <div className={styles.hint}>
          <p>Usuários de demonstração:</p>
          <p><b>admin</b> / 1234 — Administrador</p>
          <p><b>joao</b> / 1234 — Engenheiro</p>
          <p><b>maria</b> / 1234 — Operador</p>
        </div>
      </div>
    </div>
  )
}
