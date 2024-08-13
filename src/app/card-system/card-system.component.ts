import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Checkbox , CheckboxParent} from "./cards/checkbox";
import { Filter } from './cards/filter-system';
import { Card } from './cards/card';

@Component({
  selector: 'app-card-system',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './card-system.component.html',
  styleUrl: './card-system.component.css'
})

export class CardSystemComponent {
  cardsList!: Card[];
  checkboxList!: Checkbox[];
  checkboxParentList!: CheckboxParent[];
  filter!: Filter;
  searchQuery!:string;

  selectedCard: Card | null = null;

  ngOnInit(): void {
      this.filter = new Filter();
      this.searchQuery = this.filter.searchQuery;
      this.cardsList = this.filter.cardsList;
      this.checkboxList = this.filter.checkboxList;
      this.checkboxParentList = this.filter.checkboxParentList;
  }

  onApplyFilters() {
      this.filter.searchQuery = this.searchQuery;
      this.filter.ApplyFilters();
  }

  onResetFilters(){
      this.filter.ResetFilters();
      this.searchQuery = this.filter.searchQuery;
  }

  onToggleParent(parentCheckbox: CheckboxParent){
    this.filter.ToggleParent(parentCheckbox);
  }
  
  onToggleChild(parentCheckbox: CheckboxParent) {
    this.filter.ToggleChild(parentCheckbox);
  }
  onOpenCardModal(card: Card): void {
    this.selectedCard = card;
    this.selectedCard.description = card.description.replace(/\. /g, '.<br>');
}


}
