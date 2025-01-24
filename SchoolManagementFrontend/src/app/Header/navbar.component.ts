import { Component } from '@angular/core';

@Component({
  selector: 'app-Header',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  toggleMenu(): void {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
  }
}
