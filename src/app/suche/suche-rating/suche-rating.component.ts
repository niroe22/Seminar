import { Component, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import log from "loglevel";

/**
 * Komponente f&uuml;r den CSS-Selektor <code>app-suche-rating</code>
 */
@Component({
  selector: "app-suche-rating",
  templateUrl: "./suche-rating.component.html",
  imports: [FormsModule],
  standalone: true
})
export class SucheRatingComponent {
  protected rating = "";

  @Output()
  protected readonly rating$ = new Subject<number | undefined>();

  constructor() {
    log.debug("SucheRatingComponent()");
  }

  protected onChange(event: Event) {
    // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
    const { value } = event.target as HTMLSelectElement;
    log.debug("SucheRatingComponent.onChange: value=", value);
    if (value === "") {
      this.rating$.next(undefined); // eslint-disable-line unicorn/no-useless-undefined
    } else {
      this.rating$.next(Number.parseInt(value, 10));
    }
  }
}
