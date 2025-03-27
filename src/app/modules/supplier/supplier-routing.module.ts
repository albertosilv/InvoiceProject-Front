import { NgModule } from '@angular/core';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { RouterModule } from '@angular/router';

const supplierRoutes = [
  {
    path: '',
    component: SupplierListComponent,
  },
  {
    path: 'novo',
    component: SupplierFormComponent,
  },
  {
    path: 'editar/:id',
    component: SupplierFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(supplierRoutes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
