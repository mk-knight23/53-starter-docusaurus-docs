import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/docs/components/docs-page.component').then(m => m.DocsPageComponent),
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./features/docs/components/docs-page.component').then(m => m.DocsPageComponent)
  }
];
