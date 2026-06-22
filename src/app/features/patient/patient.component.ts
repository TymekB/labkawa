import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbspPipe } from '../../shared/pipes/nbsp.pipe';

interface Faq { q: string; a: string; }
interface Tip { icon: string; title: string; text: string; }

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterLink, NbspPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  readonly openFaq = signal<number | null>(0);

  readonly tips: Tip[] = [
    { icon: '🌙', title: 'Bądź na czczo', text: 'Do większości badań krwi przyjdź rano, po 8–12 godzinach bez jedzenia. Możesz pić wodę.' },
    { icon: '💧', title: 'Nawodnij się', text: 'Wypij szklankę wody przed pobraniem — ułatwia to pobranie krwi.' },
    { icon: '🏃', title: 'Unikaj wysiłku', text: 'Dzień przed badaniem zrezygnuj z intensywnego wysiłku fizycznego i alkoholu.' },
    { icon: '💊', title: 'Leki', text: 'Poinformuj personel o przyjmowanych lekach. Leki na tarczycę przyjmij po pobraniu.' },
  ];

  readonly faqs: Faq[] = [
    { q: 'Czy potrzebuję skierowania?', a: 'Nie. Badania z naszego katalogu możesz wykonać prywatnie, bez skierowania. Realizujemy także badania w ramach NFZ.' },
    { q: 'Jak szybko otrzymam wyniki?', a: 'Czas oczekiwania zależy od badania — badania w kierunku pasożytów 4–5 dni roboczych, posiew kału około 9 dni, panele mikrobiologiczne do 7 dni. Czas jest podany przy każdym badaniu.' },
    { q: 'Jak odbieram wyniki?', a: 'Wyniki wysyłamy pocztą elektroniczną lub przygotowujemy do odbioru stacjonarnego w laboratorium. Prosimy o podpisanie zgody na przesłanie wyników drogą elektroniczną.' },
    { q: 'Jak zapłacić za badania?', a: 'Płatność realizujesz bezpośrednio w laboratorium — gotówką lub kartą. Sprzedaż online nie jest dostępna.' },
  ];

  toggle(i: number): void {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }
}
