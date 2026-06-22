import { ChangeDetectionStrategy, Component, ElementRef, OnInit, inject } from '@angular/core';

/**
 * Google Reviews — Elfsight widget integration.
 *
 * HOW TO ENABLE THE LIVE CAROUSEL:
 *  1. Załóż darmowe konto na https://elfsight.com i utwórz widget "Google Reviews"
 *     (wybierz layout typu Carousel/Slider), łącząc profil firmy w Google.
 *  2. Skopiuj ID widgetu z kodu osadzenia — wygląda jak: elfsight-app-XXXXXXXX-...
 *  3. Wklej samo ID (część po "elfsight-app-") poniżej w ELFSIGHT_APP_ID.
 *
 * Dopóki ELFSIGHT_APP_ID jest puste, sekcja pokazuje ocenę + przycisk do opinii w Google.
 */
const ELFSIGHT_APP_ID = '';
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Niepubliczny+Zak%C5%82ad+Opieki+Zdrowotnej+Laboratorium+Diagnostyczne+%22LAB%22+Opinie&hl=pl&tbm=lcl&rldimm=6633722661145730379#lkt=LocalPoiReviews';
const RATING = '4,7';
const REVIEW_COUNT = 28;

@Component({
  selector: 'app-google-reviews',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section--alt reviews">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Opinie</span>
          <h2>Co mówią nasi pacjenci</h2>
          <p>Ocena {{ rating }} / 5 na podstawie {{ count }} opinii w&nbsp;Google.</p>
        </div>

        @if (appId) {
          <div [class]="'elfsight-app-' + appId" data-elfsight-app-lazy></div>
        } @else {
          <div class="reviews__fallback card">
            <div class="reviews__score">
              <div class="reviews__rating">{{ rating }}</div>
              <div class="reviews__stars" aria-hidden="true">★★★★★</div>
              <div class="reviews__count">{{ count }} opinii w&nbsp;Google</div>
            </div>
            <a class="btn btn--primary" [href]="reviewsUrl" target="_blank" rel="noopener">
              Zobacz opinie w Google
            </a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .reviews__fallback {
      max-width: 520px; margin: 0 auto; padding: 32px;
      display: flex; flex-direction: column; align-items: center; gap: 22px; text-align: center;
    }
    .reviews__rating { font-size: 3.4rem; font-weight: 900; line-height: 1; color: var(--brand-700); }
    .reviews__stars { color: #f6b01e; font-size: 1.5rem; letter-spacing: 3px; margin: 6px 0 4px; }
    .reviews__count { color: var(--ink-soft); font-weight: 600; }
  `],
})
export class GoogleReviewsComponent implements OnInit {
  readonly appId = ELFSIGHT_APP_ID;
  readonly reviewsUrl = GOOGLE_REVIEWS_URL;
  readonly rating = RATING;
  readonly count = REVIEW_COUNT;

  private readonly host = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    if (!this.appId) {
      return;
    }
    if (!document.querySelector('script[data-elfsight-platform]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.setAttribute('data-elfsight-platform', '');
      document.body.appendChild(script);
    }
  }
}
