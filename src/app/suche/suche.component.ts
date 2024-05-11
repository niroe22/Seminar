import { BuchReadService, type Suchkriterien } from "../shared/buchRead.service";
import { Component, inject } from "@angular/core";
import { first, tap } from "rxjs/operators";
import { type Buch } from "../shared/buch";
import { FindError } from "../shared/errors";
import { HttpStatusCode } from "@angular/common/http";
import { NgIf } from "@angular/common";
import { SuchergebnisComponent } from "./suchergebnis/suchergebnis.component";
import { SuchformularComponent } from "./suchformular/suchformular.component";
import log from "loglevel";
import { HeaderComponent } from "../layout/header/header.component";
import { WaitingComponent } from "../shared/waiting.component";

@Component({
  selector: "app-suche",
  templateUrl: "./suche.component.html",
  styleUrl: "./suche.component.css",
  imports: [
    NgIf,
    HeaderComponent,
    SuchformularComponent,
    SuchergebnisComponent,
    WaitingComponent
  ],
  standalone: true
})
export class SucheComponent {
  protected waiting = false;

  protected buecher: Buch[] = [];

  protected errorMsg: string | undefined;

  readonly #service = inject(BuchReadService);

  constructor() {
    log.debug("SucheBuecherComponent()");
  }

  /**
   * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
   * <code>suchkriterien</code> vom Typ Suchkriterien gesetzt. Diese Methode
   * wird aufgerufen, wenn in der Kindkomponente f&uuml;r
   * <code>app-suchformular</code> das Ereignis ausgel&ouml;st wird.
   *
   * @param suchkriterien f&uuml;r die Suche.
   */
  protected suchen(suchkriterien: Suchkriterien) {
    log.debug(
      "SucheBuecherComponent.suchen: suchkriterien=",
      suchkriterien
    );

    this.buecher = [];
    this.errorMsg = undefined;

    this.waiting = true;

    // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
    // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
    this.#service
      .find(suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
      .pipe(
        first(),
        tap((result) => this.#setProps(result))
      )
      .subscribe();
  }

  #setProps(result: Buch[] | FindError) {
    this.waiting = false;

    if (result instanceof FindError) {
      this.#handleFindError(result);
      return;
    }

    this.buecher = result;
    log.debug("SucheBuecherComponent.#setProps: buecher=", this.buecher);
  }

  #handleFindError(err: FindError) {
    const { statuscode } = err;
    log.debug(
      "SucheBuecherComponent.#handleFindError: statuscode=",
      statuscode
    );

    switch (statuscode) {
      case HttpStatusCode.NotFound.valueOf(): {
        this.errorMsg = "Keine Bücher gefunden.";
        break;
      }
      case HttpStatusCode.TooManyRequests.valueOf(): {
        this.errorMsg =
          "Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.";
        break;
      }
      case HttpStatusCode.GatewayTimeout.valueOf(): {
        this.errorMsg = "Ein interner Fehler ist aufgetreten.";
        log.error("Laeuft der Appserver? Port-Forwarding?");
        break;
      }
      default: {
        this.errorMsg = "Ein unbekannter Fehler ist aufgetreten.";
        break;
      }
    }

    log.debug(
      "SucheBuecherComponent.#handleFindError: errorMsg=",
      this.errorMsg
    );
  }
}
