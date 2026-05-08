// ── Mock data — Aerocode ─────────────────────────────────────────

export const mockUsuarios = [
  { id: 'U01', login: 'admin', senha: '1234', nivel: 'administrador', funcionarioId: '01' },
  { id: 'U02', login: 'joao',  senha: '1234', nivel: 'engenheiro',    funcionarioId: '02' },
  { id: 'U03', login: 'maria', senha: '1234', nivel: 'operador',      funcionarioId: '03' },
]

export const mockFuncionarios = [
  { id: '01', nome: 'Ana Lima',      telefone: '(19) 99999-1111', endereco: 'Rua das Acácias, 100 — Campinas/SP', nivel: 'administrador', login: 'admin' },
  { id: '02', nome: 'João Oliveira', telefone: '(19) 99999-2222', endereco: 'Av. Brasil, 200 — Campinas/SP',       nivel: 'engenheiro',    login: 'joao'  },
  { id: '03', nome: 'Maria Santos',  telefone: '(11) 99999-3333', endereco: 'Rua das Flores, 300 — São Paulo/SP',  nivel: 'operador',      login: 'maria' },
  { id: '04', nome: 'Carlos Pereira',telefone: '(19) 99999-4444', endereco: 'Rua XV de Novembro, 50 — Campinas/SP',nivel: 'engenheiro',   login: 'carlos'},
]

export const mockAeronaves = [
  {
    id: 'A001', modelo: 'XPT-1', tipo: 'COMERCIAL', status: 'Em Produção',
    capacidade: 220, alcance: 5000, cliente: 'Embraer', dataEntrega: '2026-09-15',
    pecas: [
      { id: 'P001', nome: 'Asa Principal',   tipo: 'Importada', fornecedor: 'Airbus Parts GmbH', status: 'Pronto para uso' },
      { id: 'P002', nome: 'Motor Turbofan',  tipo: 'Nacional',  fornecedor: 'Embraer Propulsão', status: 'Instalado'       },
      { id: 'P003', nome: 'Trem de Pouso',   tipo: 'Importada', fornecedor: 'Safran Landing',    status: 'Em transporte'   },
    ],
    etapas: [
      { id: 'E001', nome: 'Estrutura da Fuselagem', prazo: '10 dias', status: 'Concluída',    responsaveis: ['01','02'], ordem: 1 },
      { id: 'E002', nome: 'Instalação de Motores',  prazo: '15 dias', status: 'Em andamento', responsaveis: ['02','04'], ordem: 2 },
      { id: 'E003', nome: 'Sistemas Elétricos',     prazo: '8 dias',  status: 'Pendente',     responsaveis: ['04'],     ordem: 3 },
      { id: 'E004', nome: 'Cabine e Interiores',    prazo: '12 dias', status: 'Pendente',     responsaveis: [],         ordem: 4 },
    ],
    testes: [
      { id: 'T001', tipo: 'Elétrico',      resultado: 'Aprovado'   },
      { id: 'T002', tipo: 'Aerodinâmico',  resultado: 'Reprovado'  },
    ],
  },
  {
    id: 'A002', modelo: 'ZK-9', tipo: 'MILITAR', status: 'Concluída',
    capacidade: 4, alcance: 3200, cliente: 'Lockheed Martin', dataEntrega: '2026-04-01',
    pecas: [
      { id: 'P004', nome: 'Asa Delta',        tipo: 'Nacional',  fornecedor: 'AeroNac S.A.',     status: 'Pronto para uso' },
      { id: 'P005', nome: 'Radar AN/APG-77',  tipo: 'Importada', fornecedor: 'Raytheon Systems', status: 'Pronto para uso' },
    ],
    etapas: [
      { id: 'E005', nome: 'Estrutura',  prazo: '20 dias', status: 'Concluída', responsaveis: ['02'], ordem: 1 },
      { id: 'E006', nome: 'Aviónica',   prazo: '18 dias', status: 'Concluída', responsaveis: ['04'], ordem: 2 },
      { id: 'E007', nome: 'Armamentos', prazo: '10 dias', status: 'Concluída', responsaveis: ['02'], ordem: 3 },
    ],
    testes: [
      { id: 'T004', tipo: 'Elétrico',     resultado: 'Aprovado' },
      { id: 'T005', tipo: 'Hidráulico',   resultado: 'Aprovado' },
      { id: 'T006', tipo: 'Aerodinâmico', resultado: 'Aprovado' },
    ],
  },
  {
    id: 'A003', modelo: 'G700-X', tipo: 'EXECUTIVA', status: 'Em Produção',
    capacidade: 19, alcance: 7500, cliente: 'Gulfstream', dataEntrega: '2026-12-20',
    pecas: [
      { id: 'P006', nome: 'Motor Rolls-Royce Pearl', tipo: 'Importada', fornecedor: 'Rolls-Royce plc',  status: 'Em transporte'   },
      { id: 'P007', nome: 'Interior Premium',         tipo: 'Nacional',  fornecedor: 'LuxAero Interiores', status: 'Em produção' },
    ],
    etapas: [
      { id: 'E008', nome: 'Fuselagem',        prazo: '14 dias', status: 'Concluída',    responsaveis: ['02','04'], ordem: 1 },
      { id: 'E009', nome: 'Motorização',      prazo: '20 dias', status: 'Em andamento', responsaveis: ['04'],     ordem: 2 },
      { id: 'E010', nome: 'Interior de Luxo', prazo: '25 dias', status: 'Pendente',     responsaveis: [],         ordem: 3 },
    ],
    testes: [
      { id: 'T007', tipo: 'Hidráulico', resultado: 'Aprovado' },
    ],
  },
  {
    id: 'A004', modelo: 'DXF-22', tipo: 'DEFESA', status: 'Pendente',
    capacidade: 1, alcance: 2800, cliente: 'Dassault Aviation', dataEntrega: '2027-06-30',
    pecas: [],
    etapas: [
      { id: 'E011', nome: 'Projeto Estrutural', prazo: '30 dias', status: 'Em andamento', responsaveis: ['02'], ordem: 1 },
    ],
    testes: [],
  },
]
