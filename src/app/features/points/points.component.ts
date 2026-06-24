import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss',
})
export class PointsComponent {
  private readonly catalog = inject(CatalogService);

  readonly points = this.catalog.points;
}
