import { Component } from '@angular/core';
import {HeaderComponent} from "../layout/header/header.component";
import {SuchformularComponent} from "./suchformular/suchformular.component";

@Component({
  selector: 'app-suche',
  standalone: true,
  imports: [
    HeaderComponent,
    SuchformularComponent
  ],
  templateUrl: './suche.component.html',
  styleUrl: './suche.component.css'
})
export class SucheComponent {

}
