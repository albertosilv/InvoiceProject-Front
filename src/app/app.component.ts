import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'nota-fiscal-app';
  items: MenuItem[] = [
    {
      label: 'Início',
      icon: 'pi pi-home',
      routerLink: '/',
    },
    {
      label: 'Produtos',
      icon: 'pi pi-shopping-bag',
      routerLink: '/produtos',
    },
    {
      label: 'Fornecedores',
      icon: 'pi pi-truck',
      routerLink: '/fornecedores',
    },
    {
      label: 'Notas Fiscais',
      icon: 'pi pi-file-pdf',
      routerLink: '/notas',
    },
  ];
}
