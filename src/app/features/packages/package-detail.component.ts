import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [RouterLink, PricePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './package-detail.component.html',
  styleUrl: '../tests/tests.scss',
})
export class PackageDetailComponent {
  readonly catalog = inject(CatalogService);

  readonly slug = input('');

  readonly pkg = computed(() => this.catalog.getPackage(this.slug()));
  readonly tests = computed(() => {
    const p = this.pkg();
    return p ? this.catalog.packageTests(p) : [];
  });
  readonly separatePrice = computed(() =>
    this.tests().reduce((sum, t) => sum + t.price, 0)
  );
  readonly savings = computed(() => {
    const p = this.pkg();
    return p ? Math.max(0, this.separatePrice() - p.price) : 0;
  });
}
