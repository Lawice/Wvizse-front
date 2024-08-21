import { Cursus, School,Diplome  } from "./cursus";

export const CursusList: Cursus[] = [
    {label:'Programmation', value: 'PROG', checked: true, school: 'HORDE', diplome: Diplome.BM},
    {label:'Game Art', value: 'ART', checked: true, school: 'HORDE', diplome: Diplome.BM},
    {label:'Game Design', value: 'GD', checked: true, school: 'HORDE', diplome: Diplome.M},
    {label:'Tech Art', value: 'TA', checked: true, school: 'HORDE', diplome: Diplome.M},
    {label:'Producing', value: 'PROD', checked: true, school: 'HORDE', diplome: Diplome.M},
    {label:'Sound Design', value: 'SOUND', checked: true, school: 'HORDE', diplome: Diplome.M},
    {label:'Business & Événementiel', value: 'BUSN', checked: true, school: 'HORDE', diplome: Diplome.BM},
    
    {label:'IA & Big Data', value: 'DATA', checked: true, school: 'TURING', diplome: Diplome.PM},
    {label:'Génie Logiciel', value: 'LOGI', checked: true, school: 'TURING', diplome: Diplome.PM},
    {label:'Cloud & Cybersécurité', value: 'CLOUD', checked: true, school: 'TURING', diplome: Diplome.PM},
]

export const Schools : School[] =[
    {label: 'La Horde', value:'HORDE',checked: true, indeterminate : false},
    {label: 'Turing', value:'TURING',checked: true, indeterminate : false}
]
