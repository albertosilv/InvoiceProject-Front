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
  selector: 'app-produto-list',
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
  produtos: Product[] = [];
  loading = true;
  term = '';

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProducts();
  }

  carregarProducts(): void {
    this.loading = true;
    this.productService.pesquisar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Erro ao carregar produtos');
        this.loading = false;
      },
    });
  }

  pesquisar(): void {
    if (!this.term.trim()) {
      this.carregarProducts();
      return;
    }

    this.loading = true;
    this.productService.pesquisar(this.term).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Erro na pesquisa');
        this.loading = false;
      },
    });
  }

  confirmarExclusao(produto: Product): void {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir o produto ${produto.descricao}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.excluirProduct(produto.id),
    });
  }

  excluirProduct(id: number): void {
    this.productService.excluir(id).subscribe({
      next: () => {
        this.mostrarSucesso('Product excluído com sucesso');
        this.carregarProducts();
      },
      error: (erro) => {
        this.mostrarErro(erro.error?.message || 'Erro ao excluir produto');
      },
    });
  }

  private mostrarSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
    });
  }

  private mostrarErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
    });
  }
}
