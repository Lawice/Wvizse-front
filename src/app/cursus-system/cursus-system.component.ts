import { Component, OnInit } from '@angular/core';
import { Cursus,Diplome } from '../card-system/cards/cursus';
import { Filter } from '../card-system/cards/filter-system';
import { Card } from '../card-system/cards/card';
import { CommonModule } from '@angular/common';

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

    bachelor:Diplome = Diplome.B;
    bachelorMaster:Diplome = Diplome.BM;
    master:Diplome = Diplome.M;
    prepa:Diplome = Diplome.PM;

    groupedCursus: { [key: string]: Cursus[] } = {};
    schoolKeys: string[] = [];

    selectedCells: { [key: string]: boolean } = {};
    selectedRows:{[key: string]: Row} = {}

    selectedCard: Card | null = null;

    ngOnInit(): void {
        this.groupCursusBySchool();
    }
 
    onToggleMobileMenu() {
        this.isMobileMenuActive = !this.isMobileMenuActive;
    }
 
    constructor() {
        this.filter = new Filter();
        this.cardsList = this.filter.cardsList;
        this.cursusList = this.filter.checkboxList;
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
    }

    isSelected(school: string, cursus : string , year: number): boolean {
        const key = `${school}-${cursus}-${year}`;
        return !!this.selectedCells[key];
    }

    areAllCellsDeselected(school: string, cursus: string): boolean {
        const cursusObj = this.groupedCursus[school].find(c => c.label === cursus);
        if (!cursusObj) return true;

        const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
            : cursusObj.diplome === this.master ? [4, 5]
            : [1, 2, 3, 4, 5];

        return years.every(year => !this.selectedCells[`${school}-${cursus}-${year}`]);
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
    }

    onOpenCardModal(card: Card): void {
        this.selectedCard = card;
        this.selectedCard.description = card.description.replace(/\. /g, '.<br>');
    }
}

class Row{
    isAllSelected:boolean;
    rowDiplome:Diplome;

}

  