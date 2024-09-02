import { Faculty, DiplomeYear  } from './enum';


import { JobCard } from './jobcard';
import { CardFilter } from "./filter-card-system";
import { Skill } from './skill';
import { Skills } from './mock-skill-list';



export class SkillFilter {
    searchQuery:string ='';
    skillList !: Skill[];
    groupedSkillList !: GroupedSkill[];


    jobCardList!:JobCard[];
    filter:CardFilter;
    
    constructor(){
        this.filter = new CardFilter();
        this.jobCardList = this.filter.cardsList;
        
        this.skillList = Skills
        this.groupedSkillList = this.GroupSkills(this.skillList)

    }

    GroupSkills(skills: Skill[]): GroupedSkill[] { 
        const groupedSkillMap: { [key: string]: GroupedSkill } = {};
    
        skills.forEach(skill => {
            const key = `${skill.name}_${skill.school}`;

            if (!groupedSkillMap[key]) {
                groupedSkillMap[key] = {
                    name: skill.name,
                    school: skill.school,
                    season: {},
                    description: skill.description,
                    picture: skill.picture,
                    pictureSmall: skill.pictureSmall,
                    isVisible: true
                };
            }
    
            if (!groupedSkillMap[key].season[skill.cursus]) {
                groupedSkillMap[key].season[skill.cursus] = [];
            }
    
            groupedSkillMap[key].season[skill.cursus].push(skill.year);
        });
    
        return Object.values(groupedSkillMap);
    }


    ApplyFilter(){
        this.groupedSkillList.forEach(skill=>{
            const searchMatch = !this.searchQuery.trim() || skill.name.toLowerCase().includes(this.searchQuery.toLowerCase());

            skill.isVisible = searchMatch;
        });
    }

    ResetFilters(){
        this.searchQuery = '';
        this.ApplyFilter();
    }

}

export class GroupedSkill {
    name!: string;
    season!: SeasonDict;
    school!: Faculty;
    description!: string;
    picture!:string;
    pictureSmall!:string;
    isVisible:boolean;
}
interface SeasonDict {
    [key: string]: DiplomeYear[];
}
