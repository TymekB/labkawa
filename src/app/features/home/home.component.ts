import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { NbspPipe } from '../../shared/pipes/nbsp.pipe';
import { GoogleReviewsComponent } from '../reviews/google-reviews.component';

interface Step { num: number; title: string; text: string; icon: string; }
interface Stat { value: string; label: string; text?: boolean; }
interface Scope { label: string; text: string; icon: string; }
interface Spec { label: string; text: string; icon: string; priority?: boolean; }
interface Knowledge { title: string; text: string; icon: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, TestCardComponent, PackageCardComponent, NbspPipe, GoogleReviewsComponent],
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
    { value: '1998', label: 'rok założenia laboratorium' },
    { value: '39+', label: 'lat doświadczenia kierownika laboratorium' },
    { value: 'Cała Polska', label: 'pacjenci z kraju i zagranicy', text: true },
    { value: 'Kał i pasożyty', label: 'nasza specjalizacja', text: true },
  ];

  readonly about = {
    intro: [
      'Laboratorium Kawa działa nieprzerwanie od 1998 roku, zapewniając rzetelną diagnostykę laboratoryjną pacjentom z całej Polski. Przez ponad ćwierć wieku wykonaliśmy tysiące badań, zdobywając zaufanie zarówno pacjentów, jak i lekarzy różnych specjalizacji.',
      'Naszą szczególną renomę zbudowaliśmy w zakresie diagnostyki kału, badań pasożytologicznych oraz badań mikrobiologicznych. To właśnie dlatego próbki do badań trafiają do nas nie tylko z Tarnobrzega, Gorzyc i Podkarpacia, ale również z wielu regionów Polski, a także od pacjentów przebywających za granicą.',
    ],
    bio: 'Za laboratorium stoi Maria Kawa, diagnosta laboratoryjny, absolwentka Collegium Medicum Uniwersytetu Jagiellońskiego, która ukończyła studia w 1986 roku. Wieloletnie doświadczenie zawodowe oraz nieustanne doskonalenie metod diagnostycznych pozwoliły stworzyć laboratorium cenione za dokładność, rzetelność i indywidualne podejście do każdego badania.',
    reasons: [
      'Wieloletnie doświadczenie w diagnostyce laboratoryjnej',
      'Specjalizacja w badaniach kału i diagnostyce pasożytów',
      'Staranna analiza każdej próbki',
      'Bezpośredni nadzór wykwalifikowanego diagnosty laboratoryjnego',
      'Zaufanie budowane od 1998 roku',
    ],
    mission: 'Wierzymy, że dobra diagnostyka jest fundamentem skutecznego leczenia. Dlatego od ponad 25 lat dostarczamy pacjentom i lekarzom wiarygodne wyniki badań, pomagając w podejmowaniu właściwych decyzji diagnostycznych i terapeutycznych.',
  };

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

  readonly specializations: Spec[] = [
    { label: 'Panele ginekologiczne', icon: '🌸', priority: true, text: 'Priorytetowy obszar naszego laboratorium — kompleksowa diagnostyka ginekologiczna we współpracy z lekarzami w powiecie.' },
    { label: 'Diagnostyka prenatalna', icon: '👶', text: 'Badania wspierające zdrowie matki i dziecka na każdym etapie ciąży.' },
    { label: 'Zdrowie kobiet i mężczyzn', icon: '⚕️', text: 'Diagnostyka dopasowana do potrzeb kobiet i mężczyzn na każdym etapie życia.' },
    { label: 'Diagnostyka hormonalna', icon: '⚗️', text: 'Ocena gospodarki hormonalnej — tarczyca, hormony płciowe i inne kluczowe parametry.' },
    { label: 'Diagnostyka w autyzmie', icon: '🧩', text: 'Badania laboratoryjne wspierające diagnostykę i monitorowanie spektrum autyzmu.' },
    { label: 'Trychologia', icon: '✂️', text: 'Diagnostyka problemów skóry głowy i włosów we współpracy z trychologami.' },
    { label: 'Gastrologia', icon: '🩺', text: 'Badania układu pokarmowego wspierające pracę gastrologów.' },
  ];

  readonly knowledge: Knowledge[] = [
    { title: 'Autyzm w badaniach', icon: '🧩', text: 'Jakie badania laboratoryjne wspierają diagnostykę spektrum autyzmu i na co zwrócić uwagę.' },
    { title: 'Ferrytyna w badaniach', icon: '🧪', text: 'Dlaczego ferrytyna to czuły wskaźnik zapasów żelaza i kiedy warto ją oznaczyć.' },
    { title: 'Żelazo u kobiet', icon: '♀️', text: 'Niedobór żelaza to częsty problem u kobiet — sprawdź, jakie badania warto wykonać.' },
    { title: 'Testosteron u mężczyzn', icon: '♂️', text: 'Rola testosteronu w zdrowiu mężczyzn i kiedy warto skontrolować jego poziom.' },
  ];

  search(): void {
    const q = this.query().trim();
    this.router.navigate(['/badania'], { queryParams: q ? { q } : {} });
  }
}
