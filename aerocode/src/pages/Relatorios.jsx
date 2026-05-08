import { useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './Relatorios.module.css'

export default function Relatorios() {
  const navigate = useNavigate()
  const { aeronaves, funcionarios } = useApp()
  const totalEtapas = aeronaves.reduce((s,a)=>s+a.etapas.length,0)
  const etapasConcluidas = aeronaves.reduce((s,a)=>s+a.etapas.filter(e=>e.status==='Concluída').length,0)
  const totalTestes = aeronaves.reduce((s,a)=>s+a.testes.length,0)
  const testesAprovados = aeronaves.reduce((s,a)=>s+a.testes.filter(t=>t.resultado==='Aprovado').length,0)
  const totalPecas = aeronaves.reduce((s,a)=>s+a.pecas.length,0)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div><h1 className={styles.title}>Relatórios</h1><p className={styles.subtitle}>Visão consolidada da produção</p></div>
      </div>

      <div className={styles.statsRow}>
        {[
          {label:'Total de Etapas',value:totalEtapas,sub:`${etapasConcluidas} concluídas`,color:'var(--c-accent)'},
          {label:'Taxa de Conclusão',value:totalEtapas>0?`${Math.round((etapasConcluidas/totalEtapas)*100)}%`:'—',sub:'das etapas',color:'var(--c-green)'},
          {label:'Testes Realizados',value:totalTestes,sub:`${testesAprovados} aprovados`,color:'var(--c-accent2)'},
          {label:'Taxa de Aprovação',value:totalTestes>0?`${Math.round((testesAprovados/totalTestes)*100)}%`:'—',sub:'dos testes',color:'var(--c-yellow)'},
          {label:'Total de Peças',value:totalPecas,sub:'em gestão',color:'var(--c-text2)'},
        ].map(s=>(
          <div key={s.label} className={styles.statCard} style={{'--col':s.color}}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statSub}>{s.sub}</div>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Relatório por Aeronave</h2>
      <div className={styles.cards}>
        {aeronaves.map(a=>{
          const conc = a.etapas.filter(e=>e.status==='Concluída').length
          const pct = a.etapas.length>0?Math.round((conc/a.etapas.length)*100):0
          const statusBadge = s=>s==='Concluída'?'badge badge-green':s==='Em Produção'?'badge badge-blue':s==='Pendente'?'badge badge-gray':'badge badge-yellow'
          const testesRep = a.testes.filter(t=>t.resultado==='Reprovado').length
          return(
            <div key={a.id} className={styles.aeronaveCard} onClick={()=>navigate(`/aeronaves/${a.id}`)}>
              <div className={styles.cardTop}>
                <div><span className={styles.cardId}>{a.id}</span><span className={styles.cardModelo}>{a.modelo}</span></div>
                <span className={statusBadge(a.status)}>{a.status}</span>
              </div>
              <div className={styles.cardCliente}>{a.cliente} · {a.tipo} · Entrega: {a.dataEntrega||'A definir'}</div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{width:`${pct}%`}}/></div>
              <div className={styles.cardStats}>
                <span>{pct}% concluído</span>
                <span>{a.etapas.length} etapas</span>
                <span>{a.testes.length} testes</span>
                <span>{a.pecas.length} peças</span>
              </div>
              {testesRep>0&&<div className={styles.alertas}><span className="badge badge-red">⚠ {testesRep} testes reprovados</span></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
