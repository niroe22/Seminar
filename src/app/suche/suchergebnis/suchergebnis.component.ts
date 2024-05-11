import { Component, input } from "@angular/core";
import { type Buch } from "../../shared/buch";
import { ErrorMessageComponent } from "../../shared/error-message.component";
import { GefundeneBuecherComponent } from "./gefundene-buecher/gefundene-buecher.component";
import { NgIf } from "@angular/common";
import log from "loglevel";

/**
 * Komponente f&uuml;r den CSS-Selektor <code>app-suchergebnis</code>, um das Ergebnis der
 * Suche anzuzeigen, d.h. die gefundenen B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
  selector: "app-suchergebnis",
  templateUrl: "./suchergebnis.component.html",
  imports: [ErrorMessageComponent, NgIf, GefundeneBuecherComponent],
  standalone: true
})
export class SuchergebnisComponent {
  // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
  // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

  // Property Binding: <app-suchergebnis [buecher]="...">
  // NICHT protected, da es in suche-buecher.html verwendet wird
  buecher = input<Buch[]>([]);

  errorMsg = input<string | undefined>();

  constructor() {
    log.debug("SuchergebnisComponent()");
  }
}
