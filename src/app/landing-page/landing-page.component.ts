import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})

export class LandingPageComponent implements OnInit {

    constructor(
        private titleService: Title,
        private route: ActivatedRoute
    ){}

    ngOnInit(){
        this.route.data.subscribe(data =>{
            this.titleService.setTitle(data['title'] || 'Wvizse');
        });
    }


    isMobileMenuActive:boolean = false;
    onToggleMobileMenu() {
        this.isMobileMenuActive = !this.isMobileMenuActive;
    }
}
