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
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';

@Component({
  selector: 'app-test-detail',
  standalone: true,
  imports: [RouterLink, PricePipe, TestCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './test-detail.component.html',
  styleUrl: './tests.scss',
})
export class TestDetailComponent {
  readonly catalog = inject(CatalogService);

  readonly slug = input('');

  readonly test = computed(() => this.catalog.getTest(this.slug()));
  readonly category = computed(() => {
    const t = this.test();
    return t ? this.catalog.getCategoryById(t.categoryId) : undefined;
  });
  readonly related = computed(() => {
    const t = this.test();
    if (!t) return [];
    return this.catalog
      .searchTests('', t.categoryId)
      .filter((x) => x.id !== t.id)
      .slice(0, 3);
  });
}
