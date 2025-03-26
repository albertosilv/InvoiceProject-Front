import { NgModule } from '@angular/core';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { RouterModule } from '@angular/router';

const supplierRoutes = [
  {
    path: '', // Rota base: /produtos
    component: SupplierListComponent,
  },
  {
    path: 'novo', // Rota completa: /produtos/novo
    component: SupplierFormComponent,
  },
  {
    path: 'editar/:id', // Rota completa: /produtos/editar/1
    component: SupplierFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(supplierRoutes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
