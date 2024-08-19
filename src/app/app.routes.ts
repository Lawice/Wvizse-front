import { Routes } from '@angular/router';
import { CardSystemComponent } from './card-system/card-system.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {path:'jobs', component: CardSystemComponent },
    {path: '',component :LandingPageComponent }
];
