import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'LabKawa — badania laboratoryjne online',
  },
  {
    path: 'badania',
    loadComponent: () =>
      import('./features/tests/test-list.component').then((m) => m.TestListComponent),
    title: 'Katalog badań — LabKawa',
  },
  {
    path: 'badania/:slug',
    loadComponent: () =>
      import('./features/tests/test-detail.component').then((m) => m.TestDetailComponent),
    title: 'Badanie — LabKawa',
  },
  {
    path: 'pakiety',
    loadComponent: () =>
      import('./features/packages/package-list.component').then((m) => m.PackageListComponent),
    title: 'Pakiety badań — LabKawa',
  },
  {
    path: 'pakiety/:slug',
    loadComponent: () =>
      import('./features/packages/package-detail.component').then((m) => m.PackageDetailComponent),
    title: 'Pakiet badań — LabKawa',
  },
  {
    path: 'punkty-pobran',
    loadComponent: () =>
      import('./features/points/points.component').then((m) => m.PointsComponent),
    title: 'Punkty pobrań — LabKawa',
  },
  {
    path: 'wyniki-online',
    loadComponent: () =>
      import('./features/results/results.component').then((m) => m.ResultsComponent),
    title: 'Wyniki online — LabKawa',
  },
  {
    path: 'dla-pacjenta',
    loadComponent: () =>
      import('./features/patient/patient.component').then((m) => m.PatientComponent),
    title: 'Dla pacjenta — LabKawa',
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Kontakt — LabKawa',
  },
  {
    path: 'badanie-kalu-na-pasozyty',
    loadComponent: () => import('./features/info/info-page.component').then((m) => m.InfoPageComponent),
    data: { slug: 'badanie-kalu-na-pasozyty' },
    title: 'Badanie kału na pasożyty — LabKawa',
  },
  {
    path: 'krew-utajona-w-kale',
    loadComponent: () => import('./features/info/info-page.component').then((m) => m.InfoPageComponent),
    data: { slug: 'krew-utajona-w-kale' },
    title: 'Krew utajona w kale — LabKawa',
  },
  {
    path: 'badania-mykologiczne',
    loadComponent: () => import('./features/info/info-page.component').then((m) => m.InfoPageComponent),
    data: { slug: 'badania-mykologiczne' },
    title: 'Badania mykologiczne — LabKawa',
  },
  {
    path: 'diagnostyka-jelit',
    loadComponent: () => import('./features/info/info-page.component').then((m) => m.InfoPageComponent),
    data: { slug: 'diagnostyka-jelit' },
    title: 'Diagnostyka jelit — LabKawa',
  },
  {
    path: 'instrukcja-pobrania-materialu',
    loadComponent: () => import('./features/info/info-page.component').then((m) => m.InfoPageComponent),
    data: { slug: 'instrukcja-pobrania-materialu' },
    title: 'Jak pobrać i wysłać materiał do badania — LabKawa',
  },
  { path: '**', redirectTo: '' },
];
