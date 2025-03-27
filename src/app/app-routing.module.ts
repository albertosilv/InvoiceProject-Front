import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'produtos',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductsModule),
  },
  {
    path: 'fornecedores',
    loadChildren: () =>
      import('./modules/supplier/supplier.module').then(
        (m) => m.SuppliersModule
      ),
  },
  {
    path: 'notas',
    loadChildren: () =>
      import('./modules/invoice/invoice.module').then((m) => m.InvoicesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
