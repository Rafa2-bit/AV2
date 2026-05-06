// ── Mock data — Aerocode ─────────────────────────────────────────

export const mockAeronaves = [
  {
    id: 'A001', modelo: 'XPT-1', tipo: 'COMERCIAL', status: 'Em Produção',
    capacidade: 220, alcance: 5000, cliente: 'Embraer',
    etapasAtrasadas: 2, testesReprovados: 1, pecasAtraso: 2,
    pecas: [
      { id: 'P001', nome: 'Asa Principal', tipo: 'Importada', status: 'Transporte' },
      { id: 'P002', nome: 'Motor Turbofan', tipo: 'Nacional', status: 'Instalado' },
      { id: 'P003', nome: 'Trem de Pouso', tipo: 'Importada', status: 'Produção' },
    ],
    etapas: [
      { id: 'E001', etapa: 'Estrutura da Fuselagem', prazo: '10 dias', status: 'Concluída' },
      { id: 'E002', etapa: 'Instalação de Motores', prazo: '15 dias', status: 'Em Andamento' },
      { id: 'E003', etapa: 'Sistemas Elétricos', prazo: '8 dias', status: 'Pendente' },
      { id: 'E004', etapa: 'Cabine e Interiores', prazo: '12 dias', status: 'Atrasada' },
    ],
    testes: [
      { id: 'T001', tipo: 'Elétrico', resultado: 'Aprovado' },
      { id: 'T002', tipo: 'Aerodinâmico', resultado: 'Reprovado' },
      { id: 'T003', tipo: 'Pressurização', resultado: 'Aprovado' },
    ],
  },
  {
    id: 'A002', modelo: 'ZK-9', tipo: 'MILITAR', status: 'Concluída',
    capacidade: 4, alcance: 3200, cliente: 'Lockheed Martin',
    etapasAtrasadas: 0, testesReprovados: 0, pecasAtraso: 0,
    pecas: [
      { id: 'P004', nome: 'Asa Delta', tipo: 'Nacional', status: 'Instalado' },
      { id: 'P005', nome: 'Radar AN/APG-77', tipo: 'Importada', status: 'Instalado' },
    ],
    etapas: [
      { id: 'E005', etapa: 'Estrutura', prazo: '20 dias', status: 'Concluída' },
      { id: 'E006', etapa: 'Aviónica', prazo: '18 dias', status: 'Concluída' },
      { id: 'E007', etapa: 'Armamentos', prazo: '10 dias', status: 'Concluída' },
    ],
    testes: [
      { id: 'T004', tipo: 'Estrutural', resultado: 'Aprovado' },
      { id: 'T005', tipo: 'Radar', resultado: 'Aprovado' },
    ],
  },
  {
    id: 'A003', modelo: 'G700-X', tipo: 'EXECUTIVA', status: 'Em Produção',
    capacidade: 19, alcance: 7500, cliente: 'Gulfstream',
    etapasAtrasadas: 1, testesReprovados: 0, pecasAtraso: 1,
    pecas: [
      { id: 'P006', nome: 'Motor Rolls-Royce Pearl', tipo: 'Importada', status: 'Transporte' },
      { id: 'P007', nome: 'Interior Premium', tipo: 'Nacional', status: 'Produção' },
    ],
    etapas: [
      { id: 'E008', etapa: 'Fuselagem', prazo: '14 dias', status: 'Concluída' },
      { id: 'E009', etapa: 'Motorização', prazo: '20 dias', status: 'Atrasada' },
      { id: 'E010', etapa: 'Interior de Luxo', prazo: '25 dias', status: 'Pendente' },
    ],
    testes: [
      { id: 'T006', tipo: 'Estrutural', resultado: 'Aprovado' },
    ],
  },
  {
    id: 'A004', modelo: 'DXF-22', tipo: 'DEFESA', status: 'Pendente',
    capacidade: 1, alcance: 2800, cliente: 'Dassault Aviation',
    etapasAtrasadas: 0, testesReprovados: 0, pecasAtraso: 0,
    pecas: [],
    etapas: [
      { id: 'E011', etapa: 'Projeto Estrutural', prazo: '30 dias', status: 'Em Andamento' },
    ],
    testes: [],
  },
];

export const mockFuncionarios = [
  { id: '01', nome: 'João Oliveira', permissao: 'Engenheiro', email: 'joao@aerocode.com' },
  { id: '02', nome: 'Maria Santos', permissao: 'Administrador', email: 'maria@aerocode.com' },
  { id: '03', nome: 'Carlos Pereira', permissao: 'Engenheiro', email: 'carlos@aerocode.com' },
  { id: '04', nome: 'Ana Lima', permissao: 'Técnico', email: 'ana@aerocode.com' },
];
