import { Component, Output } from '@angular/core';
import { type BuchArt } from '../../shared/buch';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>app-suche-art</code>
 */
@Component({
  selector: 'app-suche-art',
  templateUrl: './suche-art.component.html',
  imports: [FormsModule],
  standalone: true,
})
export class SucheArtComponent {
  protected art: BuchArt | '' = '';

  @Output()
  protected readonly art$ = new Subject<BuchArt | ''>();

  constructor() {
    log.debug('SucheArtComponent()');
  }

  protected onChange(event: Event) {
    // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
    const { value } = event.target as HTMLInputElement;
    log.debug(`SucheArtComponent.onChange: art=${value}`);
    this.art$.next(value as BuchArt | '');
  }
}
