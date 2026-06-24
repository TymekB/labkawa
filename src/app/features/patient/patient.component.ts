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
    { icon: '🌙', title: 'Przyjdź na czczo', text: 'Do większości badań krwi zaleca się zgłosić rano, po 8–12 godzinach od ostatniego posiłku. W tym czasie można pić niewielkie ilości wody.' },
    { icon: '💧', title: 'Pamiętaj o nawodnieniu', text: 'Wypicie szklanki wody przed pobraniem krwi ułatwia pobranie materiału i poprawia komfort badania.' },
    { icon: '🏃', title: 'Unikaj intensywnego wysiłku', text: 'Na 24 godziny przed badaniem zrezygnuj z intensywnej aktywności fizycznej oraz spożywania alkoholu.' },
    { icon: '💊', title: 'Poinformuj o przyjmowanych lekach', text: 'Jeżeli stale przyjmujesz leki, skonsultuj z lekarzem lub personelem, czy mogą wpłynąć na wynik. Leki stosowane w chorobach tarczycy przyjmij po pobraniu krwi.' },
  ];

  readonly faqs: Faq[] = [
    { q: 'Czy potrzebuję skierowania?', a: 'Nie. Większość badań możesz wykonać prywatnie bez skierowania. Realizujemy również badania finansowane przez NFZ na podstawie ważnego skierowania.' },
    { q: 'Jak szybko otrzymam wyniki?', a: 'Czas oczekiwania zależy od rodzaju badania. Wyniki podstawowych badań dostępne są zazwyczaj w ciągu 1–2 dni roboczych, natomiast badania specjalistyczne mogą wymagać dłuższego czasu opracowania.' },
    { q: 'Jak odebrać wyniki?', a: 'Wyniki badań możesz odebrać online lub osobiście w punkcie pobrań, zgodnie z informacją przekazaną podczas rejestracji.' },
    { q: 'Jak mogę zapłacić za badania?', a: 'Płatności można dokonać gotówką lub kartą płatniczą w punkcie pobrań. Szczegółowe informacje uzyskasz podczas rejestracji.' },
  ];

  toggle(i: number): void {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }
}
