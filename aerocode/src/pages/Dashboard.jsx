import { useNavigate } from 'react-router-dom'
import { mockAeronaves } from '../data/mockData'
import styles from './Dashboard.module.css'

function StatCard({ label, value, sub, color }) {
  return (
    <div className={styles.statCard} style={{ '--accent': color }}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const total = mockAeronaves.length
  const emProd = mockAeronaves.filter(a => a.status === 'Em Produção').length
  const concluidas = mockAeronaves.filter(a => a.status === 'Concluída').length
  const pendentes = mockAeronaves.filter(a => a.status === 'Pendente').length
  const alertas = mockAeronaves.reduce((s, a) => s + a.etapasAtrasadas + a.testesReprovados, 0)

  const statusBadge = s => {
    if (s === 'Concluída') return 'badge badge-green'
    if (s === 'Em Produção') return 'badge badge-blue'
    if (s === 'Pendente') return 'badge badge-gray'
    return 'badge badge-yellow'
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Visão geral da produção — {new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/aeronaves/nova')}>
          ✈ Nova Aeronave
        </button>
      </div>

      <div className={styles.stats}>
        <StatCard label="Total de Aeronaves" value={total} color="var(--c-accent)" />
        <StatCard label="Em Produção" value={emProd} color="var(--c-accent2)" sub="ativas" />
        <StatCard label="Concluídas" value={concluidas} color="var(--c-green)" />
        <StatCard label="Pendentes" value={pendentes} color="var(--c-text3)" />
        <StatCard label="Alertas Ativos" value={alertas} color="var(--c-yellow)" sub="etapas/testes" />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Aeronaves em Produção</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/aeronaves')}>Ver todas →</button>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Código</th><th>Modelo</th><th>Tipo</th><th>Cliente</th><th>Status</th><th>Alertas</th><th></th>
              </tr>
            </thead>
            <tbody>
              {mockAeronaves.map(a => (
                <tr key={a.id} onClick={() => navigate(`/aeronaves/${a.id}`)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-accent2)', fontSize: 13 }}>{a.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--c-text)' }}>{a.modelo}</td>
                  <td><span className="badge badge-gray">{a.tipo}</span></td>
                  <td>{a.cliente}</td>
                  <td><span className={statusBadge(a.status)}>{a.status}</span></td>
                  <td>
                    {(a.etapasAtrasadas + a.testesReprovados) > 0
                      ? <span className="badge badge-red">⚠ {a.etapasAtrasadas + a.testesReprovados}</span>
                      : <span className="badge badge-green">OK</span>}
                  </td>
                  <td><span style={{ color: 'var(--c-text3)', fontSize: 12 }}>Ver →</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
