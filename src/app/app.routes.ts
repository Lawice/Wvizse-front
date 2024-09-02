import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CardSystemComponent } from './cards/card-system/card-system.component';
import { CursusSystemComponent } from './cards/cursus-system/cursus-system.component';
import { SavedCardComponent } from './cards/saved-card/saved-card.component';
import { SkillSystemComponent } from './cards/skill-system/skill-system.component';

export const routes: Routes = [
    {path:'jobs', component: CardSystemComponent, data:{title : 'Wvizse - Métiers'} },
    {path:'cursus', component: CursusSystemComponent, data:{title : 'Wvizse - Cursus'} },
    {path:'chosen-jobs', component: SavedCardComponent,  data:{title : 'Wvizse - Métiers Choisis'}},
    {path:'skills', component: SkillSystemComponent,  data:{title : 'Wvizse - Compétences'}},
    
    {path: '',component :LandingPageComponent,  data:{title : 'Wvizse - Home'} }
];
