import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-products-list',
  templateUrl: './product-list.component.html',
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
    TableModule,
    ToolbarModule,
    FormsModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  term = '';

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.productService.search().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Erro ao carregar produtos');
        this.loading = false;
      },
    });
  }

  search(): void {
    if (!this.term.trim()) {
      this.getProducts();
      return;
    }

    this.loading = true;
    this.productService.search(this.term).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Erro na pesquisa');
        this.loading = false;
      },
    });
  }

  confirmDelete(products: Product): void {
    this.confirmationService.confirm({
      message: `Deseja realmente deletar o produto ${products.descricao}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteProduct(products.id),
    });
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.openMessageSucess('Produto excluído com sucesso');
        this.getProducts();
      },
      error: (erro) => {
        console.log(erro);
        this.openMessageError(erro.error?.message || 'Erro ao excluir produto');
      },
    });
  }

  private openMessageSucess(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
    });
  }

  private openMessageError(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
    });
  }
}
