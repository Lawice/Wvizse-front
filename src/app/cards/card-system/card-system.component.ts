import { Component, OnInit,Inject } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';

import { Cursus , School} from "../cursus";
import { CardFilter } from '../filter-card-system';
import { Save } from '../save';
import { JobCard } from '../jobcard';

import { LocalStorageService } from '../../local-storage.service';

declare global {
    interface Window {
        bootstrap: any;
    }
}

@Component({
    selector: 'app-card-system',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './card-system.component.html',
    styleUrl: './card-system.component.css'
})
  
export class CardSystemComponent  implements OnInit {
    cardsList!: JobCard[];
    checkboxList!: Cursus[];
    checkboxParentList!: School[];
    filter!: CardFilter;
    save!: Save;
    searchQuery!:string;
  
    selectedCard: JobCard | null = null;
  
    favoriteIcon = 'bi bi-star';
  
    ngOnInit(): void {
        this.filter = new CardFilter();
        this.searchQuery = this.filter.searchQuery;
        this.cardsList = this.filter.cardsList;
        this.checkboxList = this.filter.checkboxList;
        this.checkboxParentList = this.filter.checkboxParentList;

        this.route.queryParams.subscribe(params=>{
            const name = params['job'];
            if (name) {
                this.openCardModal(name);
            }
        });
        this.route.data.subscribe(data =>{
            this.titleService.setTitle(data['title'] || 'Wvizse');
        });
    }
  
    constructor(
        private titleService: Title,
        private router: Router,
        private route:ActivatedRoute,
        @Inject(DOCUMENT) private document: Document) {
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

    onOpenSkillModal(skillName:string){
        this.router.navigate(['/skills'],{queryParams:{skill:skillName}});
    }

    openCardModal(jobName: string){
        const card = this.cardsList.find(card => card.name === jobName);
        if(card){
            this.onOpenCardModal(card);
            
        }

        const modalElement = this.document.getElementById('cardModal');
        if (modalElement) {
            const modalInstance = new window.bootstrap.Modal(modalElement);
            modalInstance.show();
        }

    }
}
  
