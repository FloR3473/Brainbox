import { Component, Inject, signal } from '@angular/core';
import { ConnaissancesService } from '../connaissances-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-ia',
  imports: [FormsModule],
  templateUrl: './chat-ia.html',
  styleUrl: './chat-ia.scss',
})
export class ChatIA {
  constructor(@Inject(ConnaissancesService) private connaissancesService : ConnaissancesService) { }

  question = "";
  reponse = signal("");
  loadReponse = false

  demanderConnaissance(){
    this.loadReponse = true
    this.connaissancesService.askKnowledge(this.question).subscribe({
      next: (res) => { 
        this.reponse.set(res.answer);
        this.loadReponse = false
      },
      error: err => {console.error(err)
      this.loadReponse = false}
    });
  };
}
