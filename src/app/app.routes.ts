import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CardSystemComponent } from './cards/card-system/card-system.component';
import { CursusSystemComponent } from './cards/cursus-system/cursus-system.component';
import { SavedCardComponent } from './cards/saved-card/saved-card.component';

export const routes: Routes = [
    {path:'jobs', component: CardSystemComponent },
    {path:'cursus', component: CursusSystemComponent },
    {path:'chosen-jobs', component: SavedCardComponent},
    
    {path: '',component :LandingPageComponent }
];
