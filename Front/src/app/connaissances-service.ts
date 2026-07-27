import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnaissancesService {
    private readonly http = inject(HttpClient);

    getKnowledge(){
        return this.http.get('http://localhost:9000/knowledge');
    }

    askKnowledge(question : string){
        console.log(question)
        return this.http.post<{ answer: string }>('http://localhost:9000/assistant', {
            question: question
        });
    }

     addKnowledge(connaissance: {
        title: string;
        content: string;
        category: string;
        tags: string;
        }){
        return this.http.post('http://localhost:9000/knowledge', connaissance);
    }

    updateKnowledge(
        id: string,
        connaissance: {
            title: string;
            content: string;
            category: string;
            tags: string;
        }
        ) {
        return this.http.put(
            `http://localhost:9000/knowledge/${id}`,
            connaissance
        );
        }

    deleteKnowledge(id:string){
        return this.http.delete(`http://localhost:9000/knowledge/${id}`)
    }
   

}

