import { Routes } from '@angular/router'; 
import { ChatIA } from './chat-ia/chat-ia';
import { Connaissances } from './connaissances/connaissances';

export const routes: Routes = [ 
    { path: 'chatia', component: ChatIA },
    { path: 'connaissances', component: Connaissances }

];
