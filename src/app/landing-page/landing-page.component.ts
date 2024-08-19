import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  isMobileMenuActive = false;

  toggleMobileMenu() {
    console.log("Menu toggle clicked");
    this.isMobileMenuActive = !this.isMobileMenuActive;
    console.log("isMobileMenuActive:", this.isMobileMenuActive);
}


}
