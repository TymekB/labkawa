import { Pipe, PipeTransform } from '@angular/core';

/**
 * Polish typography helper: glues one-letter words (a, i, o, u, w, z) to the
 * following word with a non-breaking space (U+00A0), so they never dangle at
 * the end of a line — especially visible on narrow / mobile layouts.
 */
@Pipe({ name: 'nbsp', standalone: true })
export class NbspPipe implements PipeTransform {
  private static readonly NBSP = String.fromCharCode(0xa0);
  // boundary (start or whitespace — \s also matches the NBSP we insert),
  // a single one-letter word, then a normal space to replace.
  private static readonly ORPHANS = /(^|\s)([aiouwzAIOUWZ]) /g;

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const glue = (s: string): string =>
      s.replace(NbspPipe.ORPHANS, (_m, pre: string, letter: string) => pre + letter + NbspPipe.NBSP);
    // two passes handle consecutive one-letter words (e.g. "o u nas")
    return glue(glue(value));
  }
}
