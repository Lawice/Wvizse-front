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
        if(localStorage){return localStorage.getItem(key);}
        return null;
    }

    removeItem(key: string){
        localStorage.removeItem(key);
    }

    clear(){
        localStorage.clear();
        console.log("claer");
    }

    setList(key: string, value: any[]){
        this.setItem(key,JSON.stringify(value));
    }

    getList(key:string): any[]{
        const storedList = this.getItem(key);
        return storedList ? JSON.parse(storedList) : [];
    }
}
