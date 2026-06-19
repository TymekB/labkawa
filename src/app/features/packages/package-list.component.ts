import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [RouterLink, PackageCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="container">
        <nav class="crumbs"><a routerLink="/">Strona główna</a> <span>/</span> Pakiety</nav>
        <h1>Pakiety badań</h1>
        <p>Gotowe zestawy badań dobrane przez diagnostów — kupując w pakiecie płacisz mniej niż za badania osobno.</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="grid grid--3">
          @for (pkg of packages(); track pkg.id) {
            <app-package-card [pkg]="pkg" />
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: '../tests/tests.scss',
})
export class PackageListComponent {
  private readonly catalog = inject(CatalogService);
  readonly packages = this.catalog.packages;
}
