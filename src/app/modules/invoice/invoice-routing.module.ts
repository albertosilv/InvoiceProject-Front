import { NgModule } from '@angular/core';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { RouterModule } from '@angular/router';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

const invoiceRoutes = [
  {
    path: '',
    component: InvoiceListComponent,
  },
  {
    path: 'novo',
    component: InvoiceFormComponent,
  },
  {
    path: 'detalhes/:id',
    component: InvoiceDetailsComponent,
  },
  {
    path: 'editar/:id',
    component: InvoiceFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoiceRoutes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
