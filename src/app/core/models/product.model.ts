export enum SituacaoProduct {
  ATIVO = 'Ativo',
  INATIVO = 'Inativo',
}

// Mapeamento para o backend
export const SituacaoProductBackendMap: Record<string, string> = {
  [SituacaoProduct.ATIVO]: 'ACTIVE',
  [SituacaoProduct.INATIVO]: 'INACTIVE',
};

export const situacoes = [
  { label: SituacaoProduct.ATIVO, value: SituacaoProduct.ATIVO },
  { label: SituacaoProduct.INATIVO, value: SituacaoProduct.INATIVO },
];

export interface Product {
  id: number;
  codigo: string;
  descricao: string;
  situacao: SituacaoProduct;
}
