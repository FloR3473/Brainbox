import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ConnaissancesService } from '../connaissances-service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-connaissances',
  standalone: true,
  templateUrl: './connaissances.html',
  styleUrl: './connaissances.scss',
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    DatePipe
  ]
})
export class Connaissances implements OnInit, AfterViewInit {

  constructor(
    @Inject(ConnaissancesService)
    private connaissancesService: ConnaissancesService
  ) {}

  displayedColumns: string[] = [
    'title',
    'content',
    'category',
    'tags',
    'createAt',
    'modifiedAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);

  message = "";

  filtre = "";

  knowledgeEnModification: any = null;

  titre = "";
  contenu = "";
  categorie = "";
  tags = "";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.dataSource.filterPredicate = (data, filter) => {

      filter = filter.toLowerCase();

      return (
        data.title?.toLowerCase().includes(filter) ||
        data.content?.toLowerCase().includes(filter) ||
        data.category?.toLowerCase().includes(filter) ||
        data.tags?.join(" ").toLowerCase().includes(filter)
      );
    };

    this.listerConnaissances();
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  listerConnaissances() {

    this.connaissancesService.getKnowledge().subscribe({

      next: (res: any) => {

        console.log(res.result);

        this.dataSource.data = res.result;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },

      error: err => console.error(err)

    });

  }

  appliquerFiltre(event: Event) {

    const valeur = (event.target as HTMLInputElement).value;

    this.dataSource.filter = valeur.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

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

    this.connaissancesService
      .updateKnowledge(this.knowledgeEnModification._id, connaissance)
      .subscribe({

        next: () => {

          console.log("Connaissance modifiée");

          this.knowledgeEnModification = null;

          this.listerConnaissances();

        },

        error: err => console.error(err)

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