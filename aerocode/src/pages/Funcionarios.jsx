import { useState } from 'react'
import { mockFuncionarios } from '../data/mockData'
import styles from './Funcionarios.module.css'

const PERMS = ['Engenheiro', 'Administrador', 'Técnico']

export default function Funcionarios() {
  const [lista, setLista] = useState(mockFuncionarios)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nome:'', permissao:'Engenheiro', email:'' })
  const f = field => e => setForm(v => ({...v, [field]: e.target.value}))
  const permBadge = p => p === 'Administrador' ? 'badge badge-red' : p === 'Técnico' ? 'badge badge-yellow' : 'badge badge-blue'

  function abrir(func = null) {
    setEditando(func)
    setForm(func ? { nome: func.nome, permissao: func.permissao, email: func.email } : { nome:'', permissao:'Engenheiro', email:'' })
    setModal(true)
  }
  function salvar() {
    if (!form.nome) return
    if (editando) {
      setLista(l => l.map(f => f.id === editando.id ? {...f, ...form} : f))
    } else {
      setLista(l => [...l, { id: String(l.length + 1).padStart(2,'0'), ...form }])
    }
    setModal(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Funcionários</h1>
          <p className={styles.subtitle}>{lista.length} funcionários cadastrados</p>
        </div>
        <button className="btn btn-primary" onClick={() => abrir()}>+ Novo Funcionário</button>
      </div>
      <div className="card" style={{ padding: 0, overflow:'hidden' }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Permissão</th><th>Ações</th></tr></thead>
          <tbody>
            {lista.map(func => (
              <tr key={func.id}>
                <td style={{ fontFamily:'var(--f-mono)', color:'var(--c-accent2)', fontSize:12 }}>{func.id}</td>
                <td style={{ color:'var(--c-text)', fontWeight:500 }}>{func.nome}</td>
                <td style={{ fontFamily:'var(--f-mono)', fontSize:12 }}>{func.email}</td>
                <td><span className={permBadge(func.permissao)}>{func.permissao}</span></td>
                <td><button className="btn btn-secondary btn-sm" onClick={() => abrir(func)}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{editando ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
            <div className="form-field"><label className="form-label">Nome</label><input value={form.nome} onChange={f('nome')} placeholder="Nome completo" /></div>
            <div className="form-field"><label className="form-label">E-mail</label><input value={form.email} onChange={f('email')} placeholder="nome@aerocode.com" /></div>
            <div className="form-field"><label className="form-label">Permissão</label>
              <select value={form.permissao} onChange={f('permissao')}>
                {PERMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
