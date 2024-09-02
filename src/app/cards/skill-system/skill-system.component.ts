import { Component, OnInit,Inject,PLATFORM_ID } from '@angular/core';
import { CommonModule,DOCUMENT,isPlatformBrowser  } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SkillFilter,GroupedSkill } from '../filter-skill-system';
import { JobCard } from '../jobcard';

declare global {
    interface Window {
        bootstrap: any;
    }
}

@Component({
    selector: 'app-skill-system',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './skill-system.component.html',
    styleUrl: './skill-system.component.css'
})

export class SkillSystemComponent  implements OnInit {
    filter:SkillFilter;
    jobCardList!:JobCard[];

    groupedSkillList !: GroupedSkill[];

    selectedSkill : GroupedSkill | null = null;

    searchQuery!:string;


    constructor(
        private titleService: Title,
        private route:ActivatedRoute,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object) {

    }

    ngOnInit(): void {
        this.filter = new SkillFilter;
        this.groupedSkillList = this.filter.groupedSkillList;
        this.jobCardList = this.filter.jobCardList;
        this.route.queryParams.subscribe(params=>{
            const skill = params['skill'];
            if (skill) {
                this.openSkillModal(skill);
            }
        });
        this.route.data.subscribe(data =>{
            this.titleService.setTitle(data['title'] || 'Wvizse');
        });
    }

    onFilterCard(skillName: string, cursus: string, card: JobCard[]):JobCard[]{
        return card.filter(job =>
            job.skills.includes(skillName) && job.cursus.toString() === cursus
        );
    }


    onOpenSkillModal(skill: GroupedSkill){
        this.selectedSkill = skill;
        this.selectedSkill.description = skill.description.replace(/\. /g, '.<br>');
    }

    openSkillModal(skillName: string){
        const skill = this.groupedSkillList.find(skill => skill.name === skillName);
        if(skill){
            this.onOpenSkillModal(skill);
        }
        if (isPlatformBrowser(this.platformId)) {
            const modalElement = this.document.getElementById('cardModal');
            if (modalElement) {
                const modalInstance = new window.bootstrap.Modal(modalElement);
                modalInstance.show();
            }
        }

    }


    onApplyFilter(){
        this.filter.searchQuery = this.searchQuery;
        this.filter.ApplyFilter();
    }

    onResetFilters(){
        this.filter.ResetFilters();
        this.searchQuery = this.filter.searchQuery;
    }

    isMobileMenuActive:boolean = false;
  
    onToggleMobileMenu() {
        this.isMobileMenuActive = !this.isMobileMenuActive;
    }


    onOpenJobModal(jobName:string){
        this.router.navigate(['/jobs'],{queryParams:{job:jobName}});
    }
}




