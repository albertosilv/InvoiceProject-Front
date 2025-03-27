import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  SituacaoProduct,
  Product,
  SituacaoProductBackendMap,
} from '../../../core/models/product.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-form',
  templateUrl: './product-form.component.html',
  imports: [
    ToastModule,
    RouterModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  productId?: number;
  status = Object.values(SituacaoProduct);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      situacao: [SituacaoProduct.ATIVO, Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.getProduct(this.productId);
    }
  }

  getProduct(id: number): void {
    this.loading = true;
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.form.patchValue(product);
        this.loading = false;
      },
      error: () => {
        this.openMessageError('Erro ao carregar produto');
        this.router.navigate(['/produtos']);
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

    const product = {
      ...formValue,
      situacao: SituacaoProductBackendMap[formValue.situacao],
    };

    if (this.isEdit && this.productId) {
      this.updateProduct(this.productId, product);
    } else {
      this.createProduct(product);
    }
  }

  private createProduct(product: Omit<Product, 'id'>): void {
    this.productService.create(product).subscribe({
      next: () => {
        this.openMessageSucess('Produto criado com sucesso');
        this.router.navigate(['/produtos']);
      },
      error: (erro) => {
        this.openMessageError(erro.error?.message || 'Erro ao criar produto');
        this.loading = false;
      },
    });
  }

  private updateProduct(id: number, product: Product): void {
    this.productService.update(id, product).subscribe({
      next: () => {
        this.openMessageSucess('Produto atualizado com sucesso');
        this.router.navigate(['/produtos']);
      },
      error: (erro) => {
        this.openMessageError(
          erro.error?.message || 'Erro ao atualizar produto'
        );
        this.loading = false;
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
