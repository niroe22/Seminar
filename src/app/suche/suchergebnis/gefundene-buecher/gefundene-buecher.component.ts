import { Component, input } from "@angular/core";
import {
  NgForOf,
  NgIf,
  NgLocalization,
  NgPlural,
  NgPluralCase,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from "@angular/common";
import { Router, RouterLink } from "@angular/router"; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { easeIn, easeOut } from "../../../shared/animations";
import { type Buch } from "../../../shared/buch";
import { BuchWriteService } from "../../../shared/buchWrite.service"; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from "loglevel";

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-gefundene-buecher</code>, um zun&auml;chst
 * das Warten und dann die gefundenen B&uuml;cher oder eine Fehlermeldung
 * anzuzeigen.
 */
@Component({
  selector: "app-gefundene-buecher",
  templateUrl: "./gefundene-buecher.component.html",
  animations: [easeIn, easeOut],
  imports: [
    NgForOf,
    NgIf,
    NgPlural,
    NgPluralCase,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    RouterLink
  ],
  standalone: true
})
export class GefundeneBuecherComponent {
  // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
  // eine Flux-Bibliothek, wie z.B. Redux http://redux.js.org

  // Property Binding: <hs-gefundene-buecher [buecher]="...">
  buecher = input<Buch[]>([]);

  constructor(
    private readonly buchService: BuchWriteService,
    private readonly router: Router
  ) {
    log.debug("GefundeneBuecherComponent()");
  }

  trackBy(_index: number, buch: Buch) {
    return buch.id;
  }

  /**
   * Das ausgew&auml;hlte bzw. angeklickte Buch in der Detailsseite anzeigen.
   * @param buch Das ausgew&auml;hlte Buch
   */
  protected onClick(buch: Buch) {
    log.debug("GefundeneBuecherComponent.onClick(): ", buch);
    // URL mit der Buch-ID, um ein Bookmark zu ermoeglichen
    // Gefundenes Buch als NavigationExtras im Router puffern
    const state = { buch };
    return this.router.navigate([`/buecher/${buch.id}`], { state });
  }

  /**
   * Das ausgew&auml;hlte bzw. angeklickte Buch l&ouml;schen.
   * @param buch Das ausgew&auml;hlte Buch
   */
  protected onRemove(buch: Buch) {
    this.buchService.remove(buch).subscribe();
    const buecherNeu = this.buecher().filter((b) => b.id !== buch.id);
    this.buecher = input(buecherNeu);
    log.debug("GefundeneBuecherComponent.onRemove: buecher=", this.buecher);
  }
}

export class AnzahlLocalization extends NgLocalization {
  getPluralCategory(count: number) {
    return count === 1 ? "single" : "multi";
  }
}
