import { Card } from "./card";
import { Cards } from "./mock-card-list";
import { Checkbox } from "./checkbox";
import { Checkboxes } from "./checkbox-list";

export class Filter{
    searchQuery: string = '';
    cardsList: Card[] = Cards;
    checkboxList : Checkbox[] = Checkboxes;

    ApplyFilters(){
        this.cardsList.forEach(card => {
            const categoryMatch = this.checkboxList.some(checkbox => checkbox.checked && checkbox.value == card.cursus)
            const searchMatch = !this.searchQuery.trim() || card.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));

            card.visible = categoryMatch && searchMatch;
        });
    }

    ResetFilters(){
        this.checkboxList.forEach(checkbox => checkbox.checked = true);
        this.searchQuery = ''
        this.ApplyFilters();
    }

}