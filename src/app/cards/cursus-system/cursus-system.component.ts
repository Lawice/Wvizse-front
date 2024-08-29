import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from '../../local-storage.service';

import { Cursus,School } from '../cursus';
import { JobCard } from '../jobcard';
import { Filter } from '../filter-system';
import { Save } from '../save';

import { Diplome, DiplomeYear } from "../enum";

import { Skills, SkillFamilies  } from '../mock-skill-list';
import { Skill, SkillFamily } from '../skill';


@Component({
    selector: 'app-cursus-system',
    standalone: true,
    imports: [CommonModule,FormsModule],
    templateUrl: './cursus-system.component.html',
    styleUrl: './cursus-system.component.css'
})

export class CursusSystemComponent implements OnInit {
    isMobileMenuActive:boolean = false;

    filter!: Filter;
    save!: Save;

    cardsList!: JobCard[];
    cursusList!: Cursus[];
    schoolList!: School[];

    selectedCards: JobCard[] = [];
    unselectedCards: JobCard[] = [];

    bachelor:Diplome = Diplome.B;
    bachelorMaster:Diplome = Diplome.BM;
    master:Diplome = Diplome.M;
    prepa:Diplome = Diplome.PM;

    groupedCursus: { [key: string]: Cursus[] } = {};
    schoolKeys: string[] = [];

    selectedCells: { [key: string]: boolean } = {};
    selectedRows:{[key: string]: Row} = {}

    favoriteIcon = 'bi bi-star';
    selectedCard: JobCard | null = null;

    searchQuery:string;
    checkboxList!: Cursus[];
    checkboxParentList!: School[];

    skillList !: Skill[];
    skillFamilyList !: SkillFamily[];

    ngOnInit(): void {
        this.GroupCursusBySchool();
        this.cardsList.forEach(card=> this.isCardSelected(card));
        this.save = new Save(new LocalStorageService());

        this.route.queryParams.subscribe(params=>{
            console.log('Query params:', params);
            const job = params['job'];
            if (job) {
                this.JobSelection(job);
            }
        });
    }
 
    onToggleMobileMenu() {
        this.isMobileMenuActive = !this.isMobileMenuActive;
    }
 
    constructor(private route:ActivatedRoute) {
        this.filter = new Filter();

        this.cardsList = this.filter.cardsList;
        this.cursusList = this.filter.checkboxList;
        this.schoolList = this.filter.checkboxParentList

        this.checkboxList = this.filter.checkboxList;
        this.checkboxParentList = this.filter.checkboxParentList;

        this.skillList = Skills;
        this.skillFamilyList = SkillFamilies;
    }
    //#region CursusSystem
    GroupCursusBySchool() {
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
            console.log('cursusList is undefined or not an array');
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
    
        const cursusObj = this.groupedCursus[school].find(c => c.value === cursus);
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
        const cursusObj = this.groupedCursus[school].find(c => c.value === cursus);
        if (!cursusObj) return true;

        const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
            : cursusObj.diplome === this.master ? [4, 5]
            : [1, 2, 3, 4, 5];

        return years.every(year => !this.selectedCells[`${school}-${cursus}-${year}`]);
    }

    areAllCellsSelected(school: string, cursus: string): boolean {
        const cursusObj = this.groupedCursus[school].find(c => c.value === cursus);
        if(!cursusObj) return false;

        const years = cursusObj.diplome === this.bachelor ? [1,2,3]
            : cursusObj.diplome === this.master ? [4,5]
            : [1, 2, 3, 4, 5];

            return years.every(year => this.selectedCells[`${school}-${cursus}-${year}`]);
    }

    isCardSelected(card: JobCard) {
        const cardSkill : Skill[] = [];
        const cardSkillParent: Skill[] = [];
        let allSelected = true;
        card.skills.forEach(skillName => {
            const newskills = this.skillList.filter(skill => 
                skill.name === skillName &&
                skill.cursus === card.cursus &&
                skill.school === card.school
            );
    
            if (newskills.length > 0) {
                newskills.forEach(skill => {
                    cardSkill.push(skill);

                });
            } else {
                allSelected = false;
            }
        });

        if(cardSkill.length > 0){
            const pastYears = new Set<DiplomeYear>();
            cardSkill.forEach(skill => {
                if (!pastYears.has(skill.year)) {
                    let result = false;
                    let parentResult = false;

                    result = this.SkillVerification(skill);
                    parentResult = this.ParentSkillVerification(skill,cardSkill);

                    if(!(result && parentResult)){
                        allSelected = false;
                    }
                    pastYears.add(skill.year);
                }
            });
            this.UpdateCardSelection(card, allSelected)
        }
        else {
            allSelected = false;
            this.UpdateCardSelection(card, allSelected)
        }
    }

