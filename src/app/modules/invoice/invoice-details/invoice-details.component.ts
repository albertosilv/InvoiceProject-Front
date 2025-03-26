import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ProductService } from '../../../core/services/product.service';
import { Invoice } from '../../../core/models/invoice.model';
import { Product } from '../../../core/models/product.model';
import { InvoiceItem } from '../../../core/models/invoiceItem.model';

// PrimeNG Components
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detalhes',
  templateUrl: './invoice-details.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // PrimeNG Modules
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputTextModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice | null = null;
  loading = true;
  loadingItens = false;
  loadingItem = false;
  products: Product[] = [];

  // Controle do diálogo
  displayDialogItem = false;
  itemForm: FormGroup;
  editItem = false;
  itemSelected: InvoiceItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      produto_id: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(0.01)]],
      valorUnitario: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.carregarInvoice();
    this.carregarProducts();
  }

  carregarInvoice(): void {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['/notas']);
    }
    this.loading = true;
    this.invoiceService.buscarPorId(id).subscribe({
      next: (nota) => {
        this.invoice = nota;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar nota fiscal',
        });
        this.router.navigate(['/notas']);
      },
    });
  }

  carregarProducts(): void {
    this.productService.pesquisar().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Erro ao carregar products',
        });
      },
    });
  }

  mostrarDialogNovoItem(): void {
    this.itemForm.reset({
      produto_id: null,
      quantidade: 1,
      valorUnitario: 0,
    });
    this.editItem = false;
    this.itemSelected = null;
    this.displayDialogItem = true;
  }

  mostrarDialogEditarItem(item: InvoiceItem): void {
    this.itemSelected = item;
    this.itemForm.patchValue({
      produto_id: item.produto.id,
      quantidade: item.quantidade,
      valorUnitario: item.valorUnitario,
    });
    this.editItem = true;
    this.displayDialogItem = true;
  }

  salvarItem(): void {
    if (this.itemForm.invalid || !this.invoice) return;

    this.loadingItem = true;
    const formValue = this.itemForm.value;

    if (this.editItem && this.itemSelected) {
      this.atualizarItem(formValue);
    } else {
      this.adicionarItem(formValue);
    }
  }

  adicionarItem(formValue: any): void {
    const novoItem: Omit<InvoiceItem, 'id' | 'valorTotal'> = {
      ...formValue,
      produto_id: formValue.produto_id,
    };

    if (this.invoice && this.invoice.id) {
      this.invoiceService.adicionarItem(this.invoice.id, novoItem).subscribe({
        next: (item) => {
          this.carregarInvoice();
          this.mostrarMensagemSucesso('Item adicionado com sucesso');
          this.fecharDialog();
        },
        error: (err) => {
          this.mostrarMensagemErro('Erro ao adicionar item');
        },
      });
    } else {
      this.mostrarMensagemErro('Erro ao adicionar item');
    }
  }

  atualizarItem(formValue: any): void {
    if (!this.itemSelected || !this.invoice) return;

    const itemAtualizado: InvoiceItem = {
      ...this.itemSelected,
      ...formValue,
      produto_id: formValue.produto_id,
    };

    this.invoiceService
      .atualizarItem(this.invoice.id, this.itemSelected.id, itemAtualizado)
      .subscribe({
        next: (item) => {
          this.carregarInvoice();
          this.mostrarMensagemSucesso('Item atualizado com sucesso');
          this.fecharDialog();
        },
        error: (err) => {
          this.mostrarMensagemErro('Erro ao atualizar item');
        },
      });
  }

  fecharDialog(): void {
    this.displayDialogItem = false;
    this.loadingItem = false;
    this.itemSelected = null;
  }

  confirmarRemocaoItem(itemId: number, index: number): void {
    if (!this.invoice) return;

    this.confirmationService.confirm({
      message: 'Deseja realmente remover este item?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.removerItem(itemId, index);
      },
    });
  }

  removerItem(itemId: number, index: number): void {
    if (!this.invoice) return;

    this.loadingItens = true;
    this.invoiceService.removerItem(this.invoice.id, itemId).subscribe({
      next: () => {
        this.carregarInvoice();
        this.mostrarMensagemSucesso('Item removido com sucesso');
        this.loadingItens = false;
      },
      error: (err) => {
        this.mostrarMensagemErro('Erro ao remover item');
      },
    });
  }

  calcularValorTotal(): number {
    if (!this.invoice) return 0;
    return this.invoice.itens.reduce(
      (total, item) => total + item.quantidade * item.valorUnitario,
      0
    );
  }

  calcularValorItem(item: InvoiceItem): number {
    return item.quantidade * item.valorUnitario;
  }

  private mostrarMensagemSucesso(detalhe: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detalhe,
    });
  }

  private mostrarMensagemErro(detalhe: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detalhe,
    });
  }
}
