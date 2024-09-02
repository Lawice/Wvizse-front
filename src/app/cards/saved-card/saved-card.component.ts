import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Cursus , School} from "../cursus";
import { CardFilter } from '../filter-card-system';
import { Save } from '../save';
import { JobCard } from '../jobcard';

import { LocalStorageService } from '../../local-storage.service';

@Component({
    selector: 'app-saved-card',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './saved-card.component.html',
    styleUrl: './saved-card.component.css'
})

export class SavedCardComponent {
    cardsList!: JobCard[];
    checkboxList!: Cursus[];
    checkboxParentList!: School[];
    filter!: CardFilter;
    save!: Save;
    searchQuery!:string;
  
    selectedCard: JobCard | null = null;
  
    favoriteIcon = 'bi bi-star';
  
    favoriteCards!:JobCard[];
  
    ngOnInit(): void {
        this.filter = new CardFilter();
        this.searchQuery = this.filter.searchQuery;
        this.cardsList = this.filter.cardsList;
        this.checkboxList = this.filter.checkboxList;
        this.checkboxParentList = this.filter.checkboxParentList;
        this.favoriteCards = this.save.getSavedFavorites();

        this.route.data.subscribe(data =>{
            this.titleService.setTitle(data['title'] || 'Wvizse');
        });
    }
  
    constructor(
        private router: Router,
        private titleService: Title,
        private route: ActivatedRoute
    ) {
        this.save = new Save(new LocalStorageService());
    }
  
    onApplyFilters() {
        this.filter.searchQuery = this.searchQuery;
        this.filter.ApplyFilters();
        this.synchronizeVisibility(this.cardsList, this.favoriteCards);
    }
  
    onResetFilters(){
        this.filter.ResetFilters();
        this.searchQuery = this.filter.searchQuery;
        this.synchronizeVisibility(this.cardsList, this.favoriteCards);
    }
  
    onToggleParent(parentCheckbox: School){
        this.filter.ToggleParent(parentCheckbox);
        this.synchronizeVisibility(this.cardsList, this.favoriteCards);
    }
  
    onToggleChild(parentCheckbox: School) {
        this.filter.ToggleChild(parentCheckbox);
        this.synchronizeVisibility(this.cardsList, this.favoriteCards);
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
        const overrideCard = this.cardsList.find(card => card.name === selectedCard.name);
        if(overrideCard){
            this.selectedCard=overrideCard;
        }
        else{
            this.selectedCard=selectedCard;
        }
        this.favoriteIcon=favoriteIcon;
    }
  
    onToggleFavoriteCards(card:JobCard|null){
        this.favoriteIcon = this.save.toggleFavoriteCards(card, this.favoriteIcon);
        this.favoriteCards = this.save.getSavedFavorites();
    }
  
    synchronizeVisibility(cards: JobCard[], favoriteCards: JobCard[]): void {
        const favoriteCardsMap = new Map<string, JobCard>();
        favoriteCards.forEach(favoriteCard => {
            favoriteCardsMap.set(favoriteCard.name, favoriteCard);
        });
  
        cards.forEach(card => {
            const favoriteCard = favoriteCardsMap.get(card.name);
            if (favoriteCard) {
                favoriteCard.visible = card.visible;
            }
        });
    }

    onCursusNavigation(){
        this.router.navigate(['/cursus'],{queryParams:{job:this.selectedCard?.name}});
    }

    
    onOpenSkillModal(skillName:string){
        this.router.navigate(['/skills'],{queryParams:{skill:skillName}});
    }
}
