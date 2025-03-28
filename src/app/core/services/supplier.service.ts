import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  create(fornecedor: Omit<Supplier, 'id'>): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, fornecedor);
  }
  update(id: number, fornecedor: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, fornecedor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(termo: string = ''): Observable<Supplier[]> {
    const params = termo ? { params: { filter: termo } } : {};
    return this.http.get<Supplier[]>(`${this.apiUrl}/`, params);
  }
}
