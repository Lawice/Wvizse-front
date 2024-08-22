import { Component, OnInit } from '@angular/core';
import { Cursus,Diplome } from '../card-system/cards/cursus';
import { Filter } from '../card-system/cards/filter-system';
import { Card } from '../card-system/cards/card';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';


@Component({
    selector: 'app-cursus-system',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cursus-system.component.html',
    styleUrl: './cursus-system.component.css'
})

export class CursusSystemComponent implements OnInit {
    isMobileMenuActive:boolean = false;
    filter!: Filter;
    cardsList!: Card[];
    cursusList!: Cursus[];

    selectedCards: Card[] = [];
    unselectedCards: Card[] = [];

    bachelor:Diplome = Diplome.B;
    bachelorMaster:Diplome = Diplome.BM;
    master:Diplome = Diplome.M;
    prepa:Diplome = Diplome.PM;

    groupedCursus: { [key: string]: Cursus[] } = {};
    schoolKeys: string[] = [];

    selectedCells: { [key: string]: boolean } = {};
    selectedRows:{[key: string]: Row} = {}

    selectedCard: Card | null = null;

    FavoriteIcon = 'bi bi-star';

    favoriteCards : Card[] = [];

    ngOnInit(): void {
        this.groupCursusBySchool();
        this.cardsList.forEach(card=> this.isCardSelected(card));
    }
 
    onToggleMobileMenu() {
        this.isMobileMenuActive = !this.isMobileMenuActive;
    }
 
    constructor(private localStorageService: LocalStorageService) {
        this.filter = new Filter();
        this.cardsList = this.filter.cardsList;
        this.cursusList = this.filter.checkboxList;
        this.localStorageService.setList('favorites',this.favoriteCards);
    }
  
    groupCursusBySchool() {
        if (this.cursusList && Array.isArray(this.cursusList)) {
            this.groupedCursus = {};
            this.cursusList.forEach(cursus => {
                if (!this.groupedCursus[cursus.school]) {
                    this.groupedCursus[cursus.school] = [];
                }
                this.groupedCursus[cursus.school].push(cursus);
            });
            this.schoolKeys = Object.keys(this.groupedCursus);
        }
        else {
            console.error('cursusList is undefined or not an array');
        }
    }

    onToggleSelection(school: string, cursus: string, year: number) {
        const key = `${school}-${cursus}-${year}`;
        this.selectedCells[key] = !this.selectedCells[key];
        this.cardsList.forEach(card=> this.isCardSelected(card));
    }

    isSelected(school: string, cursus : string , year: number): boolean {
        const key = `${school}-${cursus}-${year}`;
        return !!this.selectedCells[key];
    }

    onToggleRowSelection(school: string, cursus: string) {
        const rowKey = `${school}-${cursus}`;
        const allDeselected = this.areAllCellsDeselected(school, cursus);
        const newRowSelectionState = allDeselected;
    
        const cursusObj = this.groupedCursus[school].find(c => c.label === cursus);
        if (cursusObj) {
            const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
                : cursusObj.diplome === this.master ? [4, 5]
                : [1, 2, 3, 4, 5];
    
            years.forEach(year => {
                this.selectedCells[`${school}-${cursus}-${year}`] = newRowSelectionState;
            });
    
            this.selectedRows[rowKey] = { isAllSelected: newRowSelectionState, rowDiplome: cursusObj.diplome };
        }
        this.cardsList.forEach(card=> this.isCardSelected(card));
    }

    areAllCellsDeselected(school: string, cursus: string): boolean {
        const cursusObj = this.groupedCursus[school].find(c => c.label === cursus);
        if (!cursusObj) return true;

        const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
            : cursusObj.diplome === this.master ? [4, 5]
            : [1, 2, 3, 4, 5];

        return years.every(year => !this.selectedCells[`${school}-${cursus}-${year}`]);
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

    
    isCardSelected(card: Card) {
        const cursus = this.groupedCursus[card.school].find(c => c.value === card.cursus);
        if (cursus) {
            const cellsSelected = !this.areAllCellsDeselected(cursus.school, cursus.label);
            let isSelected = false;
    
            switch (cursus.diplome) {
                case this.master:
                    isSelected = cellsSelected;
                    break;
                case this.bachelor:
                    isSelected = cellsSelected;
                    break;
                case this.bachelorMaster:
                    isSelected = cellsSelected;
                    break;
                case this.prepa:
                    isSelected = false;
                    break;
            }
    
            this.updateCardSelection(card, isSelected);
            return null;
        }
    
        this.updateCardSelection(card, true);
        return null;
    }
    
    updateCardSelection(card: Card, isSelected: boolean) {
        this.selectedCards = this.selectedCards.filter(c => c !== card);
        this.unselectedCards = this.unselectedCards.filter(c => c !== card);
    
        if (isSelected) {
            this.selectedCards.push(card);
        } else {
            this.unselectedCards.push(card);
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

class Row{
    isAllSelected:boolean;
    rowDiplome:Diplome;
}

  