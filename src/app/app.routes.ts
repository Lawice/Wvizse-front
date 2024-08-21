import { Routes } from '@angular/router';
import { CardSystemComponent } from './card-system/card-system.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CursusSystemComponent } from './cursus-system/cursus-system.component';

export const routes: Routes = [
    {path:'jobs', component: CardSystemComponent },
    {path:'cursus', component: CursusSystemComponent },
    {path: '',component :LandingPageComponent }
];
