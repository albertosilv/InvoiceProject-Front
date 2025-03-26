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
  produtoId?: number;
  situacoes = Object.values(SituacaoProduct);
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
    this.produtoId = this.route.snapshot.params['id'];
    if (this.produtoId) {
      this.isEdit = true;
      this.carregarProduct(this.produtoId);
    }
  }

  carregarProduct(id: number): void {
    this.loading = true;
    this.productService.obterPorId(id).subscribe({
      next: (produto) => {
        this.form.patchValue(produto);
        this.loading = false;
      },
      error: () => {
        this.mostrarErro('Erro ao carregar produto');
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

    const produto = {
      ...formValue,
      situacao: SituacaoProductBackendMap[formValue.situacao],
    };

    if (this.isEdit && this.produtoId) {
      this.atualizarProduct(this.produtoId, produto);
    } else {
      this.criarProduct(produto);
    }
  }

  private criarProduct(produto: Omit<Product, 'id'>): void {
    this.productService.criar(produto).subscribe({
      next: () => {
        this.mostrarSucesso('Product criado com sucesso');
        this.router.navigate(['/produtos']);
      },
      error: (erro) => {
        this.mostrarErro(erro.error?.message || 'Erro ao criar produto');
        this.loading = false;
      },
    });
  }

  private atualizarProduct(id: number, produto: Product): void {
    this.productService.atualizar(id, produto).subscribe({
      next: () => {
        this.mostrarSucesso('Product atualizado com sucesso');
        this.router.navigate(['/produtos']);
      },
      error: (erro) => {
        this.mostrarErro(erro.error?.message || 'Erro ao atualizar produto');
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
