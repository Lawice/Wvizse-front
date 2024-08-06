import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from './card-system/card';
import { FormsModule } from '@angular/forms';
import { Checkbox } from "./card-system/checkbox";
import { Filter } from './card-system/filter-system';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
    cardsList!: Card[];
    checkboxList!: Checkbox[];
    filter!: Filter;
    searchQuery!:string;
  
    ngOnInit(): void {
        this.filter = new Filter();
        this.searchQuery = this.filter.searchQuery;
        this.cardsList = this.filter.cardsList;
        this.checkboxList= this.filter.checkboxList;
    }
  
    onApplyFilters() {
        this.filter.searchQuery = this.searchQuery;
        this.filter.ApplyFilters();
    }

    onResetFilters(){
        this.filter.ResetFilters();
        this.searchQuery = this.filter.searchQuery;
    }
}