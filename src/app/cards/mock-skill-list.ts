import { Skill, SkillFamily } from "./skill";
import { DiplomeYear, Faculty, Course } from "./enum";

export const Skills : Skill[] = [
    {
        id:1,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.B1,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:2,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.B2,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:3,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.B3,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:4,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.M1,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:5,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.M2,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:6,
        name:"Conception visuelle",
        cursus:Course.ART,
        year: DiplomeYear.B2,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:7,
        name:"Conception visuelle",
        cursus:Course.ART,
        year: DiplomeYear.M1,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:8,
        name:"Conception visuelle",
        cursus:Course.ART,
        year: DiplomeYear.M2,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:9,
        name:"Maîtrise des langages de programmation",
        cursus:Course.GD,
        year: DiplomeYear.M1,
        school: Faculty.HORDE,
        description:""
    },
    {
        id:10,
        name:"Maîtrise des langages de programmation",
        cursus:Course.GD,
        year: DiplomeYear.M2,
        school: Faculty.HORDE,
        description:""
    }
    
]

export const SkillFamilies : SkillFamily[] =[
    {
        id:9,
        id_parent:3
    },
    {
        id:3,
        id_parent:2
    },
    {
        id:2,
        id_parent:1
    }
    
]