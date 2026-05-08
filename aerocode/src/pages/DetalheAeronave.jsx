import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './DetalheAeronave.module.css'

const TIPOS_TESTE = ['Elétrico', 'Hidráulico', 'Aerodinâmico']
const STATUS_PECA = ['Em produção', 'Em transporte', 'Pronto para uso']

// ── AbaPeças ────────────────────────────────────────────────────
function AbaPecas({ aeronave }) {
  const { addPeca, atualizarStatusPeca, pode } = useApp()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ nome:'', tipo:'Nacional', fornecedor:'', status:'Em produção' })
  const f = field => e => setForm(v=>({...v,[field]:e.target.value}))

  function salvar() {
    if (!form.nome || !form.fornecedor) return
    addPeca(aeronave.id, form)
    setForm({ nome:'', tipo:'Nacional', fornecedor:'', status:'Em produção' })
    setModal(false)
  }

  const statusBadge = s => s==='Pronto para uso'?'badge badge-green':s==='Em transporte'?'badge badge-blue':'badge badge-yellow'

  return (
    <div>
      {pode('criar') && (
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
          <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Nova Peça</button>
        </div>
      )}
      <table className="tbl">
        <thead><tr><th>ID</th><th>Nome</th><th>Tipo</th><th>Fornecedor</th><th>Status</th>{pode('editar')&&<th>Atualizar Status</th>}</tr></thead>
        <tbody>
          {aeronave.pecas.length===0&&<tr><td colSpan={6} style={{textAlign:'center',color:'var(--c-text3)',padding:24}}>Nenhuma peça cadastrada.</td></tr>}
          {aeronave.pecas.map(p=>(
            <tr key={p.id}>
              <td style={{fontFamily:'var(--f-mono)',color:'var(--c-accent2)',fontSize:12}}>{p.id}</td>
              <td style={{color:'var(--c-text)',fontWeight:500}}>{p.nome}</td>
              <td><span className="badge badge-gray">{p.tipo}</span></td>
              <td style={{fontSize:12}}>{p.fornecedor}</td>
              <td><span className={statusBadge(p.status)}>{p.status}</span></td>
              {pode('editar')&&(
                <td>
                  <select style={{fontSize:11,padding:'3px 6px',width:'auto'}} value={p.status}
                    onChange={e=>atualizarStatusPeca(aeronave.id,p.id,e.target.value)}>
                    {STATUS_PECA.map(s=><option key={s}>{s}</option>)}
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {modal&&(
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3 className="modal-title">Nova Peça</h3>
            <div className="form-field"><label className="form-label">Nome</label><input value={form.nome} onChange={f('nome')} placeholder="Ex: Motor Turbofan"/></div>
            <div className="form-field"><label className="form-label">Tipo</label>
              <select value={form.tipo} onChange={f('tipo')}><option>Nacional</option><option>Importada</option></select></div>
            <div className="form-field"><label className="form-label">Fornecedor</label><input value={form.fornecedor} onChange={f('fornecedor')} placeholder="Ex: Rolls-Royce plc"/></div>
            <div className="form-field"><label className="form-label">Status inicial</label>
              <select value={form.status} onChange={f('status')}>{STATUS_PECA.map(s=><option key={s}>{s}</option>)}</select></div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={()=>setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── AbaEtapas ────────────────────────────────────────────────────
function AbaEtapas({ aeronave }) {
  const { addEtapa, iniciarEtapa, concluirEtapa, addResponsavel, removerResponsavel, funcionarios, pode } = useApp()
  const [modal, setModal] = useState(false)
  const [modalResp, setModalResp] = useState(null)
  const [form, setForm] = useState({ nome:'', prazo:'' })
  const f = field => e => setForm(v=>({...v,[field]:e.target.value}))

  const statusBadge = s => s==='Concluída'?'badge badge-green':s==='Em andamento'?'badge badge-blue':s==='Atrasada'?'badge badge-red':'badge badge-gray'

  function podeConcluir(etapa) {
    if (etapa.status!=='Em andamento') return false
    if (etapa.ordem>1) {
      const anterior = aeronave.etapas.find(e=>e.ordem===etapa.ordem-1)
      if (anterior&&anterior.status!=='Concluída') return false
    }
    return true
  }
  function podeIniciar(etapa) {
    if (etapa.status!=='Pendente') return false
    if (etapa.ordem>1) {
      const anterior = aeronave.etapas.find(e=>e.ordem===etapa.ordem-1)
      if (anterior&&anterior.status!=='Concluída') return false
    }
    return true
  }

  function salvar() {
    if (!form.nome) return
    addEtapa(aeronave.id, form)
    setForm({ nome:'', prazo:'' })
    setModal(false)
  }

  return (
    <div>
      {pode('criar')&&(
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
          <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Nova Etapa</button>
        </div>
      )}
      <table className="tbl">
        <thead><tr><th>Ordem</th><th>Etapa</th><th>Prazo</th><th>Status</th><th>Responsáveis</th>{pode('editar')&&<th>Ações</th>}</tr></thead>
        <tbody>
          {aeronave.etapas.sort((a,b)=>a.ordem-b.ordem).map(etapa=>{
            const resps = etapa.responsaveis.map(rid=>funcionarios.find(f=>f.id===rid)).filter(Boolean)
            return(
            <tr key={etapa.id}>
              <td style={{fontFamily:'var(--f-mono)',color:'var(--c-text3)',textAlign:'center'}}>{etapa.ordem}</td>
              <td style={{color:'var(--c-text)',fontWeight:500}}>{etapa.nome}</td>
              <td style={{fontFamily:'var(--f-mono)',fontSize:12}}>{etapa.prazo}</td>
              <td><span className={statusBadge(etapa.status)}>{etapa.status}</span></td>
              <td>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {resps.map(r=><span key={r.id} className="badge badge-gray" style={{fontSize:10}}>{r.nome.split(' ')[0]}</span>)}
                  {resps.length===0&&<span style={{color:'var(--c-text3)',fontSize:11}}>Nenhum</span>}
                  {pode('editar')&&<button className="btn btn-secondary btn-sm" style={{fontSize:10,padding:'2px 7px'}} onClick={()=>setModalResp(etapa)}>+</button>}
                </div>
              </td>
              {pode('editar')&&(
                <td>
                  <div style={{display:'flex',gap:6}}>
                    {podeIniciar(etapa)&&<button className="btn btn-primary btn-sm" onClick={()=>iniciarEtapa(aeronave.id,etapa.id)}>Iniciar</button>}
                    {podeConcluir(etapa)&&<button className="btn btn-primary btn-sm" onClick={()=>concluirEtapa(aeronave.id,etapa.id)}>Concluir</button>}
                    {!podeIniciar(etapa)&&!podeConcluir(etapa)&&etapa.status!=='Concluída'&&(
                      <span style={{fontSize:11,color:'var(--c-text3)'}}>Aguardando anterior</span>
                    )}
                  </div>
                </td>
              )}
            </tr>
          )})}
        </tbody>
      </table>

      {modal&&(
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3 className="modal-title">Nova Etapa</h3>
            <div className="form-field"><label className="form-label">Nome da Etapa</label><input value={form.nome} onChange={f('nome')} placeholder="Ex: Instalação de Motores"/></div>
            <div className="form-field"><label className="form-label">Prazo</label><input value={form.prazo} onChange={f('prazo')} placeholder="Ex: 15 dias"/></div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={()=>setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar}>Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {modalResp&&(
        <div className="modal-overlay" onClick={()=>setModalResp(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3 className="modal-title">Responsáveis — {modalResp.nome}</h3>
            <div style={{maxHeight:260,overflowY:'auto'}}>
              {funcionarios.map(func=>{
                const jaDesig = modalResp.responsaveis.includes(func.id)
                return(
                  <div key={func.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--c-border)'}}>
                    <div>
                      <span style={{color:'var(--c-text)',fontWeight:500,fontSize:13}}>{func.nome}</span>
                      <span className={`badge badge-gray`} style={{marginLeft:8,fontSize:10}}>{func.nivel}</span>
                    </div>
                    {jaDesig
                      ? <button className="btn btn-danger btn-sm" onClick={()=>removerResponsavel(aeronave.id,modalResp.id,func.id)}>Remover</button>
                      : <button className="btn btn-secondary btn-sm" onClick={()=>addResponsavel(aeronave.id,modalResp.id,func.id)}>Designar</button>
                    }
                  </div>
                )
              })}
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={()=>setModalResp(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AbaTestes({ aeronave }) {
  const { addTeste, pode } = useApp()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ tipo:'Elétrico', resultado:'Aprovado' })
  const f = field => e => setForm(v=>({...v,[field]:e.target.value}))

  function salvar() {
    addTeste(aeronave.id, form)
    setModal(false)
  }

  return (
    <div>
      {pode('criar')&&(
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
          <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Novo Teste</button>
        </div>
      )}
      <table className="tbl">
        <thead><tr><th>ID</th><th>Tipo</th><th>Resultado</th></tr></thead>
        <tbody>
          {aeronave.testes.length===0&&<tr><td colSpan={3} style={{textAlign:'center',color:'var(--c-text3)',padding:24}}>Nenhum teste registrado.</td></tr>}
          {aeronave.testes.map(t=>(
            <tr key={t.id}>
              <td style={{fontFamily:'var(--f-mono)',color:'var(--c-accent2)',fontSize:12}}>{t.id}</td>
              <td style={{color:'var(--c-text)',fontWeight:500}}>{t.tipo}</td>
              <td><span className={t.resultado==='Aprovado'?'badge badge-green':'badge badge-red'}>{t.resultado}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal&&(
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3 className="modal-title">Novo Teste</h3>
            <div className="form-field"><label className="form-label">Tipo</label>
              <select value={form.tipo} onChange={f('tipo')}>{TIPOS_TESTE.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="form-field"><label className="form-label">Resultado</label>
              <select value={form.resultado} onChange={f('resultado')}><option>Aprovado</option><option>Reprovado</option></select></div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={()=>setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar}>Registrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AbaRelatorio({ aeronave }) {
  const { gerarRelatorio, pode } = useApp()
  const [gerado, setGerado] = useState(false)
  const [texto, setTexto] = useState('')

  const todasConcluidas = aeronave.etapas.length > 0 && aeronave.etapas.every(e=>e.status==='Concluída')

  function gerar() {
    const rel = gerarRelatorio(aeronave.id)
    setTexto(rel)
    setGerado(true)
  }
  function baixar() {
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio_${aeronave.id}_${aeronave.modelo}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.relatorio}>
      {!todasConcluidas&&(
        <div className={styles.aviso}>
          ⚠ O relatório final só pode ser gerado quando todas as etapas estiverem concluídas.
          {aeronave.etapas.length===0&&' Nenhuma etapa cadastrada.'}
        </div>
      )}
      {!gerado&&todasConcluidas&&pode('relatorio')&&(
        <button className="btn btn-primary" onClick={gerar}>Gerar Relatório Final</button>
      )}
      {!pode('relatorio')&&(
        <div className={styles.aviso}>Você não tem permissão para gerar relatórios.</div>
      )}
      {gerado&&(
        <>
          <pre className={styles.relPre}>{texto}</pre>
          <div style={{marginTop:14,display:'flex',gap:10}}>
            <button className="btn btn-primary" onClick={baixar}>⬇ Baixar como .txt</button>
            <button className="btn btn-secondary" onClick={()=>setGerado(false)}>Fechar</button>
          </div>
        </>
      )}
    </div>
  )
}

const ABAS = ['Peças', 'Etapas', 'Testes', 'Relatório']

export default function DetalheAeronave() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { aeronaves } = useApp()
  const [abaAtiva, setAbaAtiva] = useState('Peças')

  const aeronave = aeronaves.find(a=>a.id===id)

  if (!aeronave) return (
    <div style={{padding:'120px 32px',textAlign:'center',color:'var(--c-text3)'}}>
      <p>Aeronave não encontrada.</p>
      <button className="btn btn-secondary" style={{marginTop:16}} onClick={()=>navigate('/aeronaves')}>← Voltar</button>
    </div>
  )

  const statusBadge = s => s==='Concluída'?'badge badge-green':s==='Em Produção'?'badge badge-blue':s==='Pendente'?'badge badge-gray':'badge badge-yellow'

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <span onClick={()=>navigate('/aeronaves')} className={styles.breadLink}>Aeronaves</span>
        <span className={styles.breadSep}>›</span>
        <span>{aeronave.id} — {aeronave.modelo}</span>
      </div>
      <div className={styles.header}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
            <h1 className={styles.title}><span className={styles.titleId}>{aeronave.id}</span> — {aeronave.modelo}</h1>
            <span className={statusBadge(aeronave.status)}>{aeronave.status}</span>
          </div>
          <p className={styles.subtitle}>{aeronave.tipo} · Cliente: {aeronave.cliente} · Entrega: {aeronave.dataEntrega||'A definir'}</p>
        </div>
        <button className="btn btn-secondary" onClick={()=>navigate('/aeronaves')}>← Voltar</button>
      </div>
      <div className={styles.infoGrid}>
        {[
          {label:'Tipo',value:aeronave.tipo},
          {label:'Capacidade',value:`${aeronave.capacidade} pax`},
          {label:'Alcance',value:`${aeronave.alcance.toLocaleString()} km`},
          {label:'Etapas concluídas',value:`${aeronave.etapas.filter(e=>e.status==='Concluída').length}/${aeronave.etapas.length}`},
          {label:'Testes realizados',value:`${aeronave.testes.length}`},
          {label:'Peças cadastradas',value:`${aeronave.pecas.length}`},
        ].map(item=>(
          <div key={item.label} className={styles.infoCard}>
            <div className={styles.infoLabel}>{item.label}</div>
            <div className={styles.infoValue}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {ABAS.map(a=>(
            <button key={a} className={abaAtiva===a?`${styles.tab} ${styles.tabActive}`:styles.tab} onClick={()=>setAbaAtiva(a)}>{a}</button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {abaAtiva==='Peças'     && <AbaPecas aeronave={aeronave}/>}
          {abaAtiva==='Etapas'    && <AbaEtapas aeronave={aeronave}/>}
          {abaAtiva==='Testes'    && <AbaTestes aeronave={aeronave}/>}
          {abaAtiva==='Relatório' && <AbaRelatorio aeronave={aeronave}/>}
        </div>
      </div>
    </div>
  )
}
