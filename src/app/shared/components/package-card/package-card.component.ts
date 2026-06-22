import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestPackage } from '../../../core/models/catalog.models';
import { CatalogService } from '../../../core/services/catalog.service';
import { PricePipe } from '../../pipes/price.pipe';
import { NbspPipe } from '../../pipes/nbsp.pipe';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [RouterLink, PricePipe, NbspPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card pc">
      @if (pkg().badge) {
        <span class="pc__ribbon" [class.pc__ribbon--promo]="pkg().badge === 'Promocja'">{{ pkg().badge }}</span>
      }
      <h3 class="pc__name">
        <a [routerLink]="['/pakiety', pkg().slug]">{{ pkg().name | nbsp }}</a>
      </h3>
      <p class="pc__desc">{{ pkg().description | nbsp }}</p>
      <p class="pc__count">📋 {{ pkg().testCodes.length }} badań w pakiecie</p>
      <ul class="pc__tests">
        @for (t of tests(); track t.id) {
          <li>{{ t.name }}</li>
        }
      </ul>
      <div class="pc__foot">
        <div class="pc__price">
          @if (pkg().oldPrice) { <span class="price--old">{{ pkg().oldPrice | price }}</span> }
          <span class="price">{{ pkg().price | price }}</span>
        </div>
        <a class="btn btn--ghost btn--sm" [routerLink]="['/pakiety', pkg().slug]">Szczegóły →</a>
      </div>
    </article>
  `,
  styles: [`
    .pc { padding: 24px; position: relative; display: flex; flex-direction: column; height: 100%; overflow: hidden; }
    .pc__ribbon {
      position: absolute; top: 16px; right: -34px; transform: rotate(45deg);
      background: var(--brand); color: #fff; font-size: .68rem; font-weight: 800;
      letter-spacing: .04em; text-transform: uppercase; padding: 5px 40px;
    }
    .pc__ribbon--promo { background: var(--warning); }
    .pc__name { font-size: 1.2rem; margin-bottom: 8px; padding-right: 40px; }
    .pc__name a { color: var(--ink); }
    .pc__name a:hover { color: var(--brand-700); }
    .pc__desc { font-size: .9rem; color: var(--ink-soft); margin-bottom: 14px; }
    .pc__count { font-size: .85rem; font-weight: 700; color: var(--brand-700); margin-bottom: 10px; }
    .pc__tests { list-style: none; padding: 0; margin: 0 0 18px; flex: 1; }
    .pc__tests li { font-size: .86rem; color: var(--ink-soft); padding: 5px 0 5px 22px; position: relative; border-bottom: 1px dashed var(--line); }
    .pc__tests li::before { content: '✓'; position: absolute; left: 0; color: var(--success); font-weight: 800; }
    .pc__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 16px; border-top: 1px solid var(--line); }
    .pc__price .price { font-size: 1.5rem; }
  `],
})
export class PackageCardComponent {
  readonly pkg = input.required<TestPackage>();
  private readonly catalog = inject(CatalogService);

  tests() {
    return this.catalog.packageTests(this.pkg());
  }
}
