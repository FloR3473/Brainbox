import { Component, Inject, OnInit, signal } from '@angular/core';
import { ConnaissancesService } from '../connaissances-service';
import { formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connaissances',
  imports: [FormsModule],
  templateUrl: './connaissances.html',
  styleUrl: './connaissances.scss',
})
export class Connaissances implements OnInit {
  constructor(@Inject(ConnaissancesService) private connaissancesService : ConnaissancesService) { };
  
  ngOnInit(): void {
    this.listerConnaissances();
  }

  knowledge = signal<any | null>(null);
  message = "";

  knowledgeEnModification: any = null;

  titre = "";
  contenu = "";
  categorie = "";
  tags = "";

  listerConnaissances() {
    this.connaissancesService.getKnowledge().subscribe({
      next: (res: {result? : []}) => { 
        this.knowledge.set(res.result); 
      },
      error: err => console.error(err)
    });
  }


  modifierConnaissance(knowledge: any) {

    this.knowledgeEnModification = knowledge;

    this.titre = knowledge.title;
    this.contenu = knowledge.content;
    this.categorie = knowledge.category;
    this.tags = knowledge.tags.join(", ");
  }
  
  enregistrerModification() {

    const connaissance = {
      title: this.titre,
      content: this.contenu,
      category: this.categorie,
      tags: this.tags
    };
  
    this.connaissancesService.updateKnowledge(this.knowledgeEnModification._id, connaissance).subscribe({

    next: () => {
      console.log("Connaissance modifiée");

      this.knowledgeEnModification = null;
      this.listerConnaissances();
    },

    error: err => {
      console.error(err);
    }

  });
}

annulerModification() {
  this.knowledgeEnModification = null;
}

  supprimerConnaissance(id: string) {
    this.connaissancesService.deleteKnowledge(id).subscribe({
      next: () => {
        this.message = "Connaissance supprimée avec succès.";
        this.listerConnaissances();
      },
      error: () => {
        this.message = "Erreur lors de la suppression.";
      }
    });
  }
}
