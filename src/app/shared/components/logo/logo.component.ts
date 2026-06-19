import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/" class="logo" [class.logo--light]="light()" aria-label="LabKawa — strona główna">
      <img class="logo__img" src="logo.png" width="250" height="89"
           alt="LabKawa — Laboratorium diagnostyczne" />
    </a>
  `,
  styles: [`
    .logo { display: inline-flex; align-items: center; }
    .logo__img { height: 44px; width: auto; display: block; }
    /* on the dark footer the colored logo sits on a white chip for legibility */
    .logo--light .logo__img {
      background: #fff; padding: 6px 10px; border-radius: 10px; box-sizing: content-box;
    }
    @media (max-width: 480px) { .logo__img { height: 38px; } }
  `],
})
export class LogoComponent {
  readonly light = input(false);
}
