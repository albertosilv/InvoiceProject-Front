// nota-fiscal-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Invoice } from '../../../core/models/invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
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
  selector: 'app-nota-fiscal-list',
  templateUrl: './invoice-list.component.html',
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
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  loading: boolean = true;
  term: string = '';

  constructor(
    private invoiceService: InvoiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.loading = true;
    this.invoiceService.search(this.term).subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar notas fiscais',
        });
        this.loading = false;
      },
    });
  }

  search(): void {
    this.getInvoices();
  }

  confirmDelete(invoice: Invoice): void {
    this.confirmationService.confirm({
      message: `Deseja realmente remover a nota fiscal ${invoice.numeroNota}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluirInvoice(invoice.id);
      },
    });
  }

  excluirInvoice(id: number): void {
    this.invoiceService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Nota fiscal excluída com sucesso',
        });
        this.getInvoices();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir nota fiscal',
        });
      },
    });
  }
}
