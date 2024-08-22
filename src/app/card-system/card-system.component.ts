import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Cursus , School} from "./cards/cursus";
import { Filter } from './cards/filter-system';
import { Card } from './cards/card';

import { LocalStorageService } from '../local-storage.service';

@Component({
    selector: 'app-card-system',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './card-system.component.html',
    styleUrl: './card-system.component.css'
})
  
export class CardSystemComponent {
    cardsList!: Card[];
    checkboxList!: Cursus[];
    checkboxParentList!: School[];
    filter!: Filter;
    searchQuery!:string;
  
    selectedCard: Card | null = null;

    FavoriteIcon = 'bi bi-star';

    favoriteCards : Card[] = [];
  
    ngOnInit(): void {
        this.filter = new Filter();
        this.searchQuery = this.filter.searchQuery;
        this.cardsList = this.filter.cardsList;
        this.checkboxList = this.filter.checkboxList;
        this.checkboxParentList = this.filter.checkboxParentList;
    }

    constructor(private localStorageService: LocalStorageService) {
        if (typeof localStorage !== 'undefined' && localStorage !== null) {
            const favorites = this.localStorageService.getList('favorites');
            if (favorites.length === 0) {
                this.localStorageService.setList('favorites', this.favoriteCards);
            }else{
                this.favoriteCards = favorites;
            }
        } else {
            console.log('localStorage n\'est pas disponible.');
        }
    }
  
    onApplyFilters() {
        this.filter.searchQuery = this.searchQuery;
        this.filter.ApplyFilters();
    }
  
    onResetFilters(){
        this.filter.ResetFilters();
        this.searchQuery = this.filter.searchQuery;
    }
  
    onToggleParent(parentCheckbox: School){
      this.filter.ToggleParent(parentCheckbox);
    }
    
    onToggleChild(parentCheckbox: School) {
      this.filter.ToggleChild(parentCheckbox);
    }

    isMobileMenuActive:boolean = false;
  
    onToggleMobileMenu() {
      this.isMobileMenuActive = !this.isMobileMenuActive;
    }
  
    onOpenCardModal(card: Card): void {
        this.selectedCard = card;
        this.selectedCard.description = card.description.replace(/\. /g, '.<br>');
        console.log(this.localStorageService.getList('favorites'));
        if(this.isCardInSavedFavorites(card)){
            this.FavoriteIcon = 'bi bi-star-fill'
        }else{
            this.FavoriteIcon = 'bi bi-star'
        }
    }

    onToggleFavoriteCards(card: Card|null) {
        if (card) {
            if (this.isCardInSavedFavorites(card)) {
                this.favoriteCards = this.favoriteCards.filter(c => c !== card);
                this.FavoriteIcon = 'bi bi-star';
            } else {
                this.favoriteCards.push(card);
                this.FavoriteIcon = 'bi bi-star-fill';
            }
        }
        console.log(this.favoriteCards);
        this.localStorageService.setList('favorites', this.favoriteCards);
    }

    private getSavedFavorites(): Card[] {
        return this.localStorageService.getList('favorites');
    }

    private isCardInSavedFavorites(card: Card): boolean {
        const savedFavorites = this.getSavedFavorites();
        return savedFavorites.some(favorite => favorite.name === card.name);
    }


}