    SkillVerification(skill:Skill): boolean{
        switch(skill.year){
            case DiplomeYear.B1:
            case DiplomeYear.P1:
                return this.isSelected(skill.school, skill.cursus , 1);
            case DiplomeYear.B2:
            case DiplomeYear.P2:
                return this.isSelected(skill.school, skill.cursus , 2);
            case DiplomeYear.B3:
                return this.isSelected(skill.school, skill.cursus , 3);
            case DiplomeYear.M1:
                return this.isSelected(skill.school, skill.cursus , 4);
           case DiplomeYear.M2:
                return  this.isSelected(skill.school, skill.cursus , 5);
        }
    }

    ParentSkillVerification(skill:Skill, cardSkill: Skill[]):boolean{
        const parents = this.skillFamilyList.filter(family=>
            family.id === skill.id &&
            !cardSkill.some(s=> s.id === family.id_parent)
        );

        if(parents.length > 0){
            let parentValid = false;
            for(const parent of parents){
                const parentSkill = this.skillList.find(skill => skill.id === parent.id_parent);
                if(parentSkill && this.ParentSkillVerification(parentSkill,cardSkill)){
                    parentValid = this.SkillVerification(parentSkill);
                    break;
                }
            }

            if(!parentValid){
                return false;
            }
        }

        return this.SkillVerification(skill);
    }

    UpdateCardSelection(card: JobCard, isSelected: boolean) {
        this.selectedCards = this.selectedCards.filter(c => c !== card);
        this.unselectedCards = this.unselectedCards.filter(c => c !== card);
    
        if (isSelected) {
            this.selectedCards.push(card);
        } else {
            this.unselectedCards.push(card);
        }
    }

    isAllVisible(cards: JobCard[]):boolean{
        const allInvisible = cards.every(card => !card.visible);
        return !allInvisible
    }

    JobSelection(cardname:string){
        const card: JobCard|undefined = this.cardsList.find(newcard => newcard.name === cardname);
        const cardSkill : Skill[] = [];
        if(card){
            card.skills.forEach(skillName => {
                const newskills = this.skillList.filter(skill => 
                    skill.name === skillName &&
                    skill.cursus === card.cursus &&
                    skill.school === card.school
                );
        
                if (newskills.length > 0) {
                    newskills.forEach(skill => {
                        cardSkill.push(skill);
                    });
                } 
            });
    
            if(cardSkill.length > 0){
                const pastYears = new Set<DiplomeYear>();
                cardSkill.forEach(skill => {
                    if (!pastYears.has(skill.year)) {

                        this.SkillSelection(skill);
                        this.ParentSkillSelection(skill,cardSkill);

                        pastYears.add(skill.year);
                    }
                })
            }
        }
    }

    SkillSelection(skill:Skill){
        switch(skill.year){
            case DiplomeYear.B1:
            case DiplomeYear.P1:
                this.onToggleSelection(skill.school, skill.cursus , 1);
                break;
            case DiplomeYear.B2:
            case DiplomeYear.P2:
                this.onToggleSelection(skill.school, skill.cursus , 2);
                break;
            case DiplomeYear.B3:
                this.onToggleSelection(skill.school, skill.cursus , 3);
                break;
            case DiplomeYear.M1:
                this.onToggleSelection(skill.school, skill.cursus , 4);
                break;
            case DiplomeYear.M2:
                this.onToggleSelection(skill.school, skill.cursus , 5);
                break;
        }
    }

    ParentSkillSelection(skill:Skill, cardSkill:Skill[]){
        const parents = this.skillFamilyList.filter(family=>
            family.id === skill.id &&
            !cardSkill.some(s=> s.id === family.id_parent)
        );

        if(parents.length > 0){
            for(const parent of parents){
                const parentSkill = this.skillList.find(skill => skill.id === parent.id_parent);
                if(parentSkill){
                    this.ParentSkillSelection(parentSkill, cardSkill);

                    if(!this.SkillVerification(parentSkill)){
                        this.SkillSelection(parentSkill);
                    }
                }
            }
        }

        if (!this.SkillVerification(skill)) {
            this.SkillSelection(skill);
        }
    }

    getSchoolLabel(school_value:string):string{
        const school = this.schoolList.find(school=> school.value === school_value);
        return school ? school.value : school_value;
    }
    // #endregion 
    
    //#region FilterSystem
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
    //#endregion

    //#region FavoriteSystem
    onOpenCardModal(card:JobCard){
        const [selectedCard , favoriteIcon ]= this.save.openCardModal(card,this.favoriteIcon, this.selectedCard);
        this.selectedCard=selectedCard;
        this.favoriteIcon=favoriteIcon;

    }

    onToggleFavoriteCards(card:JobCard|null){
        this.favoriteIcon = this.save.toggleFavoriteCards(card, this.favoriteIcon)
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
    //#endregion
}

class Row{
    isAllSelected:boolean;
    rowDiplome:Diplome;
}