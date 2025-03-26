export interface Supplier {
  id: number;
  codigo: string;
  razao: string;
  email: string;
  telefone: string;
  cnpj: string;
  status: SupplierStatus;
  data_desativacao?: Date;
}

export enum SupplierStatus {
  ATIVO = 'Ativo',
  BAIXADO = 'Baixado',
  SUSPENSO = 'Suspenso',
}

// Mapeamento para o backend
export const SituacaoSupplierBackendMap: Record<string, string> = {
  [SupplierStatus.ATIVO]: 'ACTIVE',
  [SupplierStatus.BAIXADO]: 'TERMINATED',
  [SupplierStatus.SUSPENSO]: 'SUSPENDED',
};

export const situacoes = [
  { label: SupplierStatus.ATIVO, value: SupplierStatus.ATIVO },
  { label: SupplierStatus.BAIXADO, value: SupplierStatus.BAIXADO },
  { label: SupplierStatus.SUSPENSO, value: SupplierStatus.SUSPENSO },
];
