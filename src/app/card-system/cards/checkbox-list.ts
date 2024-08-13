import { Checkbox, CheckboxParent } from "./checkbox";

export const Checkboxes: Checkbox[] = [
    {label:'Programmation', value: 'PROG', checked: true, school: 'HORDE'},
    {label:'Game Art', value: 'ART', checked: true, school: 'HORDE'},
    {label:'Game Design', value: 'GD', checked: true, school: 'HORDE'},
    {label:'Tech Art', value: 'TA', checked: true, school: 'HORDE'},
    {label:'Producing', value: 'PROD', checked: true, school: 'HORDE'},
    {label:'Sound Design', value: 'SOUND', checked: true, school: 'HORDE'},
    {label:'Business & Événementiel', value: 'BUSN', checked: true, school: 'HORDE' },
    
    {label:'IA & Big Data', value: 'DATA', checked: true, school: 'TURING'},
    {label:'Génie Logiciel', value: 'LOGI', checked: true, school: 'TURING'},
    {label:'Cloud & Cybersécurité', value: 'CLOUD', checked: true, school: 'TURING'},
]

export const CheckboxParents : CheckboxParent[] =[
    {label: 'La Horde', value:'HORDE',checked: true, indeterminate : false},
    {label: 'Turing', value:'TURING',checked: true, indeterminate : false}
]
