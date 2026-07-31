import { Component, Inject, signal } from '@angular/core';
import { ConnaissancesService } from '../connaissances-service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-ajouter-connaissance',
  standalone: true,
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
  
  message = signal("");
  messageType = signal<"success" | "error" | "">("");

    ajouterConnaissance(form: NgForm) {
        const connaissance = {
          title: this.titre,
          content: this.contenu,
          category: this.categorie,
          tags: this.tags
          };
    this.connaissancesService.addKnowledge(connaissance).subscribe({
      next: (response) => { 
        console.log("SUCCESS", response);

        this.message.set("La connaissance a été ajoutée avec succès.");
        this.messageType.set("success");

      // Vider le formulaire
        form.resetForm();  
      
        setTimeout(() => {
        this.message.set("")
        this.messageType.set("");
        }, 3000);
      }, 
    

    error: (err) => {
      console.error(err);

      this.message.set("Une erreur est survenue lors de l'ajout de la connaissance.");
      this.messageType.set("error");

      setTimeout(() => {
      this.message.set("");
      this.messageType.set("");
      }, 3000);
    }
    });
  }
}
