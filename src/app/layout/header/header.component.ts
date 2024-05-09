import { Component } from "@angular/core";
import { LogoComponent } from "./logo/logo.component";
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    LogoComponent,
    NavComponent
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent {
  menu: string = "top[-100%]";

  toggleMenu() {
    if (this.menu === "top[-100%]") {
      this.menu = "top[10%]";
    } else {
      this.menu = "top[-100%]";
    }
  }

}
