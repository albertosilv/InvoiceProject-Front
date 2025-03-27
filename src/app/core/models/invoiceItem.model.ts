import { Invoice } from './invoice.model';
import { Product } from './product.model';

export interface InvoiceItem {
  id: number;
  invoice: Invoice;
  produto: Product;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}
