import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';

interface NavItem { label: string; link: string; }

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);

  readonly query = signal('');
  readonly mobileOpen = signal(false);
  readonly articlesOpen = signal(false);

  readonly nav: NavItem[] = [
    { label: 'Badania', link: '/badania' },
    { label: 'Pakiety', link: '/pakiety' },
    { label: 'Punkty pobrań', link: '/punkty-pobran' },
    { label: 'Dla pacjenta', link: '/dla-pacjenta' },
  ];

  readonly articles: NavItem[] = [
    { label: 'Badanie kału na pasożyty', link: '/badanie-kalu-na-pasozyty' },
    { label: 'Krew utajona w kale', link: '/krew-utajona-w-kale' },
    { label: 'Badania mykologiczne', link: '/badania-mykologiczne' },
    { label: 'Diagnostyka jelit', link: '/diagnostyka-jelit' },
    { label: 'Jak pobrać próbkę kału', link: '/jak-pobrac-probke-kalu' },
  ];

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    this.articlesOpen.set(false);
  }

  toggleArticles(): void {
    this.articlesOpen.update((v) => !v);
  }

  search(): void {
    const q = this.query().trim();
    this.router.navigate(['/badania'], {
      queryParams: q ? { q } : {},
    });
    this.closeMobile();
  }
}
