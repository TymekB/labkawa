import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'price', standalone: true })
export class PricePipe implements PipeTransform {
  private readonly fmt = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  transform(value: number | null | undefined): string {
    if (value == null) {
      return '';
    }
    return this.fmt.format(value);
  }
}
