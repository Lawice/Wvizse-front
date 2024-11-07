import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Cursus,School } from '../cursus';
import { JobCard } from '../jobcard';
import { CardFilter } from '../filter-card-system';
import { Save } from '../save';
import { Diplome, DiplomeYear } from "../enum";
import { Skills, SkillFamilies  } from '../mock-skill-list';
import { Skill, SkillFamily } from '../skill';

import { LocalStorageService } from '../../local-storage.service';

import cytoscape from 'cytoscape';

@Component({
    selector: 'app-cursus-system',
    standalone: true,
    imports: [CommonModule,FormsModule],
    templateUrl: './cursus-system.component.html',
    styleUrl: './cursus-system.component.css'
})

export class CursusSystemComponent implements OnInit {
    isMobileMenuActive:boolean = false;

    filter!: CardFilter;
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

    @ViewChild('cyto', { static: true }) cyContainer!: ElementRef;
  
    cyto!: cytoscape.Core;


    ngOnInit(): void {
        this.GroupCursusBySchool();
        this.cardsList.forEach(card=> this.isCardSelected(card));
        this.initializeCytoscape();
        this.save = new Save(new LocalStorageService());

        this.route.queryParams.subscribe(params=>{
            console.log('Query params:', params);
            const job = params['job'];
            if (job) {
                this.JobSelection(job);
            }
        });
        this.route.data.subscribe(data =>{
            this.titleService.setTitle(data['title'] || 'Wvizse');
        });
    }
 
    onToggleMobileMenu() {
        this.isMobileMenuActive = !this.isMobileMenuActive;
    }
 
