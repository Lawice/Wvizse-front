import { Card } from "./card";
import { Cards } from "./mock-card-list";
import { Checkbox, CheckboxParent } from "./checkbox";
import { Checkboxes, CheckboxParents } from "./checkbox-list";

export class Filter{
    searchQuery: string = '';
    cardsList: Card[] = Cards;
    checkboxList : Checkbox[] = Checkboxes;
    checkboxParentList : CheckboxParent [] = CheckboxParents;

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

    ToggleParent(parentCheckbox: CheckboxParent) {
        const isChecked = parentCheckbox.checked;
        this.checkboxList.forEach(checkbox => {
            if(checkbox.school === parentCheckbox.value){
                checkbox.checked = isChecked;
            }
        });
        parentCheckbox.indeterminate = false;
        this.ApplyFilters();
    }

    ToggleChild(parentCheckbox: CheckboxParent) {
        const filteredCheckboxes = this.checkboxList.filter(checkbox => checkbox.school ===parentCheckbox.value);
        const allChecked = filteredCheckboxes.every(checkbox => checkbox.checked);
        const noneChecked  = filteredCheckboxes.every(checkbox => !checkbox.checked);
        parentCheckbox.checked = allChecked;
        parentCheckbox.indeterminate = !allChecked && !noneChecked;

        this.ApplyFilters();
    }
    

}