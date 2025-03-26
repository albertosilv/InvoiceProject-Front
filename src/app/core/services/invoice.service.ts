import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Invoice } from '../models/invoice.model';
import { InvoiceItem } from '../models/invoiceItem.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) {}

  // Busca uma nota fiscal por ID
  buscarPorId(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  // Cria uma nova nota fiscal
  criar(notaFiscal: Omit<Invoice, 'id' | 'itens'>): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, notaFiscal);
  }

  // Atualiza uma nota fiscal existente
  atualizar(
    id: number,
    notaFiscal: Omit<Invoice, 'id' | 'itens'>
  ): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/${id}`, notaFiscal);
  }

  // Exclui uma nota fiscal
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Adiciona um item à nota fiscal
  adicionarItem(
    notaFiscalId: number,
    item: Omit<InvoiceItem, 'id' | 'valorTotal'>
  ): Observable<InvoiceItem> {
    return this.http.post<InvoiceItem>(
      `${this.apiUrl}/${notaFiscalId}/items`,
      item
    );
  }

  // Remove um item da nota fiscal
  removerItem(notaFiscalId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${notaFiscalId}/items/${itemId}`
    );
  }

  // Atualiza um item da nota fiscal
  atualizarItem(
    notaFiscalId: number,
    itemId: number,
    item: InvoiceItem
  ): Observable<InvoiceItem> {
    return this.http.put<InvoiceItem>(
      `${this.apiUrl}/${notaFiscalId}/items/${itemId}`,
      item
    );
  }

  // Pesquisa notas fiscais por termo
  pesquisar(termo: string = ''): Observable<Invoice[]> {
    const params = termo ? { params: { filter: termo } } : {};
    return this.http.get<Invoice[]>(this.apiUrl, params);
  }
}
