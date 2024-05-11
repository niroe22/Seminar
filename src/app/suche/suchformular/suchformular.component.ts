import { Component, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { type BuchArt } from "../../shared/buch";
import { Subject } from "rxjs";
import { SucheArtComponent } from "../suche-art/suche-art.component";
import { SucheRatingComponent } from "../suche-rating/suche-rating.component";
import { SucheSchlagwoerterComponent } from "../suche-schlagwoerter/suche-schlagwoerter.component";
import { SucheTitelComponent } from "../suche-titel/suche-titel.component";
import { type Suchkriterien } from "../../shared/buchRead.service";
import { fadeIn } from "../../shared/animations";
import log from "loglevel";

/**
 * Komponente f&uuml;r den CSS-Selektor <code>app-suchformular</code>
 */
@Component({
  selector: "app-suchformular",
  templateUrl: "./suchformular.component.html",
  animations: [fadeIn],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SucheArtComponent,
    SucheRatingComponent,
    SucheSchlagwoerterComponent,
    SucheTitelComponent
  ],
  standalone: true
})
export class SuchformularComponent {
  // Event Binding: <app-suchformular (suchkriterien$)="myFunc($event)">
  // in RxJS: Observables = Event-Streaming mit Promises
  // @Output() dekoriert ein Subject, das von Observable abgeleitet ist und noch next() hat
  // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
  // https://angular.io/guide/component-interaction#parent-listens-for-child-event

  // Suffix "$" wird als "Finnish Notation" bezeichnet
  // Ben Lesh ist Projektleiter von RxJS https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
  // Idee für $ von Andre Staltz @andrestaltz bei X, der aus Finnland stammt
  @Output()
  protected readonly suchkriterien$ = new Subject<Suchkriterien>();

  #titel = "";

  #rating: number | undefined = undefined;

  #art: BuchArt | "" = "";

  #javascript = false;

  #typescript = false;

  constructor() {
    log.debug("SuchformularComponent()");
  }

  protected setTitel(titel: string) {
    log.debug("SuchformularComponent.setTitel", titel);
    this.#titel = titel;
  }

  protected setRating(rating: number | undefined) {
    log.debug("SuchformularComponent.setRating", rating);
    this.#rating = rating;
  }

  protected setArt(art: string) {
    log.debug("SuchformularComponent.setArt", art);
    this.#art = art as BuchArt;
  }

  protected setJavascript(isChecked: boolean) {
    log.debug("SuchformularComponent.setJavascript", isChecked);
    this.#javascript = isChecked;
  }

  protected setTypescript(isChecked: boolean) {
    log.debug("SuchformularComponent.setTypescript", isChecked);
    this.#typescript = isChecked;
  }

  /**
   * Suche nach B&uuml;chern, die den spezfizierten Suchkriterien entsprechen
   */
  protected onSubmit() {
    log.debug(
      "SuchformularComponent.onSubmit: titel / rating / art / javascript / typescript",
      this.#titel,
      this.#rating,
      this.#art,
      this.#javascript,
      this.#typescript
    );
    console.log("SuchformularComponent.onSubmit: titel / rating / art / javascript / typescript: ",
      this.#titel,
      this.#rating,
      this.#art,
      this.#javascript,
      this.#typescript);

    this.suchkriterien$.next({
      titel: this.#titel,
      rating: this.#rating,
      art: this.#art,
      schlagwoerter: {
        javascript: this.#javascript,
        typescript: this.#typescript
      }
    });
  }
}
