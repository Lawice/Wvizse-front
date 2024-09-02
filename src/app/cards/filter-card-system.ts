import { JobCard } from "./jobcard";
import { JobCards } from "./mock-jobcard-list";
import { Cursus, School } from "./cursus";
import { CursusList, Schools } from "./cursus-list";

export class CardFilter{
    searchQuery: string = '';
    cardsList: JobCard[] = JobCards;
    checkboxList : Cursus[] = CursusList;
    checkboxParentList : School [] = Schools;

    ApplyFilters(){
        this.cardsList.forEach(card => {
            const categoryMatch = this.checkboxList.some(checkbox => checkbox.checked && checkbox.value == card.cursus)
            const searchMatch = !this.searchQuery.trim() || card.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));

            card.visible = categoryMatch && searchMatch;
        });
    }

    ResetFilters(){
        this.checkboxList.forEach(checkbox => checkbox.checked = true);
        this.checkboxParentList.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.indeterminate = false;
        });
        this.searchQuery = ''
        this.ApplyFilters();
    }

    ToggleParent(parentCheckbox: School) {
        const isChecked = parentCheckbox.checked;
        this.checkboxList.forEach(checkbox => {
            if(checkbox.school === parentCheckbox.value){
                checkbox.checked = isChecked;
            }
        });
        parentCheckbox.indeterminate = false;
        this.ApplyFilters();
    }

    ToggleChild(parentCheckbox: School) {
        const filteredCheckboxes = this.checkboxList.filter(checkbox => checkbox.school === parentCheckbox.value);
        const allChecked = filteredCheckboxes.every(checkbox => checkbox.checked);
        const noneChecked  = filteredCheckboxes.every(checkbox => !checkbox.checked);
        parentCheckbox.checked = allChecked;
        parentCheckbox.indeterminate = !allChecked && !noneChecked;

        this.ApplyFilters();
    }
    

}