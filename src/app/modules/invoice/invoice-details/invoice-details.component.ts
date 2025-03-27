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
    this.getInvoice();
    this.getProducts();
  }

  getInvoice(): void {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['/notas']);
    }
    this.loading = true;
    this.invoiceService.getById(id).subscribe({
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

  getProducts(): void {
    this.productService.search().subscribe({
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

  openDialogNewItem(): void {
    this.itemForm.reset({
      produto_id: null,
      quantidade: 1,
      valorUnitario: 0,
    });
    this.editItem = false;
    this.itemSelected = null;
    this.displayDialogItem = true;
  }

  openDialogUpdateItem(item: InvoiceItem): void {
    this.itemSelected = item;
    this.itemForm.patchValue({
      produto_id: item.produto.id,
      quantidade: item.quantidade,
      valorUnitario: item.valorUnitario,
    });
    this.editItem = true;
    this.displayDialogItem = true;
  }

  saveItem(): void {
    if (this.itemForm.invalid || !this.invoice) return;

    this.loadingItem = true;
    const formValue = this.itemForm.value;

    if (this.editItem && this.itemSelected) {
      this.updateItem(formValue);
    } else {
      this.createItem(formValue);
    }
  }

  createItem(formValue: any): void {
    const novoItem: Omit<InvoiceItem, 'id' | 'valorTotal'> = {
      ...formValue,
      produto_id: formValue.produto_id,
    };

    if (this.invoice && this.invoice.id) {
      this.invoiceService.createItem(this.invoice.id, novoItem).subscribe({
        next: (item) => {
          this.getInvoice();
          this.openMessageSucess('Item adicionado com sucesso');
          this.closeDialog();
        },
        error: (err) => {
          this.openMessageError('Erro ao adicionar item');
        },
      });
    } else {
      this.openMessageError('Erro ao adicionar item');
    }
  }

  updateItem(formValue: any): void {
    if (!this.itemSelected || !this.invoice) return;

    const itemUpdated: InvoiceItem = {
      ...this.itemSelected,
      ...formValue,
      produto_id: formValue.produto_id,
    };

    this.invoiceService
      .updateItem(this.invoice.id, this.itemSelected.id, itemUpdated)
      .subscribe({
        next: (item) => {
          this.getInvoice();
          this.openMessageSucess('Item atualizado com sucesso');
          this.closeDialog();
        },
        error: (err) => {
          this.openMessageError('Erro ao atualizar item');
        },
      });
  }

  closeDialog(): void {
    this.displayDialogItem = false;
    this.loadingItem = false;
    this.itemSelected = null;
  }

  confirmDeleteItem(itemId: number, index: number): void {
    if (!this.invoice) return;

    this.confirmationService.confirm({
      message: 'Deseja realmente remover este item?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteItem(itemId, index);
      },
    });
  }

  deleteItem(itemId: number, index: number): void {
    if (!this.invoice) return;

    this.loadingItens = true;
    this.invoiceService.deleteItem(this.invoice.id, itemId).subscribe({
      next: () => {
        this.getInvoice();
        this.openMessageSucess('Item removido com sucesso');
        this.loadingItens = false;
      },
      error: (err) => {
        this.openMessageError('Erro ao remover item');
      },
    });
  }

  getValueTotal(): number {
    if (!this.invoice) return 0;
    return this.invoice.itens.reduce(
      (total, item) => total + item.quantidade * item.valorUnitario,
      0
    );
  }

  getValueItem(item: InvoiceItem): number {
    return item.quantidade * item.valorUnitario;
  }

  private openMessageSucess(detalhe: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detalhe,
    });
  }

  private openMessageError(detalhe: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detalhe,
    });
  }
}
