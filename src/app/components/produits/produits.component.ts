import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { GraphComponent } from '../graph/graph.component';
import { StoreCountComponent } from '../store-count/store-count.component'; // ✅ Ajout

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FiltersComponent, GraphComponent,StoreCountComponent],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent {
  catID = 5;
  fabID!: number;
  date_debut!: string;
  date_fin!: string;

  updateFilters(filters: { catID: number; fabID: number ,date_debut: string ,date_fin: string}) {
    this.catID = filters.catID;
    this.fabID = filters.fabID;
    this.date_debut = filters.date_debut;
    this.date_fin = filters.date_fin;
    
  }

  
}
