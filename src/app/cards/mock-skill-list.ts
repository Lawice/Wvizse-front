import { Skill, SkillFamily } from "./skill";
import { DiplomeYear, Faculty, Course } from "./enum";

export const Skills : Skill[] = [
    {
        id:1,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.B1,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_prog.png",
        pictureSmall:"images/test_prog2.png"
    },
    {
        id:2,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.B2,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_prog.png",
        pictureSmall:"images/test_prog2.png"
    },
    {
        id:3,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.B3,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_prog.png",
        pictureSmall:"images/test_prog2.png"
    },
    {
        id:4,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.M1,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_prog.png",
        pictureSmall:"images/test_prog2.png"
    },
    {
        id:5,
        name:"Maîtrise des langages de programmation",
        cursus:Course.PROG,
        year: DiplomeYear.M2,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_prog.png",
        pictureSmall:"images/test_prog2.png"
    },
    {
        id:6,
        name:"Conception visuelle",
        cursus:Course.ART,
        year: DiplomeYear.B2,
        school: Faculty.HORDE,
        description:"La conception visuelle en Game Art désigne l'ensemble des processus créatifs et techniques qui visent à définir l'apparence graphique d'un jeu vidéo. Cette compétence inclut la création d'éléments visuels qui donnent vie au monde du jeu, comme les personnages, les environnements, les objets, les interfaces, et même les effets visuels.",
        picture:"images/test_art.png",
        pictureSmall:"images/test_art2.png"
    },
    {
        id:7,
        name:"Conception visuelle",
        cursus:Course.ART,
        year: DiplomeYear.M1,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_art.png",
        pictureSmall:"images/test_art2.png"
    },
    {
        id:8,
        name:"Conception visuelle",
        cursus:Course.ART,
        year: DiplomeYear.M2,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_art.png",
        pictureSmall:"images/test_art2.png"
    },
    {
        id:9,
        name:"Maîtrise des langages de programmation",
        cursus:Course.GD,
        year: DiplomeYear.M1,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_gd.png",
        pictureSmall:"images/test_gd2.png"
    },
    {
        id:10,
        name:"Maîtrise des langages de programmation",
        cursus:Course.GD,
        year: DiplomeYear.M2,
        school: Faculty.HORDE,
        description:"",
        picture:"images/test_gd.png",
        pictureSmall:"images/test_gd2.png"
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