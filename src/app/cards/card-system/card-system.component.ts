import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Cursus , School} from "../cursus";
import { Filter } from '../filter-system';
import { Save } from '../save';
import { JobCard } from '../jobcard';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../local-storage.service';

@Component({
    selector: 'app-card-system',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './card-system.component.html',
    styleUrl: './card-system.component.css'
})
  
export class CardSystemComponent {
    cardsList!: JobCard[];
    checkboxList!: Cursus[];
    checkboxParentList!: School[];
    filter!: Filter;
    save!: Save;
    searchQuery!:string;
  
    selectedCard: JobCard | null = null;
  
    favoriteIcon = 'bi bi-star';
  
    ngOnInit(): void {
        this.filter = new Filter();
        this.searchQuery = this.filter.searchQuery;
        this.cardsList = this.filter.cardsList;
        this.checkboxList = this.filter.checkboxList;
        this.checkboxParentList = this.filter.checkboxParentList;
    }
  
    constructor(private router: Router) {
      this.save = new Save(new LocalStorageService());
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

    getFavoriteClasses() {
        return {
            [this.favoriteIcon]: true,
            'star-button-selected': this.isFavory()
        };
    }
      
    isFavory() {
        return this.favoriteIcon === 'bi bi-star-fill';
    }
  
    onOpenCardModal(card:JobCard){
        const [selectedCard , favoriteIcon ]= this.save.openCardModal(card,this.favoriteIcon, this.selectedCard);
        this.selectedCard=selectedCard;
        this.favoriteIcon=favoriteIcon;
    }
  
    onToggleFavoriteCards(card:JobCard|null){
        this.favoriteIcon = this.save.toggleFavoriteCards(card, this.favoriteIcon)
    }

    onCursusNavigation(){
        this.router.navigate(['/cursus'],{queryParams:{job:this.selectedCard?.name}});
    }
}
  
