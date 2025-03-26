import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';

const produtoRoutes = [
  {
    path: '', // Rota base: /produtos
    component: ProductListComponent,
  },
  {
    path: 'novo', // Rota completa: /produtos/novo
    component: ProductFormComponent,
  },
  {
    path: 'editar/:id', // Rota completa: /produtos/editar/1
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
