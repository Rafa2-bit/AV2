import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockAeronaves } from '../data/mockData'
import styles from './DetalheAeronave.module.css'

// ── Sub-components das abas ──────────────────────────────────────

function AbaPecas({ pecas }) {
  const [lista, setLista] = useState(pecas)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ nome: '', tipo: 'Nacional', status: 'Produção' })
  const statusBadge = s => s === 'Instalado' ? 'badge badge-green' : s === 'Produção' ? 'badge badge-yellow' : 'badge badge-blue'

  function addPeca() {
    if (!form.nome) return
    setLista(l => [...l, { id: `P${Date.now()}`, ...form }])
    setForm({ nome: '', tipo: 'Nacional', status: 'Produção' })
    setModal(false)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}>
        <button className="btn btn-primary btn-sm" onClick={() => setModal(true)}>+ Nova Peça</button>
      </div>
      <table className="tbl">
        <thead><tr><th>ID</th><th>Nome</th><th>Tipo</th><th>Status</th></tr></thead>
        <tbody>
          {lista.length === 0 && <tr><td colSpan={4} style={{ textAlign:'center', color:'var(--c-text3)', padding:24 }}>Nenhuma peça cadastrada.</td></tr>}
          {lista.map(p => (
            <tr key={p.id}>
              <td style={{ fontFamily:'var(--f-mono)', color:'var(--c-accent2)', fontSize:12 }}>{p.id}</td>
              <td style={{ color:'var(--c-text)', fontWeight:500 }}>{p.nome}</td>
              <td><span className="badge badge-gray">{p.tipo}</span></td>
              <td><span className={statusBadge(p.status)}>{p.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Nova Peça</h3>
            <div className="form-field"><label className="form-label">Nome</label><input value={form.nome} onChange={e => setForm(f => ({...f, nome: e.target.value}))} placeholder="Ex: Motor Turbofan" /></div>
            <div className="form-field"><label className="form-label">Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f => ({...f, tipo: e.target.value}))}>
                <option>Nacional</option><option>Importada</option>
              </select>
            </div>
            <div className="form-field"><label className="form-label">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                <option>Produção</option><option>Transporte</option><option>Instalado</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={addPeca}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AbaEtapas({ etapas }) {
  const [lista, setLista] = useState(etapas)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ etapa: '', prazo: '', status: 'Pendente' })
  const statusBadge = s => s === 'Concluída' ? 'badge badge-green' : s === 'Atrasada' ? 'badge badge-red' : s === 'Em Andamento' ? 'badge badge-blue' : 'badge badge-gray'

  function addEtapa() {
    if (!form.etapa) return
    setLista(l => [...l, { id: `E${Date.now()}`, ...form }])
    setForm({ etapa: '', prazo: '', status: 'Pendente' })
    setModal(false)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}>
        <button className="btn btn-primary btn-sm" onClick={() => setModal(true)}>+ Nova Etapa</button>
      </div>
      <table className="tbl">
        <thead><tr><th>ID</th><th>Etapa</th><th>Prazo</th><th>Status</th></tr></thead>
        <tbody>
          {lista.length === 0 && <tr><td colSpan={4} style={{ textAlign:'center', color:'var(--c-text3)', padding:24 }}>Nenhuma etapa cadastrada.</td></tr>}
          {lista.map(e => (
            <tr key={e.id}>
              <td style={{ fontFamily:'var(--f-mono)', color:'var(--c-accent2)', fontSize:12 }}>{e.id}</td>
              <td style={{ color:'var(--c-text)', fontWeight:500 }}>{e.etapa}</td>
              <td style={{ fontFamily:'var(--f-mono)', fontSize:12 }}>{e.prazo}</td>
              <td><span className={statusBadge(e.status)}>{e.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Nova Etapa</h3>
            <div className="form-field"><label className="form-label">Nome da Etapa</label><input value={form.etapa} onChange={e => setForm(f => ({...f, etapa: e.target.value}))} placeholder="Ex: Instalação de Motores" /></div>
            <div className="form-field"><label className="form-label">Prazo (dias)</label><input value={form.prazo} onChange={e => setForm(f => ({...f, prazo: e.target.value}))} placeholder="Ex: 15 dias" /></div>
            <div className="form-field"><label className="form-label">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                <option>Pendente</option><option>Em Andamento</option><option>Concluída</option><option>Atrasada</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={addEtapa}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AbaTestes({ testes }) {
  const [lista, setLista] = useState(testes)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ tipo: '', resultado: 'Aprovado' })
  const resBadge = r => r === 'Aprovado' ? 'badge badge-green' : 'badge badge-red'

  function addTeste() {
    if (!form.tipo) return
    setLista(l => [...l, { id: `T${Date.now()}`, ...form }])
    setForm({ tipo: '', resultado: 'Aprovado' })
    setModal(false)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}>
        <button className="btn btn-primary btn-sm" onClick={() => setModal(true)}>+ Novo Teste</button>
      </div>
      <table className="tbl">
        <thead><tr><th>ID</th><th>Tipo de Teste</th><th>Resultado</th></tr></thead>
        <tbody>
          {lista.length === 0 && <tr><td colSpan={3} style={{ textAlign:'center', color:'var(--c-text3)', padding:24 }}>Nenhum teste registrado.</td></tr>}
          {lista.map(t => (
            <tr key={t.id}>
              <td style={{ fontFamily:'var(--f-mono)', color:'var(--c-accent2)', fontSize:12 }}>{t.id}</td>
              <td style={{ color:'var(--c-text)', fontWeight:500 }}>{t.tipo}</td>
              <td><span className={resBadge(t.resultado)}>{t.resultado}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Novo Teste</h3>
            <div className="form-field"><label className="form-label">Tipo de Teste</label><input value={form.tipo} onChange={e => setForm(f => ({...f, tipo: e.target.value}))} placeholder="Ex: Aerodinâmico" /></div>
            <div className="form-field"><label className="form-label">Resultado</label>
              <select value={form.resultado} onChange={e => setForm(f => ({...f, resultado: e.target.value}))}>
                <option>Aprovado</option><option>Reprovado</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={addTeste}>Registrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AbaRelatorio({ aeronave }) {
  const etapasConcluidas = aeronave.etapas.filter(e => e.status === 'Concluída')
  const etapasPendentes = aeronave.etapas.filter(e => e.status !== 'Concluída')
  const testesAprovados = aeronave.testes.filter(t => t.resultado === 'Aprovado')

  return (
    <div className={styles.relatorio}>
      <div className={styles.relBlock}>
        <h4 className={styles.relBlockTitle}>Etapas Concluídas ({etapasConcluidas.length})</h4>
        {etapasConcluidas.length === 0 ? <p style={{color:'var(--c-text3)'}}>Nenhuma etapa concluída.</p>
          : etapasConcluidas.map(e => <div key={e.id} className={styles.relItem}><span className="badge badge-green">{e.etapa}</span></div>)}
      </div>
      <div className={styles.relBlock}>
        <h4 className={styles.relBlockTitle}>Etapas Pendentes ({etapasPendentes.length})</h4>
        {etapasPendentes.length === 0 ? <p style={{color:'var(--c-text3)'}}>Nenhuma pendência.</p>
          : etapasPendentes.map(e => <div key={e.id} className={styles.relItem}><span className="badge badge-yellow">{e.etapa}</span> <span style={{color:'var(--c-text3)',fontSize:11}}>{e.status}</span></div>)}
      </div>
      <div className={styles.relBlock}>
        <h4 className={styles.relBlockTitle}>Peças ({aeronave.pecas.length})</h4>
        {aeronave.pecas.map(p => <div key={p.id} className={styles.relItem}><span style={{color:'var(--c-text2)'}}>{p.nome}</span> <span className="badge badge-gray">{p.status}</span></div>)}
      </div>
      <div className={styles.relBlock}>
        <h4 className={styles.relBlockTitle}>Testes Realizados ({aeronave.testes.length}) — {testesAprovados.length} aprovados</h4>
        {aeronave.testes.map(t => <div key={t.id} className={styles.relItem}><span style={{color:'var(--c-text2)'}}>{t.tipo}</span> <span className={t.resultado === 'Aprovado' ? 'badge badge-green' : 'badge badge-red'}>{t.resultado}</span></div>)}
      </div>
      <div style={{ marginTop: 20 }}>
        <button className="btn btn-primary" onClick={() => window.print()}>⬇ Gerar PDF</button>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────
const ABAS = ['Peças', 'Etapas', 'Testes', 'Relatório']

export default function DetalheAeronave() {
  const { id } = useParams()
  const navigate = useNavigate()
  const aeronave = mockAeronaves.find(a => a.id === id)
  const [abaAtiva, setAbaAtiva] = useState('Peças')

  if (!aeronave) return (
    <div style={{ padding: '120px 32px', textAlign: 'center', color: 'var(--c-text3)' }}>
      <p>Aeronave não encontrada.</p>
      <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate('/aeronaves')}>← Voltar</button>
    </div>
  )

  const statusBadge = s => {
    if (s === 'Concluída') return 'badge badge-green'
    if (s === 'Em Produção') return 'badge badge-blue'
    if (s === 'Pendente') return 'badge badge-gray'
    return 'badge badge-yellow'
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate('/aeronaves')} className={styles.breadLink}>Aeronaves</span>
        <span className={styles.breadSep}>›</span>
        <span>{aeronave.id} — {aeronave.modelo}</span>
      </div>

      <div className={styles.header}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
            <h1 className={styles.title}>
              <span className={styles.titleId}>{aeronave.id}</span> — {aeronave.modelo}
            </h1>
            <span className={statusBadge(aeronave.status)}>{aeronave.status}</span>
          </div>
          <p className={styles.subtitle}>{aeronave.tipo} · Cliente: {aeronave.cliente}</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/aeronaves')}>← Voltar</button>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Tipo de Aeronave</div>
          <div className={styles.infoValue}>{aeronave.tipo}</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Capacidade</div>
          <div className={styles.infoValue}>{aeronave.capacidade} <span className={styles.infoUnit}>pax</span></div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Alcance</div>
          <div className={styles.infoValue}>{aeronave.alcance.toLocaleString()} <span className={styles.infoUnit}>km</span></div>
        </div>
        <div className={styles.infoCard} style={{ borderColor: aeronave.etapasAtrasadas > 0 ? 'var(--c-red)' : 'var(--c-border)' }}>
          <div className={styles.infoLabel}>Etapas Atrasadas</div>
          <div className={styles.infoValue} style={{ color: aeronave.etapasAtrasadas > 0 ? 'var(--c-red)' : 'var(--c-green)' }}>{aeronave.etapasAtrasadas}</div>
        </div>
        <div className={styles.infoCard} style={{ borderColor: aeronave.testesReprovados > 0 ? 'var(--c-yellow)' : 'var(--c-border)' }}>
          <div className={styles.infoLabel}>Testes Reprovados</div>
          <div className={styles.infoValue} style={{ color: aeronave.testesReprovados > 0 ? 'var(--c-yellow)' : 'var(--c-green)' }}>{aeronave.testesReprovados}</div>
        </div>
        <div className={styles.infoCard} style={{ borderColor: aeronave.pecasAtraso > 0 ? 'var(--c-yellow)' : 'var(--c-border)' }}>
          <div className={styles.infoLabel}>Peças em Atraso</div>
          <div className={styles.infoValue} style={{ color: aeronave.pecasAtraso > 0 ? 'var(--c-yellow)' : 'var(--c-green)' }}>{aeronave.pecasAtraso}</div>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {ABAS.map(a => (
            <button key={a} className={abaAtiva === a ? `${styles.tab} ${styles.tabActive}` : styles.tab} onClick={() => setAbaAtiva(a)}>
              {a}
            </button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {abaAtiva === 'Peças'     && <AbaPecas pecas={aeronave.pecas} />}
          {abaAtiva === 'Etapas'    && <AbaEtapas etapas={aeronave.etapas} />}
          {abaAtiva === 'Testes'    && <AbaTestes testes={aeronave.testes} />}
          {abaAtiva === 'Relatório' && <AbaRelatorio aeronave={aeronave} />}
        </div>
      </div>
    </div>
  )
}
