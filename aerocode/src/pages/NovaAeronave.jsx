import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'
import styles from './NovaAeronave.module.css'

export default function NovaAeronave() {
  const navigate = useNavigate()
  const { addAeronave } = useApp()
  const [form, setForm] = useState({ id:'', modelo:'', tipo:'COMERCIAL', capacidade:'', alcance:'', cliente:'', dataEntrega:'' })
  const [saved, setSaved] = useState(false)
  const f = field => e => setForm(v=>({...v,[field]:e.target.value}))

  function handleSalvar(e) {
    e.preventDefault()
    addAeronave({ ...form, status:'Pendente', capacidade:Number(form.capacidade), alcance:Number(form.alcance) })
    setSaved(true)
    setTimeout(()=>navigate('/aeronaves'), 1000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Nova Aeronave</h1>
          <p className={styles.subtitle}>Cadastro de nova aeronave no sistema</p>
        </div>
        <button className="btn btn-secondary" onClick={()=>navigate('/aeronaves')}>← Cancelar</button>
      </div>
      <div className="card" style={{maxWidth:640}}>
        <form onSubmit={handleSalvar}>
          <div className={styles.row}>
            <div className="form-field" style={{flex:1}}><label className="form-label">Código</label><input value={form.id} onChange={f('id')} placeholder="Ex: A005" required/></div>
            <div className="form-field" style={{flex:2}}><label className="form-label">Modelo</label><input value={form.modelo} onChange={f('modelo')} placeholder="Ex: XPT-3" required/></div>
          </div>
          <div className="form-field"><label className="form-label">Tipo</label>
            <select value={form.tipo} onChange={f('tipo')}>
              <option>COMERCIAL</option><option>MILITAR</option><option>EXECUTIVA</option><option>DEFESA</option><option>CARGA</option>
            </select></div>
          <div className={styles.row}>
            <div className="form-field" style={{flex:1}}><label className="form-label">Capacidade (pax)</label><input type="number" value={form.capacidade} onChange={f('capacidade')} placeholder="Ex: 220"/></div>
            <div className="form-field" style={{flex:1}}><label className="form-label">Alcance (km)</label><input type="number" value={form.alcance} onChange={f('alcance')} placeholder="Ex: 5000"/></div>
          </div>
          <div className={styles.row}>
            <div className="form-field" style={{flex:2}}><label className="form-label">Cliente</label><input value={form.cliente} onChange={f('cliente')} placeholder="Ex: Boeing" required/></div>
            <div className="form-field" style={{flex:1}}><label className="form-label">Data de entrega</label><input type="date" value={form.dataEntrega} onChange={f('dataEntrega')}/></div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saved}>{saved?'✓ Salvo! Redirecionando...':'✈ Cadastrar Aeronave'}</button>
        </form>
      </div>
    </div>
  )
}
