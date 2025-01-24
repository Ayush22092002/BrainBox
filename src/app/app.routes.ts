import { Routes } from '@angular/router';

import { AiTextComponent } from './ai-text/ai-text.component';

export const routes: Routes = [
   { path: '', redirectTo: '/gpt', pathMatch: 'full' },
   
    { path: 'gpt', component: AiTextComponent },
];
