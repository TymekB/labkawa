import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

const WISER_WIDGET_ID = '6a3babda68fbcf2d5f94340a';
const WISER_SCRIPT_SRC = `https://embed.wiserreview.com/embed/${WISER_WIDGET_ID}/widget.js`;
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

        <div data-type="carousel" class="wiser_review_carousel" data-id="6a3babda68fbcf2d5f94340a"></div>

        <div class="text-center" style="margin-top: 28px;">
          <a class="btn btn--ghost" [href]="reviewsUrl" target="_blank" rel="noopener">
            Zobacz wszystkie opinie w Google
          </a>
        </div>
      </div>
    </section>
  `,
})
export class GoogleReviewsComponent implements AfterViewInit {
  readonly reviewsUrl = GOOGLE_REVIEWS_URL;
  readonly rating = RATING;
  readonly count = REVIEW_COUNT;

  ngAfterViewInit(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document
      .querySelectorAll<HTMLScriptElement>('script[data-wiser-review]')
      .forEach((s) => s.remove());

    const script = document.createElement('script');
    script.src = WISER_SCRIPT_SRC;
    script.defer = true;
    script.setAttribute('data-wiser-review', '');
    document.body.appendChild(script);
  }
}
