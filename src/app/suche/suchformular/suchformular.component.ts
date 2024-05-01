import { Component } from '@angular/core';
import {SucheTitelComponent} from "../suche-titel/suche-titel.component";
import {SucheRatingComponent} from "../suche-rating/suche-rating.component";
import {SucheArtComponent} from "../suche-art/suche-art.component";
import {SucheSchlagwoerterComponent} from "../suche-schlagwoerter/suche-schlagwoerter.component";

@Component({
  selector: 'app-suchformular',
  standalone: true,
  imports: [
    SucheTitelComponent,
    SucheRatingComponent,
    SucheArtComponent,
    SucheSchlagwoerterComponent
  ],
  templateUrl: './suchformular.component.html',
  styleUrl: './suchformular.component.css'
})
export class SuchformularComponent {

  protected readonly onsubmit = onsubmit;
}
