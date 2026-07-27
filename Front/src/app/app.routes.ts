import { Routes } from '@angular/router'; 
import { ChatIA } from './chat-ia/chat-ia';
import { Connaissances } from './connaissances/connaissances';
import { AjouterConnaissance } from './ajouter-connaissance/ajouter-connaissance';

export const routes: Routes = [ 
    { path: 'chatia', component: ChatIA },
    { path: 'connaissances', component: Connaissances },
    { path: 'ajouterconnaissance', component: AjouterConnaissance }

];
