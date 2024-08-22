import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    setItem(key: string, value: string){
        localStorage.setItem(key,value);
    }

    getItem(key:string):string | null{
        return localStorage.getItem(key);
    }

    removeItem(key: string){
        localStorage.removeItem(key);
    }

    clear(){
        localStorage.clear();
    }

    setList(key: string, value: any[]){
        this.setItem(key,JSON.stringify(value));
        console.log('save :'+JSON.stringify(value));
    }

    getList(key:string): any[]{
        const storedList = this.getItem(key);
        console.log('getting... :'+JSON.stringify(storedList));
        if(storedList){console.log('get :'+ JSON.parse(storedList));}
        return storedList ? JSON.parse(storedList) : [];
    }
}
