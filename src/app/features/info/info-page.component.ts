import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INFO_PAGE_MAP } from './info-pages.data';
import { NbspPipe } from '../../shared/pipes/nbsp.pipe';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [RouterLink, NbspPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (page(); as p) {
      <section class="ip-hero">
        <div class="container">
          <nav class="crumbs">
            <a routerLink="/">Strona główna</a> <span>/</span> {{ p.title }}
          </nav>
          <h1><span class="ip-hero__icon" aria-hidden="true">{{ p.icon }}</span> {{ p.title | nbsp }}</h1>
          <p class="ip-hero__lead">{{ p.lead | nbsp }}</p>
        </div>
      </section>

      <section class="section section--tight">
        <div class="container">
          <div class="ip-body">
          @for (s of p.sections; track s.heading) {
            <div class="ip-block">
              <h2>{{ s.heading | nbsp }}</h2>
              @for (para of s.paragraphs; track para) {
                <p>{{ para | nbsp }}</p>
              }
              @if (s.bullets?.length) {
                <ul class="ip-list">
                  @for (b of s.bullets; track b) {
                    <li>{{ b | nbsp }}</li>
                  }
                </ul>
              }
            </div>
          }

          @if (p.cta; as cta) {
            <div class="ip-cta">
              @if (cta.query) {
                <a [routerLink]="cta.link" [queryParams]="cta.query" class="btn btn--primary">{{ cta.text }}</a>
              } @else {
                <a [routerLink]="cta.link" class="btn btn--primary">{{ cta.text }}</a>
              }
            </div>
          }
          </div>
        </div>
      </section>
    } @else {
      <section class="section">
        <div class="container empty card">
          <span class="empty__icon">🤔</span>
          <h3>Nie znaleziono strony</h3>
          <p>Strona o podanym adresie nie istnieje lub została przeniesiona.</p>
          <a routerLink="/" class="btn btn--primary">Wróć na stronę główną</a>
        </div>
      </section>
    }
  `,
  styles: [`
    .ip-hero { background: linear-gradient(160deg, #eaf6fd, #f6fafd); padding: 40px 0 36px; border-bottom: 1px solid var(--line); }
    .crumbs { font-size: .85rem; color: var(--muted); }
    .crumbs a { color: var(--brand-700); }
    .crumbs span { margin: 0 6px; }
    .ip-hero h1 { margin: 10px 0 10px; display: flex; align-items: center; gap: 12px; }
    .ip-hero__icon { font-size: 1.6rem; }
    .ip-hero__lead { color: var(--ink-soft); margin: 0; max-width: 720px; font-size: 1.1rem; line-height: 1.7; }

    .ip-body { max-width: 800px; }
    .ip-block { margin-bottom: 28px; }
    .ip-block h2 { font-size: 1.3rem; margin-bottom: 12px; }
    .ip-block p { color: var(--ink-soft); line-height: 1.8; margin: 0 0 12px; }
    .ip-list { list-style: none; padding: 0; margin: 8px 0 0; }
    .ip-list li {
      position: relative; padding: 9px 0 9px 30px; color: var(--ink-soft);
      border-bottom: 1px dashed var(--line); line-height: 1.5;
    }
    .ip-list li::before { content: '✓'; position: absolute; left: 0; top: 9px; color: var(--success); font-weight: 800; }
    .ip-cta { margin-top: 8px; }

    .empty { text-align: center; padding: 56px 24px; }
    .empty__icon { font-size: 3rem; display: block; margin-bottom: 12px; }
    .empty h3 { margin-bottom: 8px; }
    .empty p { color: var(--ink-soft); max-width: 420px; margin: 0 auto 20px; }
  `],
})
export class InfoPageComponent {
  readonly slug = input('');
  readonly page = computed(() => INFO_PAGE_MAP[this.slug()]);
}
