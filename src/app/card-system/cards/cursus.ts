export enum Diplome{
    BM = 'Bachelor + Master',
    PM = 'Prépa + Master',
    B = 'Bachelor',
    M = 'Master'
}

export class Cursus {
    label: string;
    value: string;
    checked: boolean;
    school: string;
    diplome : Diplome
}

export class School{
    label: string;
    value: string;
    checked: boolean;
    indeterminate: boolean;
}