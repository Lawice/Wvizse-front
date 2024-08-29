import { JobCard } from "./jobcard";
import { LocalStorageService } from '../local-storage.service';

export class Save {
    newFavoriteCards:JobCard[] = [];

    favoriteCards : JobCard[] = [];

    constructor(private localStorageService: LocalStorageService){
        try{this.favoriteCards = this.getSavedFavorites();}
        catch(error){
            console.log('localStorage is not available.', error);
        }
    }


    openCardModal(card: JobCard, favoriteIcon:string, selectedCard:JobCard|null): [JobCard, string] {
        selectedCard = card;
        selectedCard.description = card.description.replace(/\. /g, '.<br>');
        if(this.isCardInSavedFavorites(card)){
            favoriteIcon = 'bi bi-star-fill'
        }else{
            favoriteIcon = 'bi bi-star'
        }
        return [selectedCard, favoriteIcon];
    }


    toggleFavoriteCards(card: JobCard|null, favoriteIcon:string):string {

        this.newFavoriteCards = [];
        if (card) {
            const index = this.favoriteCards.findIndex(c => c.name === card.name);
            if (this.isCardInSavedFavorites(card)) {
                console.log("already exist");
                this.favoriteCards.splice(index, 1);
                this.newFavoriteCards = [...this.favoriteCards];
                favoriteIcon = 'bi bi-star';
            } else {
                console.log("not exist");
                this.favoriteCards.push(card);
                this.newFavoriteCards = this.favoriteCards;
                favoriteIcon = 'bi bi-star-fill';
            }
        }
        console.log( this.newFavoriteCards);
        this.localStorageService.setList('favorites', this. newFavoriteCards);
        this.favoriteCards=this.newFavoriteCards;
        return favoriteIcon;
    }

    getSavedFavorites(): JobCard[] {
        return this.localStorageService.getList('favorites');
    }

    isCardInSavedFavorites(card: JobCard): boolean {
        const savedFavorites = this.getSavedFavorites();
        return savedFavorites.some(favorite => favorite.name === card.name);
    }


    Reset(){
        this.localStorageService.clear();
    }
}