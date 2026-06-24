import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly sent = signal(false);
  readonly sending = signal(false);
  readonly error = signal(false);

  readonly model = {
    name: '',
    email: '',
    message: '',
  };

  async submit(form: NgForm): Promise<void> {
    if (form.invalid) {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
      return;
    }

    this.sending.set(true);
    this.error.set(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'd59d982d-a89b-4353-b9d1-d590730df64f',
          name: this.model.name,
          email: this.model.email,
          message: this.model.message,
          subject: 'Nowa wiadomość z formularza labkawa.pl',
          from_name: 'labkawa.pl',
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error('send failed');
      }

      this.sent.set(true);
      form.resetForm();
    } catch {
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }
}