    constructor(
        private titleService: Title,
        private route:ActivatedRoute, 
        private router: Router
        ) {
        this.filter = new CardFilter();

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

    onToggleSelection(school: string, cursusName: string, year: number) {
        const key = `${school}-${cursusName}-${year}`;
        console.log(key);
        this.selectedCells[key] = !this.selectedCells[key];
        this.cardsList.forEach(card=> this.isCardSelected(card));

        this.TriggerNodeOnSelecteion(school, cursusName, year)
    }
    ToggleSelection(school: string, cursusName: string, year: number) {
        const key = `${school}-${cursusName}-${year}`;
        console.log(key);
        this.selectedCells[key] = !this.selectedCells[key];
        this.cardsList.forEach(card=> this.isCardSelected(card));
    }

    isSelected(school: string, cursus : string , year: number): boolean {
        const key = `${school}-${cursus}-${year}`;
        return !!this.selectedCells[key];
    }

    TriggerNodeOnSelecteion(school: string, cursusName: string, year: number){
        const newCursus = this.cursusList.find(cursus => 
            cursus.value === cursusName &&
            cursus.school === school
        );

        let nodeId : string="";
        switch(newCursus?.diplome){
            case  Diplome.B:
                nodeId = `b${year - 1}-${cursusName}`;
                break;
            case  Diplome.BM:
                nodeId = `bm${year - 1}-${cursusName}`;
                break;
            case  Diplome.PM:
                nodeId = `pm${year - 1}-${cursusName}`;
                break;
            case  Diplome.M:
                nodeId = `m${year - 3}-${cursusName}`;
                break;
        }
        this.triggerTapOnNode(nodeId);
    }

    onToggleRowSelection(school: string, cursusName: string) {
        const rowKey = `${school}-${cursusName}`;
        const allDeselected = this.areAllCellsDeselected(school, cursusName);
        const newRowSelectionState = allDeselected;
    
        const cursusObj = this.groupedCursus[school].find(c => c.value === cursusName);
        if (cursusObj) {
            const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
                : cursusObj.diplome === this.master ? [4, 5]
                : [1, 2, 3, 4, 5];
    
            years.forEach(year => {
                this.selectedCells[`${school}-${cursusName}-${year}`] = newRowSelectionState;

                this.TriggerNodeOnSelecteion(school, cursusName, year)
            });
    
            this.selectedRows[rowKey] = { isAllSelected: newRowSelectionState, rowDiplome: cursusObj.diplome };
        }
        this.cardsList.forEach(card=> this.isCardSelected(card));
    }

    areAllCellsDeselected(school: string, cursusName: string): boolean {
        const cursusObj = this.groupedCursus[school].find(c => c.value === cursusName);
        if (!cursusObj) return true;

        const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
            : cursusObj.diplome === this.master ? [4, 5]
            : [1, 2, 3, 4, 5];

        return years.every(year => !this.selectedCells[`${school}-${cursusName}-${year}`]);
    }

    areAllCellsSelected(school: string, cursusName: string): boolean {
        const cursusObj = this.groupedCursus[school].find(c => c.value === cursusName);
        if(!cursusObj) return false;

        const years = cursusObj.diplome === this.bachelor ? [1,2,3]
            : cursusObj.diplome === this.master ? [4,5]
            : [1, 2, 3, 4, 5];

            return years.every(year => this.selectedCells[`${school}-${cursusName}-${year}`]);
    }

    isCardSelected(card: JobCard) {
        if(card){
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
    }


    ToggleAll(selected:boolean){
        Object.keys(this.groupedCursus).forEach(school => {
            this.groupedCursus[school].forEach(cursusObj => {
                const cursus = cursusObj.value;
                const rowKey = `${school}-${cursus}`;
    
                const years = cursusObj.diplome === this.bachelor ? [1, 2, 3]
                    : cursusObj.diplome === this.master ? [4, 5]
                    : [1, 2, 3, 4, 5];
        
                years.forEach(year => {
                    this.selectedCells[`${school}-${cursus}-${year}`] = selected;
                });

                this.selectedRows[rowKey] = { isAllSelected: selected, rowDiplome: cursusObj.diplome };
            });
        });
        this.cardsList.forEach(card => this.isCardSelected(card));
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

    onJobSelection(cardname:string|undefined){
        this.ToggleAll(false);
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

    onOpenSkillModal(skillName:string){
        this.router.navigate(['/skills'],{queryParams:{skill:skillName}});
    }

    //#region NodeGraph
    initializeCytoscape() {
        const nodes: cytoscape.NodeDefinition[] = [];
        const edges: cytoscape.EdgeDefinition[] = [];
        const BMNodes: { [key: string]: string[] } = {};

        const positions: { [key: string]: { x: number, y: number } } = {};
        let xPosition = 50;

        this.cursusList.forEach((cursus, index) => {
            const xOffset = 100;
            xPosition = 50;
            if (cursus.diplome === Diplome.BM) {
                BMNodes[cursus.school] = BMNodes[cursus.school] || [];

                for (let i = 0; i < 5; i++) {
                    const baseId = `${cursus.value}`;
                    const nodeId = `bm${i}-${baseId}`;
                        if(i <= 2){
                            nodes.push({
                                data: { id: nodeId, label: `Bachelor ${i + 1} ${cursus.value}` }
                            });
                        }
                        else{
                            nodes.push({
                                data: { id: nodeId, label: `Master ${i + 1 } ${cursus.value}` }
                            });
                        }
                        positions[nodeId] = { x: xPosition + i * xOffset, y: index * 100 };

                    if (i > 0) {
                        edges.push({
                            data: {
                                id: `edge-${nodeId}-bm${i-1}-${baseId}`,
                                source: `bm${i-1}-${baseId}`,
                                target: nodeId
                            }
                        });
                    }

                    if (i === 2) {
                        BMNodes[cursus.school].push(nodeId);
                    }
                    xPosition += 200;
                }
                
            }
        });

        this.cursusList.forEach((cursus, index) => {
            if (cursus.diplome === Diplome.M) {
                const xOffset = 300;
                xPosition = 950;

                const node1 = `m1-${cursus.value}`;
                const node2 = `m2-${cursus.value}`;

                nodes.push({
                    data: { id: node1, label: `Master 1 ${cursus.value}`}
                });
                nodes.push({
                    data: { id: node2, label: `Master 2 ${cursus.value}` }
                });

                positions[node1] = { x: xPosition , y: index * 100 };
                positions[node2] = { x: xPosition + xOffset, y:  index * 100 };

                edges.push({
                    data: {
                        id: `edge-${node1}-${node2}`,
                        source: node1,
                        target: node2
                    }
                });

                if (BMNodes[cursus.school]) {
                    BMNodes[cursus.school].forEach(BMNodeId => {
                        edges.push({
                            data: {
                                id: `edge-${node1}-${BMNodeId}`,
                                source: node1,
                                target: BMNodeId
                            }
                        });
                    });   
                }
            }
            else if (cursus.diplome === Diplome.PM) {
                const xOffset = 100;
                xPosition = 50;
                for (let i = 0; i < 5; i++) {
                    const baseId = `${cursus.value}`;
                    const nodeId = `pm${i}-${baseId}`;
                        if(i <= 1){
                            nodes.push({
                                data: { id: nodeId, label: `Prépa ${i + 1} ${cursus.value}` }
                            });
                        }
                        else if(i === 2){
                            nodes.push({
                                data: { id: nodeId, label: `Bachelor ${i + 1} ${cursus.value}` }
                            });
                        }
                        else{
                            nodes.push({
                                data: { id: nodeId, label: `Master ${i + 1 } ${cursus.value}` }
                            });
                        }
                        positions[nodeId] = { x:  xPosition + i * xOffset, y: index * 100 };

                    if (i > 0) {
                        edges.push({
                            data: {
                                id: `edge-${nodeId}-pm${i-1}-${baseId}`,
                                source: `pm${i-1}-${baseId}`,
                                target: nodeId
                            }
                        });
                    }
                    xPosition += 200;
                }
            }
            else if (cursus.diplome === Diplome.B) {
                const xOffset = 100;
                xPosition = 50;
                for (let i = 0; i < 2; i++) {
                    const baseId = `${cursus.value}`;
                    const nodeId = `pm${i}-${baseId}`;
                        nodes.push({
                            data: { id: nodeId, label: `Bachelor ${i + 1} ${cursus.value}` }
                        });
                        positions[nodeId] = { x:  xPosition + i * xOffset, y: index * 100 };

                    if (i > 0) {
                        edges.push({
                            data: {
                                id: `edge-${nodeId}-pm${i-1}-${baseId}`,
                                source: `pm${i-1}-${baseId}`,
                                target: nodeId
                            }
                        });
                    }
                    xPosition += 200;
                }
            }
        });

        this.cyto = cytoscape({
            container: this.cyContainer.nativeElement,
            elements: [
                ...nodes,
                ...edges
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'color':'#FFFFFF',
                        'transition-property': 'background-color, width, height',
                        'transition-duration': 0.3,
                    }
                },
                {
                    selector: 'edge',
                    style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: {
                name: 'preset',
                positions: positions,
            },
            minZoom: 0.65,
            maxZoom: 2,
        });
        
        this.cyto.on('tap', 'node', (event: any) => {
            const node = event.target;
            
            const nodeId = node.id();
            const regex = /^(bm|pm|m|b)([0-4])-?/;
            const match = nodeId.match(regex)

            if(match){
                const prefix = match[1];
                const year = match[2];

                const cursusName = nodeId.replace(regex, '');

                console.log("Préfixe :", prefix);
                console.log("Nombre :", typeof(year));
                console.log("Reste de la chaîne :", cursusName);

                const newCursus = this.cursusList.find(cursus => 
                    cursus.value === cursusName
                );

                console.log(newCursus)
                if(newCursus){
                    if(prefix === 'm'){
                        this.ToggleSelection(newCursus.school, newCursus.value, parseInt(year) +3)
                    }
                    else {
                        this.ToggleSelection(newCursus.school, newCursus.value, parseInt(year) +1)
                    }
                    
                }


                node.toggleClass('clicked');


                const connectedEdges = node.connectedEdges();

                connectedEdges.forEach((edge: any)=>{
                    const sourceNode = edge.source();
                    const targetNode = edge.target();

                    if(sourceNode.id() === nodeId && targetNode.id() === `${prefix}${parseInt(year) +1}-${cursusName}`){
                        edge.toggleClass('clicked')
                    } else if(targetNode.id() === nodeId && sourceNode.id() !== `${prefix}${parseInt(year) -1}-${cursusName}`){
                        edge.toggleClass('clicked')
                    }
                    // if((prefix === 'm' || (prefix ==='bm' && year === 3 )) &&  targetNode.hasClass('clicked')){
                    //     const targetEdges = targetNode.connectedEdges();

                    //     targetEdges.forEach((targetEdge: any)=>{
                    //         const newSourceNode = targetEdges.source();
                    //         const newTargetNode = targetEdges.target();



                    //         if(edge !== targetEdge){
                    //             targetEdges.removeClass('clicked')
                    //         }

                    //     });
                    // }
                })
            } 
            
        });
        
        this.cyto.on('mouseover', 'node', (event: any) => {
            const node = event.target;
            const nodeId = node.id();
            const regex = /^(bm|pm|m|b)([0-4])-?/;
            const match = nodeId.match(regex)

            if(match){
                const prefix = match[1];
                const year = match[2];

                const cursusName = nodeId.replace(regex, '');

                node.addClass('hovered');
                const connectedEdges = node.connectedEdges();

                connectedEdges.forEach((edge: any)=>{
                    const sourceNode = edge.source();
                    const targetNode = edge.target();

                    if(sourceNode.id() === nodeId && targetNode.id() === `${prefix}${parseInt(year) +1}-${cursusName}`){
                        edge.addClass('hovered')
                    } else if(targetNode.id() === nodeId && sourceNode.id() !== `${prefix}${parseInt(year) -1}-${cursusName}`){
                        edge.addClass('hovered')
                    }
                })
            }
        });
        
        this.cyto.on('mouseout', 'node', (event: any) => {
            const node = event.target;
            const nodeId = node.id();
            const regex = /^(bm|pm|m|b)([0-4])-?/;
            const match = nodeId.match(regex)

            if(match){
                const prefix = match[1];
                const year = match[2];

                const cursusName = nodeId.replace(regex, '');

                node.removeClass('hovered');
                const connectedEdges = node.connectedEdges();

                connectedEdges.forEach((edge: any)=>{
                    const sourceNode = edge.source();
                    const targetNode = edge.target();

                    if(sourceNode.id() === nodeId && targetNode.id() === `${prefix}${parseInt(year) +1}-${cursusName}`){
                        edge.removeClass('hovered')
                    } else if(targetNode.id() === nodeId && sourceNode.id() !== `${prefix}${parseInt(year) -1}-${cursusName}`){
                        edge.removeClass('hovered')
                    }
                })
            }
        });
        
        this.cyto.style().selector('node.clicked').style({
            'background-color': '#FF0015',
        }).selector('node.hovered').style({
            'background-color': '#B6FF00',
        }).selector('node.clicked.hovered').style({
            'background-color': '#FF6A00',
        }).update();
        this.cyto.style().selector('edge.clicked').style({
            'line-color' : '#FF0015',
            'width': 6,
        }).selector('edge.hovered').style({
            'line-color' : '#B6FF00',
            'width': 3,
        }).selector('edge.clicked.hovered').style({
            'line-color' : '#FF6A00',
            'width': 6,
        })
    }
    
    triggerTapOnNode(nodeId: string){
        const node = this.cyto.getElementById(nodeId);
        if(node){
            const nodeId = node.id();
            const regex = /^(bm|pm|m|b)([0-4])-?/;
            const match = nodeId.match(regex)

            if(match){
                const prefix = match[1];
                const year = match[2];

                const cursusName = nodeId.replace(regex, '');
                node.toggleClass('clicked');
                const connectedEdges = node.connectedEdges();

                connectedEdges.forEach((edge: any)=>{
                    const sourceNode = edge.source();
                    const targetNode = edge.target();

                    if(sourceNode.id() === nodeId && targetNode.id() === `${prefix}${parseInt(year) +1}-${cursusName}`){
                        edge.toggleClass('clicked')
                    } else if(targetNode.id() === nodeId && sourceNode.id() !== `${prefix}${parseInt(year) -1}-${cursusName}`){
                        edge.toggleClass('clicked')
                    }
                })
            } 
        }
    }
    //#endregion
}

class Row{
    isAllSelected:boolean;
    rowDiplome:Diplome;
}