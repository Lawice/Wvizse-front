import { Component, OnInit } from '@angular/core';
import { CardSystemComponent } from './card-system/card-system.component';



@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CardSystemComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {

}