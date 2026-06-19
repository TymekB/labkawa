import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [RouterLink, FormsModule, TestCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './test-list.component.html',
  styleUrl: './tests.scss',
})
export class TestListComponent {
  private readonly router = inject(Router);
  readonly catalog = inject(CatalogService);

  /** bound from query params via withComponentInputBinding */
  readonly q = input('');
  readonly kategoria = input('');

  readonly term = signal('');
  readonly categories = this.catalog.categories;

  private readonly activeCategoryId = computed(() => {
    const slug = this.kategoria();
    return slug ? this.catalog.getCategory(slug)?.id ?? '' : '';
  });

  readonly activeCategory = computed(() =>
    this.kategoria() ? this.catalog.getCategory(this.kategoria()) : undefined
  );

  readonly results = computed(() =>
    this.catalog.searchTests(this.term(), this.activeCategoryId())
  );

  constructor() {
    // keep the search box in sync with the URL ?q= param
    effect(() => this.term.set(this.q() ?? ''), { allowSignalWrites: true });
  }

  applySearch(): void {
    this.navigate({ q: this.term().trim() || null });
  }

  selectCategory(slug: string | null): void {
    this.navigate({ kategoria: slug });
  }

  clearFilters(): void {
    this.term.set('');
    this.router.navigate(['/badania']);
  }

  private navigate(params: Record<string, string | null>): void {
    this.router.navigate(['/badania'], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
