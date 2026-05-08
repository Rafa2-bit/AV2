import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../data/AppContext'

export default function EditarAeronave() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { aeronaves, editarAeronave } = useApp()
  const aeronave = aeronaves.find(a => a.id === id)

  const [form, setForm] = useState(aeronave ? {
    modelo:      aeronave.modelo,
    tipo:        aeronave.tipo,
    capacidade:  String(aeronave.capacidade),
    alcance:     String(aeronave.alcance),
    cliente:     aeronave.cliente,
    dataEntrega: aeronave.dataEntrega || '',
    status:      aeronave.status,
  } : null)

  const [saved, setSaved] = useState(false)
  const f = field => e => setForm(v => ({ ...v, [field]: e.target.value }))

  if (!aeronave || !form) return (
    <div style={{ padding:'120px 32px', textAlign:'center', color:'var(--c-text3)' }}>
      <p>Aeronave não encontrada.</p>
      <button className="btn btn-secondary" style={{ marginTop:16 }} onClick={() => navigate('/aeronaves')}>← Voltar</button>
    </div>
  )

  function handleSalvar() {
    if (!form.modelo || !form.cliente) return
    editarAeronave(id, {
      ...form,
      capacidade: Number(form.capacidade),
      alcance:    Number(form.alcance),
    })
    setSaved(true)
    setTimeout(() => navigate(`/aeronaves/${id}`), 900)
  }

  const row = { display:'flex', gap:16 }
  const field = (flex=1) => ({ flex, marginBottom:14 })

  return (
    <div style={{ padding:'80px 32px 32px', maxWidth:1200, margin:'0 auto' }}>

      
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 style={{ fontFamily:'var(--f-display)', fontSize:28, fontWeight:700 }}>Editar Aeronave</h1>
          <p style={{ color:'var(--c-text3)', fontSize:13, marginTop:4 }}>{aeronave.id} — {aeronave.modelo}</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate(`/aeronaves/${id}`)}>← Cancelar</button>
      </div>

      
      <div className="card" style={{ maxWidth:640 }}>

        <div style={row}>
          <div style={field(2)}>
            <label className="form-label">Modelo</label>
            <input value={form.modelo} onChange={f('modelo')} placeholder="Ex: XPT-3" />
          </div>
          <div style={field(1)}>
            <label className="form-label">Status</label>
            <select value={form.status} onChange={f('status')}>
              <option>Pendente</option>
              <option>Em Produção</option>
              <option>Concluída</option>
            </select>
          </div>
        </div>

        <div style={field()}>
          <label className="form-label">Tipo</label>
          <select value={form.tipo} onChange={f('tipo')}>
            <option>COMERCIAL</option>
            <option>MILITAR</option>
            <option>EXECUTIVA</option>
            <option>DEFESA</option>
            <option>CARGA</option>
          </select>
        </div>

        <div style={row}>
          <div style={field()}>
            <label className="form-label">Capacidade (pax)</label>
            <input type="number" value={form.capacidade} onChange={f('capacidade')} />
          </div>
          <div style={field()}>
            <label className="form-label">Alcance (km)</label>
            <input type="number" value={form.alcance} onChange={f('alcance')} />
          </div>
        </div>

        <div style={row}>
          <div style={field(2)}>
            <label className="form-label">Cliente</label>
            <input value={form.cliente} onChange={f('cliente')} placeholder="Ex: Boeing" />
          </div>
          <div style={field(1)}>
            <label className="form-label">Data de entrega</label>
            <input type="date" value={form.dataEntrega} onChange={f('dataEntrega')} />
          </div>
        </div>

        {saved
          ? <div style={{ color:'var(--c-green)', fontFamily:'var(--f-display)', fontSize:14, padding:'10px 0' }}>✓ Salvo! Redirecionando...</div>
          : <button className="btn btn-primary" onClick={handleSalvar}>Salvar alterações</button>
        }
      </div>
    </div>
  )
}
