import { Diplome, Faculty, Course } from "./enum";

export class Cursus {
    value !: Course;
    checked !: boolean;
    school !: Faculty;
    diplome !: Diplome
}

export class School{
    value !: Faculty;
    checked !: boolean;
    indeterminate!:boolean;
}