import { DiplomeYear, Faculty, Course } from "./enum";

export class Skill {
    id !: number;
    name !: string;
    cursus !: Course;
    year !: DiplomeYear;
    school !: Faculty;
    description !: string;
    picture:  string;
    pictureSmall: string;
}

export class SkillFamily{
    id !: number;
    id_parent !: number;
}