import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>app-suche-schlagwoerter</code>
 */
@Component({
  selector: 'app-suche-schlagwoerter',
  templateUrl: './suche-schlagwoerter.component.html',
  imports: [FormsModule],
  standalone: true,
})
export class SucheSchlagwoerterComponent {
  protected javascript = false;

  protected typescript = false;

  @Output()
  protected readonly javascript$ = new Subject<boolean>();

  @Output()
  protected readonly typescript$ = new Subject<boolean>();

  constructor() {
    log.debug('SucheSchlagwoerterComponent()');
  }

  protected onChangeJavascript(event: Event) {
    // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
    const { checked } = event.target as HTMLInputElement;
    log.debug(
      `SucheSchlagwoerterComponent.onChangeJavascript: checked=${checked}`,
    );
    this.javascript$.next(checked);
  }

  protected onChangeTypescript(event: Event) {
    const { checked } = event.target as HTMLInputElement;
    log.debug(
      `SucheSchlagwoerterComponent.onChangeTypescript: checked=${checked}`,
    );
    this.typescript$.next(checked);
  }
}

