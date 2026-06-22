import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabTest } from '../../../core/models/catalog.models';
import { PricePipe } from '../../pipes/price.pipe';
import { NbspPipe } from '../../pipes/nbsp.pipe';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [RouterLink, PricePipe, NbspPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card tc">
      <div class="tc__head">
        <span class="badge">{{ test().code }}</span>
        @if (test().popular) { <span class="badge badge--hot">Popularne</span> }
      </div>
      <h3 class="tc__name">
        <a [routerLink]="['/badania', test().slug]">{{ test().name | nbsp }}</a>
      </h3>
      <p class="tc__desc">{{ test().description | nbsp }}</p>
      <ul class="tc__meta">
        <li>🧪 {{ test().material }}</li>
        <li>⏱ {{ test().turnaround }}</li>
      </ul>
      <div class="tc__foot">
        <span class="price">{{ test().price | price }}</span>
        <a class="btn btn--ghost btn--sm" [routerLink]="['/badania', test().slug]">Szczegóły →</a>
      </div>
    </article>
  `,
  styles: [`
    .tc { padding: 20px; display: flex; flex-direction: column; height: 100%; }
    .tc__head { display: flex; gap: 8px; margin-bottom: 12px; }
    .tc__name { font-size: 1.05rem; margin-bottom: 8px; }
    .tc__name a { color: var(--ink); }
    .tc__name a:hover { color: var(--brand-700); }
    .tc__desc { font-size: .88rem; color: var(--ink-soft); margin-bottom: 14px; flex: 1; }
    .tc__meta { list-style: none; display: flex; gap: 16px; padding: 0; margin: 0 0 16px; font-size: .82rem; color: var(--muted); text-transform: capitalize; }
    .tc__foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 14px; border-top: 1px solid var(--line); }
    .price { font-size: 1.25rem; }
  `],
})
export class TestCardComponent {
  readonly test = input.required<LabTest>();
}
