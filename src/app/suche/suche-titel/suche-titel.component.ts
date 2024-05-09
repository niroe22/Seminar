import { Component, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import log from "loglevel";

/**
 * Komponente f&uuml;r den CSS-Selektor <code>app-suche-titel</code>
 */
@Component({
  selector: "app-suche-titel",
  templateUrl: "./suche-titel.component.html",
  imports: [FormsModule],
  standalone: true
})
export class SucheTitelComponent {
  protected titel = "";

  // Event Binding: <app-suche-titel (titel$)="myFunc($event)">
  // in RxJS: Observables = Event-Streaming mit Promises
  // @Output() dekoriert ein Subject, das von Observable abgeleitet ist und noch next() hat
  // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
  // https://angular.io/guide/component-interaction#parent-listens-for-child-event

  // Suffix "$" wird als "Finnish Notation" bezeichnet
  // Ben Lesh ist Projektleiter von RxJS https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
  // Idee für $ von Andre Staltz @andrestaltz bei X, der aus Finnland stammt
  // TODO Funktion "output" fuer Signals in @angular/core
  @Output()
  protected readonly titel$ = new Subject<string>();

  constructor() {
    log.debug("SucheTitelComponent()");
  }

  protected onBlur() {
    log.debug(`SucheTitelComponent.onBlur: titel=${this.titel}`);
    this.titel$.next(this.titel);
  }
}
