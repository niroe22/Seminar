import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SucheComponent} from "./suche/suche.component";

export const routes: Routes = [
  {'path': '', component:HomeComponent},
  {'path': 'suche', component:SucheComponent},
  {'path': '', component:HomeComponent},
];
