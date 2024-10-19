import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isBannerVisible: boolean = true; 
    isMenuVisible: boolean = false; 

    closeBanner() {
        this.isBannerVisible = false;
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
    }
}
