import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { CnpjPipe } from '../../core/pipe/cnpj.pipe';
import { SupplierRoutingModule } from './supplier-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SupplierRoutingModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    SupplierListComponent,
    SupplierFormComponent,
    CnpjPipe,
  ],
})
export class SuppliersModule {}
