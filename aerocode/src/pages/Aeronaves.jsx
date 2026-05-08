import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './Aeronaves.module.css'

const statusBadge = s => {
  if (s === 'Concluída') return 'badge badge-green'
  if (s === 'Em Produção') return 'badge badge-blue'
  if (s === 'Pendente') return 'badge badge-gray'
  return 'badge badge-yellow'
}

export default function Aeronaves() {
  const navigate = useNavigate()
  const { aeronaves: mockAeronaves } = useApp()
  const [search, setSearch] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('TODOS')

  const tipos = ['TODOS', ...new Set(mockAeronaves.map(a => a.tipo))]
  const lista = mockAeronaves.filter(a => {
    const matchSearch = a.modelo.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.cliente.toLowerCase().includes(search.toLowerCase())
    const matchTipo = filtroTipo === 'TODOS' || a.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Aeronaves</h1>
          <p className={styles.subtitle}>{mockAeronaves.length} aeronaves cadastradas</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/aeronaves/nova')}>✈ Nova Aeronave</button>
      </div>

      <div className={styles.filters}>
        <input
          placeholder="Buscar por código, modelo ou cliente..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 340 }}
        />
        <div className={styles.tipoFilters}>
          {tipos.map(t => (
            <button key={t}
              className={filtroTipo === t ? `${styles.tipoBtn} ${styles.tipoBtnActive}` : styles.tipoBtn}
              onClick={() => setFiltroTipo(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="tbl">
          <thead>
            <tr><th>Código</th><th>Modelo</th><th>Tipo</th><th>Cliente</th><th>Capacidade</th><th>Alcance</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {lista.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--c-text3)', padding: 32 }}>Nenhuma aeronave encontrada.</td></tr>
            )}
            {lista.map(a => (
              <tr key={a.id}>
                <td style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-accent2)' }}>{a.id}</td>
                <td style={{ fontWeight: 600, color: 'var(--c-text)' }}>{a.modelo}</td>
                <td><span className="badge badge-gray">{a.tipo}</span></td>
                <td>{a.cliente}</td>
                <td>{a.capacidade} pax</td>
                <td>{a.alcance.toLocaleString()} km</td>
                <td><span className={statusBadge(a.status)}>{a.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/aeronaves/${a.id}`)}>Ver</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/aeronaves/${a.id}/editar`)}>Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
