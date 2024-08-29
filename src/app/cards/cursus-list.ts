import { Cursus, School } from "./cursus";
import { Diplome, Faculty, Course } from "./enum";

export const CursusList: Cursus[] = [
    {value: Course.PROG, checked: true, school: Faculty.HORDE, diplome: Diplome.BM},
    {value: Course.ART, checked: true, school: Faculty.HORDE, diplome: Diplome.BM},
    {value: Course.GD, checked: true, school: Faculty.HORDE, diplome: Diplome.M},
    {value: Course.TA, checked: true, school: Faculty.HORDE, diplome: Diplome.M},
    {value: Course.PROD, checked: true, school: Faculty.HORDE, diplome: Diplome.M},
    {value: Course.SOUND, checked: true, school: Faculty.HORDE, diplome: Diplome.M},
    {value: Course.BUSN, checked: true, school: Faculty.HORDE, diplome: Diplome.BM},
    
    {value: Course.DATA, checked: true, school: Faculty.TURING, diplome: Diplome.PM},
    {value: Course.LOGI, checked: true, school: Faculty.TURING, diplome: Diplome.PM},
    {value: Course.CLOUD, checked: true, school: Faculty.TURING, diplome: Diplome.PM},
]

export const Schools : School[] =[
    {value:Faculty.HORDE,checked: true, indeterminate : false},
    {value:Faculty.TURING,checked: true, indeterminate : false}
]
