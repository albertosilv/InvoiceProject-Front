import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  Supplier,
  SupplierStatus,
  SituacaoSupplierBackendMap,
} from '../../../core/models/supplier.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  imports: [
    ToastModule,
    RouterModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
})
export class SupplierFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  supplierId?: number;
  status = Object.values(SupplierStatus);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(50)]],
      razao: ['', [Validators.required, Validators.maxLength(200)]],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      telefone: ['', [Validators.required, Validators.maxLength(20)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      status: [SupplierStatus.ATIVO, Validators.required],
      data_desativacao: [null],
    });
  }

  ngOnInit(): void {
    this.supplierId = this.route.snapshot.params['id'];
    if (this.supplierId) {
      this.isEdit = true;
      this.getSupplier(this.supplierId);
    }
  }

  getSupplier(id: number): void {
    this.loading = true;
    this.supplierService.getById(id).subscribe({
      next: (supplier) => {
        this.form.patchValue({
          ...supplier,
          cnpj: this.formatedCNPJ(supplier.cnpj),
        });
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Erro ao carregar supplier');
        this.router.navigate(['/fornecedores']);
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

    const supplier = {
      ...formValue,
      cnpj: formValue.cnpj.replace(/\D/g, ''), // Remove formatação do CNPJ
      status: SituacaoSupplierBackendMap[formValue.status] || formValue.status,
    };

    if (this.isEdit && this.supplierId) {
      this.updateSupplier(this.supplierId, supplier);
    } else {
      this.criarFornecedor(supplier);
    }
  }

  private criarFornecedor(supplier: Omit<Supplier, 'id'>): void {
    this.supplierService.create(supplier).subscribe({
      next: () => {
        this.openMessageSucess('Fornecedor criado com sucesso');
        this.router.navigate(['/supplieres']);
      },
      error: (erro) => {
        this.openMessageError(erro.error?.message || 'Erro ao criar supplier');
        this.loading = false;
      },
    });
  }

  private updateSupplier(id: number, supplier: Supplier): void {
    this.supplierService.update(id, supplier).subscribe({
      next: () => {
        this.openMessageSucess('Fornecedor atualizado com sucesso');
        this.router.navigate(['/fornecedores']);
      },
      error: (erro) => {
        this.openMessageError(
          erro.error?.message || 'Erro ao atualizar supplier'
        );
        this.loading = false;
      },
    });
  }

  private formatedCNPJ(cnpj: string): string {
    if (!cnpj) return '';
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
  }

  confirmCanceled(): void {
    if (this.form.pristine) {
      this.router.navigate(['/fornecedores']);
      return;
    }

    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja cancelar? As alterações não serão salvas.',
      header: 'Confirmar Cancelamento',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.router.navigate(['/fornecedores']);
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
