import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="ft">
      <div class="container ft__top">
        <div class="ft__brand">
          <app-logo [light]="true" />
          <p>Niepubliczny Zakład Opieki Zdrowotnej. Diagnostyka laboratoryjna na najwyższym poziomie od ponad 20 lat.</p>
          <div class="ft__social" aria-label="Media społecznościowe">
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="Google">G</a>
          </div>
        </div>

        <div class="ft__col">
          <h4>Pacjent</h4>
          <a routerLink="/badania">Katalog badań</a>
          <a routerLink="/pakiety">Pakiety badań</a>
          <a routerLink="/punkty-pobran">Punkty pobrań</a>
          <a routerLink="/dla-pacjenta">Jak się przygotować</a>
        </div>

        <div class="ft__col">
          <h4>Artykuły</h4>
          <a routerLink="/badanie-kalu-na-pasozyty">Badanie kału na pasożyty</a>
          <a routerLink="/krew-utajona-w-kale">Krew utajona w kale</a>
          <a routerLink="/badania-mykologiczne">Badania mykologiczne</a>
          <a routerLink="/diagnostyka-jelit">Diagnostyka jelit</a>
          <a routerLink="/jak-pobrac-probke-kalu">Jak pobrać próbkę kału</a>
        </div>

        <div class="ft__col">
          <h4>Kontakt</h4>
          <p class="ft__contact">📞 <a href="tel:+48158362888">+48 15 836 28 88</a></p>
          <p class="ft__contact">📞 <a href="tel:+48604427483">+48 604 427 483</a></p>
          <p class="ft__contact">✉️ <a href="mailto:labkawa@vp.pl">labkawa&#64;vp.pl</a></p>
          <p class="ft__contact">📍 ul. Piłsudskiego 17, 39-432 Gorzyce</p>
        </div>
      </div>

      <div class="ft__bottom">
        <div class="container ft__bottom-inner">
          <span>© {{ year }} LabKawa. Wszelkie prawa zastrzeżone.</span>
          <nav class="ft__legal">
            <a href="#">Polityka prywatności</a>
            <a href="#">Regulamin</a>
            <a href="#">RODO</a>
          </nav>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = 2026;
}
