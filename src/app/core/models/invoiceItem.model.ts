import { Invoice } from './invoice.model';
import { Product } from './product.model';

export interface InvoiceItem {
  id: number;
  notaFiscal: Invoice;
  produto: Product;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}
