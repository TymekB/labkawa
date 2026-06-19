import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss',
})
export class PointsComponent {
  private readonly catalog = inject(CatalogService);

  readonly city = signal('');
  readonly onlyHome = signal(false);
  readonly onlySaturday = signal(false);

  readonly cities = this.catalog.cities;

  readonly results = computed(() => {
    const city = this.city();
    const home = this.onlyHome();
    const sat = this.onlySaturday();
    return this.catalog.points().filter((p) => {
      if (city && p.city !== city) return false;
      if (home && !p.homeService) return false;
      if (sat && !p.openSaturday) return false;
      return true;
    });
  });

  reset(): void {
    this.city.set('');
    this.onlyHome.set(false);
    this.onlySaturday.set(false);
  }
}
