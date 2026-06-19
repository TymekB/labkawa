import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MockResult {
  date: string;
  name: string;
  status: 'Gotowy' | 'W trakcie';
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  readonly login = signal('');
  readonly code = signal('');
  readonly loggedIn = signal(false);
  readonly error = signal('');

  readonly mockResults: MockResult[] = [
    { date: '2026-06-12', name: 'Pakiet podstawowy — profilaktyka', status: 'Gotowy' },
    { date: '2026-06-12', name: 'Witamina D (25-OH)', status: 'Gotowy' },
    { date: '2026-06-13', name: 'TSH', status: 'W trakcie' },
  ];

  submit(): void {
    if (!this.login().trim() || !this.code().trim()) {
      this.error.set('Podaj numer zlecenia oraz kod dostępu.');
      return;
    }
    this.error.set('');
    this.loggedIn.set(true);
  }

  logout(): void {
    this.loggedIn.set(false);
    this.login.set('');
    this.code.set('');
  }
}
