import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Supplier } from '../../../core/models/supplier.model';
import { SupplierService } from '../../../core/services/supplier.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    TagModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class SupplierListComponent implements OnInit {
  fornecedores: Supplier[] = [];
  loading = true;
  term = '';

  constructor(
    private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.loading = true;
    this.supplierService.pesquisar().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Falha ao carregar fornecedores');
        this.loading = false;
      },
    });
  }

  pesquisar(): void {
    if (this.term.trim().length === 0) {
      this.carregarFornecedores();
      return;
    }

    this.loading = true;
    this.supplierService.pesquisar(this.term).subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Falha na pesquisa');
        this.loading = false;
      },
    });
  }

  confirmarExclusao(fornecedor: Supplier): void {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir o fornecedor ${fornecedor.razao}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.excluirFornecedor(fornecedor.id),
    });
  }

  excluirFornecedor(id: number): void {
    this.supplierService.excluir(id).subscribe({
      next: () => {
        this.mostrarSucesso('Fornecedor excluído com sucesso');
        this.carregarFornecedores();
      },
      error: (erro) => {
        const mensagemErro =
          erro.error?.message || 'Falha ao excluir fornecedor';
        this.mostrarErro(mensagemErro);
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
