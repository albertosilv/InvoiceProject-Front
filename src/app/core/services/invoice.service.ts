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

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  create(invoice: Omit<Invoice, 'id' | 'itens'>): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice);
  }

  update(
    id: number,
    invoice: Omit<Invoice, 'id' | 'itens'>
  ): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/${id}`, invoice);
  }

  // Exclui uma nota fiscal
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createItem(
    invoiceId: number,
    item: Omit<InvoiceItem, 'id' | 'valorTotal'>
  ): Observable<InvoiceItem> {
    return this.http.post<InvoiceItem>(
      `${this.apiUrl}/${invoiceId}/items`,
      item
    );
  }

  deleteItem(invoiceId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${invoiceId}/items/${itemId}`
    );
  }

  updateItem(
    invoiceId: number,
    itemId: number,
    item: InvoiceItem
  ): Observable<InvoiceItem> {
    return this.http.put<InvoiceItem>(
      `${this.apiUrl}/${invoiceId}/items/${itemId}`,
      item
    );
  }

  search(term: string = ''): Observable<Invoice[]> {
    const params = term ? { params: { filter: term } } : {};
    return this.http.get<Invoice[]>(this.apiUrl, params);
  }
}
