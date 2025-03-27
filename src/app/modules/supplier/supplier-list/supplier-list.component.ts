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
  suppliers: Supplier[] = [];
  loading = true;
  term = '';

  constructor(
    private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): void {
    this.loading = true;
    this.supplierService.search().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Falha ao carregar fornecedores');
        this.loading = false;
      },
    });
  }

  search(): void {
    if (this.term.trim().length === 0) {
      this.getSuppliers();
      return;
    }

    this.loading = true;
    this.supplierService.search(this.term).subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Falha na pesquisa');
        this.loading = false;
      },
    });
  }

  confirmDelete(supplier: Supplier): void {
    this.confirmationService.confirm({
      message: `Deseja realmente deletar o fornecedor ${supplier.razao}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deleteSupplier(supplier.id),
    });
  }

  deleteSupplier(id: number): void {
    this.supplierService.delete(id).subscribe({
      next: () => {
        this.openMessageSucess('Fornecedor excluído com sucesso');
        this.getSuppliers();
      },
      error: (erro) => {
        console.log(erro);
        const mensagemErro =
          erro.error?.message || 'Falha ao excluir fornecedor';
        this.openMessageError(mensagemErro);
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
