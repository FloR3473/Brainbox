import { HttpClient } from '@angular/common/http';
import { inject, Inject, Service } from '@angular/core';

@Service()
export class ConnaissancesService {
    private readonly http = inject(HttpClient);

    getKnowlegde(){
        return this.http.get('http://localhost:3000/knowlegde');
    }
}

