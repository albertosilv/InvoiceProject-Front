import { InvoiceItem } from './invoiceItem.model';
import { Supplier } from './supplier.model';

export interface Invoice {
  id: number;
  numeroNota: string;
  dataEmissao: Date;
  endereco: String;
  valorTotal: number;
  fornecedor: Supplier;
  itens: InvoiceItem[];
}
