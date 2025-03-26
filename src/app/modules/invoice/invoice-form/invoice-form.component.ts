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
  notaFiscalId?: number;
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
    this.carregarFornecedores();

    this.notaFiscalId = this.route.snapshot.params['id'];
    if (this.notaFiscalId) {
      this.isEdit = true;
      this.carregarNotaFiscal(this.notaFiscalId);
    }
  }

  carregarFornecedores(): void {
    this.loading = true;
    this.supplierService.pesquisar().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Erro ao carregar suppliers');
        this.loading = false;
      },
    });
  }

  carregarNotaFiscal(id: number): void {
    this.loading = true;
    this.InvoiceService.buscarPorId(id).subscribe({
      next: (notaFiscal) => {
        this.form.patchValue({
          ...notaFiscal,
          fornecedor_id: notaFiscal.fornecedor.id,
        });
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Erro ao carregar nota fiscal');
        this.router.navigate(['/notas-fiscais']);
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

    const fornecedorSelecionado = this.suppliers.find(
      (f) => f.id === formValue.fornecedor_id
    );

    const notaFiscal: Omit<Invoice, 'id' | 'itens'> = {
      ...formValue,
      fornecedor_id: fornecedorSelecionado?.id!,
      itens: [], // Itens serão adicionados posteriormente
    };

    if (this.isEdit && this.notaFiscalId) {
      this.atualizarNotaFiscal(this.notaFiscalId, notaFiscal);
    } else {
      this.criarNotaFiscal(notaFiscal);
    }
  }

  private criarNotaFiscal(notaFiscal: Omit<Invoice, 'id' | 'itens'>): void {
    this.InvoiceService.criar(notaFiscal).subscribe({
      next: () => {
        this.mostrarSucesso('Nota fiscal criada com sucesso');
        this.router.navigate(['/notas']);
      },
      error: (erro) => {
        this.mostrarErro(erro.error?.message || 'Erro ao criar nota fiscal');
        this.loading = false;
      },
    });
  }

  private atualizarNotaFiscal(
    id: number,
    notaFiscal: Omit<Invoice, 'id' | 'itens'>
  ): void {
    this.InvoiceService.atualizar(id, notaFiscal).subscribe({
      next: () => {
        this.mostrarSucesso('Nota fiscal atualizada com sucesso');
        this.router.navigate(['/notas']);
      },
      error: (erro) => {
        this.mostrarErro(
          erro.error?.message || 'Erro ao atualizar nota fiscal'
        );
        this.loading = false;
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
