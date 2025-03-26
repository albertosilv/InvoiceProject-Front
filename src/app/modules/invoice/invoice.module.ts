import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Componentes
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,

    // PrimeNG
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    InvoiceListComponent,
    InvoiceFormComponent,
    InvoiceDetailsComponent,
  ],
})
export class InvoicesModule {}
