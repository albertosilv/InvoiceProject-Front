// nota-fiscal-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InvoiceService } from '../../../core/services/invoice.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputTextarea } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { Supplier } from '../../../core/models/supplier.model';
import { Invoice } from '../../../core/models/invoice.model';

@Component({
  selector: 'app-nota-fiscal-form',
  templateUrl: './invoice-form.component.html',
  imports: [
    ToastModule,
    RouterModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
  ],
  providers: [MessageService],
  standalone: true,
})
export class InvoiceFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  invoiceId?: number;
  suppliers: Supplier[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private InvoiceService: InvoiceService,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    public router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      numeroNota: ['', [Validators.required]],
      dataEmissao: [new Date(), [Validators.required]],
      fornecedor_id: [null, [Validators.required]],
      endereco: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getSuppliers();

    this.invoiceId = this.route.snapshot.params['id'];
    if (this.invoiceId) {
      this.isEdit = true;
      this.getInvoice(this.invoiceId);
    }
  }

  getSuppliers(): void {
    this.loading = true;
    this.supplierService.search().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Erro ao carregar suppliers');
        this.loading = false;
      },
    });
  }

  getInvoice(id: number): void {
    this.loading = true;
    this.InvoiceService.getById(id).subscribe({
      next: (invoice) => {
        this.form.patchValue({
          ...invoice,
          fornecedor_id: invoice.fornecedor.id,
        });
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Erro ao carregar nota fiscal');
        this.router.navigate(['/notas']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.form.value;

    const supplierSelected = this.suppliers.find(
      (f) => f.id === formValue.fornecedor_id
    );

    const invoice: Omit<Invoice, 'id' | 'itens'> = {
      ...formValue,
      fornecedor_id: supplierSelected?.id!,
      itens: [], // Itens serão adicionados posteriormente
    };

    if (this.isEdit && this.invoiceId) {
      this.updateInvoice(this.invoiceId, invoice);
    } else {
      this.criarNotaFiscal(invoice);
    }
  }

  private criarNotaFiscal(invoice: Omit<Invoice, 'id' | 'itens'>): void {
    this.InvoiceService.create(invoice).subscribe({
      next: () => {
        this.openMessageSucess('Nota fiscal criada com sucesso');
        this.router.navigate(['/notas']);
      },
      error: (erro) => {
        this.openMessageError(
          erro.error?.message || 'Erro ao criar nota fiscal'
        );
        this.loading = false;
      },
    });
  }

  private updateInvoice(
    id: number,
    invoice: Omit<Invoice, 'id' | 'itens'>
  ): void {
    this.InvoiceService.update(id, invoice).subscribe({
      next: () => {
        this.openMessageSucess('Nota fiscal atualizada com sucesso');
        this.router.navigate(['/notas']);
      },
      error: (erro) => {
        this.openMessageError(
          erro.error?.message || 'Erro ao atualizar nota fiscal'
        );
        this.loading = false;
      },
    });
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
