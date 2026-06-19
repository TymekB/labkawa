import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main class="app-main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    .app-main { flex: 1; }
  `],
})
export class AppComponent {
  // Scroll to top only when the path changes (real page navigation),
  // not when just query params change (e.g. category/search filters).
  private previousPath = '';

  constructor() {
    inject(Router).events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((e) => {
        const path = e.urlAfterRedirects.split('?')[0];
        if (path !== this.previousPath) {
          this.previousPath = path;
          window.scrollTo({ top: 0 });
        }
      });
  }
}
