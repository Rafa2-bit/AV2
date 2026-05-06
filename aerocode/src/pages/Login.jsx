import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    if (!user || !pass) { setErr('Preencha usuário e senha.'); return }
    if (pass.length < 3) { setErr('Senha inválida.'); return }
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.bgGlow} />
        <div className={styles.bgGrid} />
      </div>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>✈</span>
          <h1 className={styles.brandName}>AEROCODE</h1>
          <p className={styles.brandSub}>Sistema de Gestão da Produção de Aeronaves</p>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-field">
            <label className="form-label">Usuário</label>
            <input value={user} onChange={e => setUser(e.target.value)} placeholder="seu.usuario" autoComplete="username" />
          </div>
          <div className="form-field">
            <label className="form-label">Senha</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </div>
          {err && <p className={styles.err}>{err}</p>}
          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
            Acessar Sistema
          </button>
        </form>
        <p className={styles.hint}>Use qualquer usuário e senha (mín. 3 caracteres)</p>
      </div>
    </div>
  )
}
