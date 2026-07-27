import { Component, Inject } from '@angular/core';
import { ConnaissancesService } from '../connaissances-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-connaissance',
  imports: [FormsModule],
  templateUrl: './ajouter-connaissance.html',
  styleUrl: './ajouter-connaissance.scss',
})
export class AjouterConnaissance {
  constructor(@Inject(ConnaissancesService) private connaissancesService : ConnaissancesService) { };

  titre = "";
  contenu = "";
  categorie = "";
  tags = "";
  
  message = "";
  messageType: "success" | "error" | "" = "";

    ajouterConnaissance() {
        const connaissance = {
          title: this.titre,
          content: this.contenu,
          category: this.categorie,
          tags: this.tags
          };
    this.connaissancesService.addKnowledge(connaissance).subscribe({
      next: (response) => { 
        this.message = "La connaissance a été ajoutée avec succès.";
        this.messageType = "success";

      // Vider le formulaire
        this.titre = "";
        this.contenu = "";
        this.categorie = "";
        this.tags = "";
      }, 
    

    error: (err) => {
      console.error(err);

      this.message = "Une erreur est survenue lors de l'ajout de la connaissance.";
      this.messageType = "error";
    }
    });
  }
}
