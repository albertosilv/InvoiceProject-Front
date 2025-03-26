import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // Obter um produto por ID
  obterPorId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Criar novo produto
  criar(produto: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, produto);
  }

  // Atualizar produto existente
  atualizar(id: number, produto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, produto);
  }

  // Excluir produto
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Pesquisar produtos
  pesquisar(termo: string = ''): Observable<Product[]> {
    const params = termo ? { params: { filter: termo } } : {};
    return this.http.get<Product[]>(`${this.apiUrl}/`, params);
  }
}
