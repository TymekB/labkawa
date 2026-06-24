import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { NbspPipe } from '../../shared/pipes/nbsp.pipe';

interface Step { num: number; title: string; text: string; icon: string; }
interface Stat { value: string; label: string; text?: boolean; }
interface Scope { label: string; text: string; icon: string; }
interface Spec { label: string; text: string; icon: string; top?: boolean; }
interface Knowledge { title: string; text: string; icon: string; link: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, TestCardComponent, PackageCardComponent, NbspPipe],
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
    { num: 4, title: 'Odbierz wynik', text: 'Wynik wysyłamy pocztą elektroniczną lub przygotowujemy do odbioru stacjonarnego — zwykle w ciągu kilku dni roboczych.', icon: '📩' },
  ];

  readonly stats: Stat[] = [
    { value: '1998', label: 'ponad 25 lat działalności' },
    { value: '40 lat', label: 'doświadczenia w diagnostyce laboratoryjnej' },
    { value: 'Pacjenci z całej Polski', label: 'zaufali nam pacjenci z kraju i zagranicy', text: true },
    { value: 'Specjalistyczna diagnostyka jelit', label: 'pasożyty, mikrobiologia i badania kału', text: true },
  ];

  readonly about = {
    intro: [
      'Laboratorium Kawa działa nieprzerwanie od 1998 roku, zapewniając rzetelną diagnostykę laboratoryjną pacjentom z całej Polski. Przez ponad ćwierć wieku wykonaliśmy tysiące badań, zdobywając zaufanie zarówno pacjentów, jak i lekarzy różnych specjalizacji.',
      'Naszą szczególną renomę zbudowaliśmy w zakresie diagnostyki kału, badań pasożytologicznych oraz badań mikrobiologicznych. To właśnie dlatego próbki do badań trafiają do nas nie tylko z Tarnobrzega, Gorzyc i Podkarpacia, ale również z wielu regionów Polski, a także od pacjentów przebywających za granicą.',
    ],
    bio: 'Laboratorium prowadzi mgr Maria Kawa — specjalista mikrobiologii oraz analityki medycznej, absolwentka Collegium Medicum Uniwersytetu Jagiellońskiego. Wieloletnie doświadczenie zawodowe oraz nieustanne doskonalenie metod diagnostycznych pozwoliły stworzyć miejsce cenione za dokładność, rzetelność i indywidualne podejście do każdego pacjenta.',
    reasons: [
      'Wieloletnie doświadczenie w diagnostyce laboratoryjnej',
      'Specjalizacja w badaniach kału i diagnostyce pasożytów',
      'Staranna analiza każdej próbki',
      'Bezpośredni nadzór wykwalifikowanego diagnosty laboratoryjnego',
      'Zaufanie budowane od 1998 roku',
    ],
    mission: 'W naszej pracy łączymy wiedzę, nowoczesną diagnostykę oraz najwyższe standardy jakości, aby dostarczać wyniki, którym można zaufać.',
  };

  readonly scopes: Scope[] = [
    {
      label: 'Badania parazytologiczne',
      icon: '🪱',
      text: 'Diagnostyka pasożytów przewodu pokarmowego, w tym glisty ludzkiej, owsika, tasiemców, włosogłówki, węgorka jelitowego oraz lamblii. Badania pomagają wykrywać i monitorować zakażenia pasożytnicze u dzieci i dorosłych.',
    },
    {
      label: 'Badania mikrobiologiczne',
      icon: '🦠',
      text: 'Posiewy oraz badania w kierunku bakterii, grzybów i wirusów odpowiedzialnych za infekcje przewodu pokarmowego, w tym Helicobacter pylori, Clostridioides difficile, rotawirusów, norowirusów i adenowirusów.',
    },
    {
      label: 'Markery stanu zapalnego jelit',
      icon: '🔬',
      text: 'Badania wspierające diagnostykę chorób zapalnych jelit oraz ocenę ich aktywności. Obejmują między innymi kalprotektynę, laktoferynę, krew utajoną w kale (FOB) oraz ocenę pH kału.',
    },
    {
      label: 'Ocena mikroflory jelitowej i dysbiozy',
      icon: '🧬',
      text: 'Kompleksowa analiza mikrobioty jelitowej oraz parametrów związanych z funkcjonowaniem bariery jelitowej, trawieniem i wchłanianiem składników odżywczych.',
    },
    {
      label: 'Panele diagnostyczne',
      icon: '📋',
      text: 'Starannie opracowane pakiety badań pozwalające na kompleksową ocenę zdrowia przewodu pokarmowego. To wygodne i korzystne cenowo rozwiązanie dla osób wymagających szerszej diagnostyki.',
    },
  ];

  readonly specializations: Spec[] = [
    { label: 'Panele ginekologiczne', icon: '🌸', top: true, text: 'Kompleksowa diagnostyka ginekologiczna wykonywana we współpracy z lekarzami specjalistami.' },
    { label: 'Diagnostyka przewodu pokarmowego i badania kału', icon: '🧫', top: true, text: 'Zaawansowane badania mikrobiologiczne, parazytologiczne oraz diagnostyka schorzeń układu pokarmowego.' },
    { label: 'Mikrobiologia i diagnostyka zakażeń', icon: '🦠', top: true, text: 'Posiewy, identyfikacja drobnoustrojów oraz ocena skuteczności leczenia infekcji.' },
    { label: 'Diagnostyka prenatalna', icon: '👶', text: 'Badania wspierające zdrowie matki i dziecka na każdym etapie ciąży.' },
    { label: 'Diagnostyka hormonalna', icon: '⚗️', text: 'Ocena gospodarki hormonalnej, tarczycy oraz hormonów płciowych.' },
    { label: 'Gastrologia', icon: '🩺', text: 'Diagnostyka chorób układu pokarmowego wspierająca lekarzy gastroenterologów.' },
    { label: 'Trychologia', icon: '✂️', text: 'Badania pomocne w diagnostyce problemów skóry głowy oraz wypadania włosów.' },
    { label: 'Profilaktyka i diagnostyka ogólna', icon: '❤️', text: 'Badania kontrolne, pakiety profilaktyczne oraz monitorowanie stanu zdrowia.' },
  ];

  readonly knowledge: Knowledge[] = [
    { title: 'Badanie kału na pasożyty — kiedy warto je wykonać?', icon: '📖', text: 'Co może wykazać badanie kału na pasożyty i jakie objawy powinny skłonić do diagnostyki.', link: '/badanie-kalu-na-pasozyty' },
    { title: 'Krew utajona w kale — co oznacza dodatni wynik?', icon: '📖', text: 'Dlaczego krew utajona jest ważnym badaniem przesiewowym i jak interpretować wynik.', link: '/krew-utajona-w-kale' },
    { title: 'Badania mykologiczne — grzyby i drożdżaki w jelitach', icon: '📖', text: 'Jak wykryć grzyby i drożdżaki w przewodzie pokarmowym i kiedy warto wykonać posiew.', link: '/badania-mykologiczne' },
    { title: 'Diagnostyka jelit — bóle brzucha, biegunki i wzdęcia', icon: '📖', text: 'Jakie badania wykonać przy przewlekłych dolegliwościach trawiennych i dysbiozie.', link: '/diagnostyka-jelit' },
  ];

  search(): void {
    const q = this.query().trim();
    this.router.navigate(['/badania'], { queryParams: q ? { q } : {} });
  }
}
