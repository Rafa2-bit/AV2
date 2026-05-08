import { useState } from 'react'
import { useApp } from '../data/AppContext'
import styles from './Funcionarios.module.css'

const NIVEIS = ['administrador','engenheiro','operador']
const nivelBadge = n => n==='administrador'?'badge badge-red':n==='engenheiro'?'badge badge-blue':'badge badge-gray'

export default function Funcionarios() {
  const { funcionarios, addFuncionario, editarFuncionario, usuarioLogado } = useApp()
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nome:'', telefone:'', endereco:'', nivel:'operador', login:'', senha:'' })
  const f = field => e => setForm(v=>({...v,[field]:e.target.value}))

  const isAdmin = usuarioLogado?.nivel === 'administrador'
  const meuId   = usuarioLogado?.funcionarioId

  function podeEditar(func) {
    if (isAdmin) return true
    return func.id === meuId
  }

  function abrir(func) {
    setEditando(func)
    setForm({
      nome:      func.nome,
      telefone:  func.telefone,
      endereco:  func.endereco,
      nivel:     func.nivel,
      login:     func.login,
      senha:     '',
    })
    setModal(true)
  }

  function abrirNovo() {
    setEditando(null)
    setForm({ nome:'', telefone:'', endereco:'', nivel:'operador', login:'', senha:'' })
    setModal(true)
  }

  function salvar() {
    if (!form.nome || !form.login) return

    if (editando) {
      const dadosFinais = isAdmin
        ? form
        : { ...form, nivel: editando.nivel }  
      editarFuncionario(editando.id, dadosFinais)
    } else {
      if (!form.senha) return
      addFuncionario(form)
    }
    setModal(false)
  }


  const camposBloqueados = !isAdmin 

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Funcionários</h1>
          <p className={styles.subtitle}>{funcionarios.length} funcionários cadastrados</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={abrirNovo}>+ Novo Funcionário</button>
        )}
      </div>

      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th><th>Nome</th><th>Telefone</th><th>Endereço</th>
              <th>Login</th><th>Nível</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map(func => (
              <tr key={func.id}>
                <td style={{fontFamily:'var(--f-mono)',color:'var(--c-accent2)',fontSize:12}}>{func.id}</td>
                <td style={{color:'var(--c-text)',fontWeight:500}}>
                  {func.id === meuId && <span style={{color:'var(--c-accent2)',fontSize:10,marginRight:6}}>▶ Você</span>}
                  {func.nome}
                </td>
                <td style={{fontFamily:'var(--f-mono)',fontSize:12}}>{func.telefone}</td>
                <td style={{fontSize:12,color:'var(--c-text3)'}}>{func.endereco}</td>
                <td style={{fontFamily:'var(--f-mono)',fontSize:12,color:'var(--c-accent2)'}}>{func.login}</td>
                <td><span className={nivelBadge(func.nivel)}>{func.nivel}</span></td>
                <td>
                  {podeEditar(func)
                    ? <button className="btn btn-secondary btn-sm" onClick={() => abrir(func)}>
                        {func.id === meuId && !isAdmin ? 'Meu perfil' : 'Editar'}
                      </button>
                    : <span style={{color:'var(--c-text3)',fontSize:11}}>—</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">
              {editando
                ? (editando.id === meuId && !isAdmin ? 'Meu perfil' : `Editar — ${editando.nome}`)
                : 'Novo Funcionário'}
            </h3>

          
            {!isAdmin && editando && (
              <div style={{
                background:'var(--c-surface2)', border:'1px solid var(--c-border)',
                borderRadius:'var(--radius)', padding:'10px 12px',
                fontSize:11, color:'var(--c-text3)', marginBottom:14
              }}>
                Você pode editar seus dados pessoais. Nível de acesso e login só podem ser alterados por um administrador.
              </div>
            )}

            <div className="form-field">
              <label className="form-label">Nome completo</label>
              <input value={form.nome} onChange={f('nome')} placeholder="Nome completo"/>
            </div>
            <div style={{display:'flex',gap:14}}>
              <div className="form-field" style={{flex:1}}>
                <label className="form-label">Telefone</label>
                <input value={form.telefone} onChange={f('telefone')} placeholder="(11) 99999-0000"/>
              </div>
              <div className="form-field" style={{flex:1}}>
                <label className="form-label">Nível de acesso</label>
                <select
                  value={form.nivel}
                  onChange={f('nivel')}
                  disabled={camposBloqueados}
                  style={camposBloqueados ? {opacity:0.5,cursor:'not-allowed'} : {}}
                >
                  {NIVEIS.map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Endereço</label>
              <input value={form.endereco} onChange={f('endereco')} placeholder="Rua, Número — Cidade/UF"/>
            </div>
            <div style={{display:'flex',gap:14}}>
              <div className="form-field" style={{flex:1}}>
                <label className="form-label">Login</label>
                <input
                  value={form.login}
                  onChange={f('login')}
                  placeholder="login.usuario"
                  disabled={camposBloqueados && !!editando}
                  style={camposBloqueados && editando ? {opacity:0.5,cursor:'not-allowed'} : {}}
                />
              </div>
              <div className="form-field" style={{flex:1}}>
                <label className="form-label">{editando ? 'Nova senha (opcional)' : 'Senha'}</label>
                <input type="password" value={form.senha} onChange={f('senha')} placeholder="••••••"/>
              </div>
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
