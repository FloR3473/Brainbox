import { Component, Inject, OnInit, signal } from '@angular/core';
import { ConnaissancesService } from '../connaissances-service';

@Component({
  selector: 'app-connaissances',
  imports: [],
  templateUrl: './connaissances.html',
  styleUrl: './connaissances.scss',
})
export class Connaissances implements OnInit {
  constructor(@Inject(ConnaissancesService) private connaissancesService : ConnaissancesService) { };
  
  ngOnInit(): void {
    this.listerConnaissances();
  }

  knowledge = signal<any | null>(null);

  listerConnaissances() {
    this.connaissancesService.getKnowlegde().subscribe({
      next: (res: {result? : []}) => { 
        this.knowledge.set(res.result); 
      },
      error: err => console.error(err)
    });
  }
}
