import { useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './Dashboard.module.css'

function StatCard({ label, value, sub, color }) {
  return (
    <div className={styles.statCard} style={{'--accent':color}}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {sub&&<div className={styles.statSub}>{sub}</div>}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { aeronaves, usuarioLogado, pode } = useApp()
  const total = aeronaves.length
  const emProd = aeronaves.filter(a=>a.status==='Em Produção').length
  const concluidas = aeronaves.filter(a=>a.status==='Concluída').length
  const pendentes = aeronaves.filter(a=>a.status==='Pendente').length
  const alertas = aeronaves.reduce((s,a)=>s+a.etapas.filter(e=>e.status==='Atrasada').length+a.testes.filter(t=>t.resultado==='Reprovado').length,0)

  const statusBadge = s => s==='Concluída'?'badge badge-green':s==='Em Produção'?'badge badge-blue':s==='Pendente'?'badge badge-gray':'badge badge-yellow'

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Bem-vindo, <b style={{color:'var(--c-accent2)'}}>{usuarioLogado?.funcionario?.nome?.split(' ')[0]}</b>
            {' '}·{' '}
            {new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
          </p>
        </div>
        {pode('criar')&&<button className="btn btn-primary" onClick={()=>navigate('/aeronaves/nova')}>✈ Nova Aeronave</button>}
      </div>

      <div className={styles.stats}>
        <StatCard label="Total de Aeronaves" value={total} color="var(--c-accent)"/>
        <StatCard label="Em Produção" value={emProd} sub="ativas" color="var(--c-accent2)"/>
        <StatCard label="Concluídas" value={concluidas} color="var(--c-green)"/>
        <StatCard label="Pendentes" value={pendentes} color="var(--c-text3)"/>
        <StatCard label="Alertas Ativos" value={alertas} sub="testes/etapas" color="var(--c-yellow)"/>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Aeronaves</h2>
          <button className="btn btn-secondary btn-sm" onClick={()=>navigate('/aeronaves')}>Ver todas →</button>
        </div>
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="tbl">
            <thead><tr><th>Código</th><th>Modelo</th><th>Tipo</th><th>Cliente</th><th>Status</th><th>Etapas</th><th></th></tr></thead>
            <tbody>
              {aeronaves.map(a=>{
                const conc = a.etapas.filter(e=>e.status==='Concluída').length
                return(
                <tr key={a.id} onClick={()=>navigate(`/aeronaves/${a.id}`)} style={{cursor:'pointer'}}>
                  <td style={{fontFamily:'var(--f-mono)',color:'var(--c-accent2)',fontSize:13}}>{a.id}</td>
                  <td style={{fontWeight:600,color:'var(--c-text)'}}>{a.modelo}</td>
                  <td><span className="badge badge-gray">{a.tipo}</span></td>
                  <td>{a.cliente}</td>
                  <td><span className={statusBadge(a.status)}>{a.status}</span></td>
                  <td style={{fontFamily:'var(--f-mono)',fontSize:12}}>{conc}/{a.etapas.length}</td>
                  <td><span style={{color:'var(--c-text3)',fontSize:12}}>Ver →</span></td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
