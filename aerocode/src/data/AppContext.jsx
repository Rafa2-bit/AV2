import { createContext, useContext, useState } from 'react'
import { mockAeronaves, mockFuncionarios, mockUsuarios } from './mockData'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [aeronaves, setAeronaves]     = useState(mockAeronaves)
  const [funcionarios, setFuncionarios] = useState(mockFuncionarios)
  const [usuarios, setUsuarios]         = useState(mockUsuarios)
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  
  function login(loginStr, senha) {
    const u = usuarios.find(u => u.login === loginStr && u.senha === senha)
    if (!u) return false
    const func = funcionarios.find(f => f.id === u.funcionarioId)
    setUsuarioLogado({ ...u, funcionario: func })
    return true
  }
  function logout() { setUsuarioLogado(null) }

  
  function pode(acao) {
    const nivel = usuarioLogado?.nivel
    const permissoes = {
      administrador: ['ver','criar','editar','excluir','relatorio'],
      engenheiro:    ['ver','criar','editar','relatorio'],
      operador:      ['ver'],
    }
    return permissoes[nivel]?.includes(acao) ?? false
  }


  function addAeronave(dados) {
    setAeronaves(list => [...list, { ...dados, pecas:[], etapas:[], testes:[] }])
  }
  function editarAeronave(id, dados) {
    setAeronaves(list => list.map(a => a.id !== id ? a : { ...a, ...dados }))
  }
  function getAeronave(id) { return aeronaves.find(a => a.id === id) }


  function addPeca(aeronaveId, peca) {
    setAeronaves(list => list.map(a => a.id !== aeronaveId ? a : {
      ...a, pecas: [...a.pecas, { id: `P${Date.now()}`, ...peca }]
    }))
  }
  function atualizarStatusPeca(aeronaveId, pecaId, novoStatus) {
    setAeronaves(list => list.map(a => a.id !== aeronaveId ? a : {
      ...a, pecas: a.pecas.map(p => p.id !== pecaId ? p : { ...p, status: novoStatus })
    }))
  }

  
  function addEtapa(aeronaveId, etapa) {
    setAeronaves(list => list.map(a => {
      if (a.id !== aeronaveId) return a
      const ordem = a.etapas.length + 1
      return { ...a, etapas: [...a.etapas, { id: `E${Date.now()}`, status: 'Pendente', responsaveis: [], ordem, ...etapa }] }
    }))
  }

  function iniciarEtapa(aeronaveId, etapaId) {
    setAeronaves(list => list.map(a => {
      if (a.id !== aeronaveId) return a
      const etapa = a.etapas.find(e => e.id === etapaId)
      if (!etapa) return a
  
      if (etapa.ordem > 1) {
        const anterior = a.etapas.find(e => e.ordem === etapa.ordem - 1)
        if (anterior && anterior.status !== 'Concluída') return a 
      }
      return { ...a, etapas: a.etapas.map(e => e.id !== etapaId ? e : { ...e, status: 'Em andamento' }) }
    }))
  }

  function concluirEtapa(aeronaveId, etapaId) {
    setAeronaves(list => list.map(a => {
      if (a.id !== aeronaveId) return a
      const etapa = a.etapas.find(e => e.id === etapaId)
      if (!etapa || etapa.status !== 'Em andamento') return a
      const novasEtapas = a.etapas.map(e => e.id !== etapaId ? e : { ...e, status: 'Concluída' })
  
      const todasConcluidas = novasEtapas.every(e => e.status === 'Concluída')
      return { ...a, etapas: novasEtapas, status: todasConcluidas ? 'Concluída' : a.status }
    }))
  }

  function addResponsavel(aeronaveId, etapaId, funcId) {
    setAeronaves(list => list.map(a => {
      if (a.id !== aeronaveId) return a
      return {
        ...a, etapas: a.etapas.map(e => {
          if (e.id !== etapaId) return e
          if (e.responsaveis.includes(funcId)) return e 
          return { ...e, responsaveis: [...e.responsaveis, funcId] }
        })
      }
    }))
  }

  function removerResponsavel(aeronaveId, etapaId, funcId) {
    setAeronaves(list => list.map(a => {
      if (a.id !== aeronaveId) return a
      return {
        ...a, etapas: a.etapas.map(e => {
          if (e.id !== etapaId) return e
          return { ...e, responsaveis: e.responsaveis.filter(r => r !== funcId) }
        })
      }
    }))
  }

  function addTeste(aeronaveId, teste) {
    setAeronaves(list => list.map(a => a.id !== aeronaveId ? a : {
      ...a, testes: [...a.testes, { id: `T${Date.now()}`, ...teste }]
    }))
  }


  function addFuncionario(dados) {
    const novoFunc = { id: String(funcionarios.length + 1).padStart(2,'0'), ...dados }
    setFuncionarios(list => [...list, novoFunc])
    setUsuarios(list => [...list, {
      id: `U${Date.now()}`, login: dados.login, senha: dados.senha,
      nivel: dados.nivel, funcionarioId: novoFunc.id
    }])
    return novoFunc
  }

  function editarFuncionario(id, dados) {
    setFuncionarios(list => list.map(f => f.id !== id ? f : { ...f, ...dados }))
  }

  function gerarRelatorio(aeronaveId) {
    const a = aeronaves.find(x => x.id === aeronaveId)
    if (!a) return null
    const linhas = [
      '='.repeat(60),
      'RELATÓRIO FINAL DE AERONAVE — AEROCODE',
      '='.repeat(60),
      `Aeronave : ${a.id} — ${a.modelo}`,
      `Tipo     : ${a.tipo}`,
      `Cliente  : ${a.cliente}`,
      `Entrega  : ${a.dataEntrega || 'A definir'}`,
      `Status   : ${a.status}`,
      `Capacidade: ${a.capacidade} pax | Alcance: ${a.alcance} km`,
      '',
      '── ETAPAS REALIZADAS ─────────────────────────────────────',
      ...a.etapas.map(e => {
        const resps = e.responsaveis.map(rid => {
          const f = funcionarios.find(f => f.id === rid)
          return f ? f.nome : rid
        }).join(', ')
        return `  [${e.status.padEnd(13)}] ${e.nome} | Prazo: ${e.prazo} | Resp: ${resps || 'Não designado'}`
      }),
      '',
      '── PEÇAS UTILIZADAS ──────────────────────────────────────',
      ...a.pecas.map(p => `  ${p.nome} | ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}`),
      '',
      '── TESTES REALIZADOS ─────────────────────────────────────',
      ...a.testes.map(t => `  [${t.resultado}] ${t.tipo}`),
      '',
      '='.repeat(60),
      `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
      '='.repeat(60),
    ]
    return linhas.join('\n')
  }

  return (
    <Ctx.Provider value={{
      aeronaves, funcionarios, usuarios, usuarioLogado,
      login, logout, pode,
      addAeronave, editarAeronave, getAeronave,
      addPeca, atualizarStatusPeca,
      addEtapa, iniciarEtapa, concluirEtapa, addResponsavel, removerResponsavel,
      addTeste,
      addFuncionario, editarFuncionario,
      gerarRelatorio,
    }}>
      {children}
    </Ctx.Provider>
  )
}
