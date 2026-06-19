import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';

interface Step { num: number; title: string; text: string; icon: string; }
interface Stat { value: string; label: string; }
interface Scope { label: string; text: string; icon: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, TestCardComponent, PackageCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  readonly catalog = inject(CatalogService);

  readonly query = signal('');
  readonly popular = computed(() => this.catalog.popularTests().slice(0, 4));
  readonly topPackages = this.catalog.packages().slice(0, 3);

  readonly steps: Step[] = [
    { num: 1, title: 'Wybierz badanie', text: 'Przeglądaj katalog badań kału — pojedyncze testy oraz gotowe panele diagnostyczne.', icon: '🔎' },
    { num: 2, title: 'Pobierz materiał', text: 'Pobierz próbkę kału zgodnie z instrukcją i zabezpiecz ją do transportu.', icon: '🧴' },
    { num: 3, title: 'Dostarcz próbkę', text: 'Dostarcz materiał osobiście lub wyślij kurierem w warunkach chłodniczych.', icon: '📦' },
    { num: 4, title: 'Odbierz wynik', text: 'Wynik przesyłamy pocztą lub e-mailem — zwykle w ciągu kilku dni roboczych.', icon: '📩' },
  ];

  readonly stats: Stat[] = [
    { value: '30+', label: 'badań kału' },
    { value: '13', label: 'paneli diagnostycznych' },
    { value: '4–5 dni', label: 'wynik badania pasożytów' },
    { value: '20 lat', label: 'doświadczenia' },
  ];

  readonly scopes: Scope[] = [
    {
      label: 'Badania parazytologiczne',
      icon: '🪱',
      text: 'Wykrywanie pasożytów jelitowych i ich jaj w kale metodą BIO-REPAIR — glisty, owsik, tasiemiec, włosogłówka, węgorek czy lamblia jelitowa. Pomagamy w diagnostyce i monitorowaniu zakażeń pasożytniczych u dzieci i dorosłych.',
    },
    {
      label: 'Badania mikrobiologiczne',
      icon: '🦠',
      text: 'Posiewy kału w kierunku drożdżaków Candida, bakterii i pleśni oraz wykrywanie patogenów takich jak Helicobacter pylori, Clostridium difficile, adeno-, rota- i norowirusy.',
    },
    {
      label: 'Markery i stan zapalny',
      icon: '🔬',
      text: 'Ocena stanu zapalnego i funkcji jelit: kalprotektyna i laktoferyna w kale, krew utajona (FOB) oraz pH kału z analizą resztek pokarmowych.',
    },
    {
      label: 'Dysbioza i mikroflora jelit',
      icon: '🧬',
      text: 'Ilościowa ocena mikroflory jelitowej oraz markery szczelności i pracy jelit: zonulina, alfa-1-antytrypsyna, elastaza trzustkowa, białko EPX i inne.',
    },
    {
      label: 'Panele diagnostyczne',
      icon: '📋',
      text: 'Gotowe zestawy badań kału — od podstawowych paneli pediatrycznych po rozbudowane panele łączące diagnostykę pasożytniczą, mikrobiologiczną i markery zapalne, w korzystniejszej cenie niż badania osobno.',
    },
  ];

  search(): void {
    const q = this.query().trim();
    this.router.navigate(['/badania'], { queryParams: q ? { q } : {} });
  }
}
