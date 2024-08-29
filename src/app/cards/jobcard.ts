import { Faculty, Course } from "./enum";

export class JobCard{
    name !: string;
    cursus !: Course;
    school !: Faculty;
    picture !: string;
    pictureSmall !: string;
    tags !: Array<string>;
    skills !: Array<string>;
    description !: string;
    visible !: boolean;
}