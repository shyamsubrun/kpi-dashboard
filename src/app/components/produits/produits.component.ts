import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { GraphComponent } from '../graph/graph.component';
import { StatsComponent } from '../stats/stats.component';
import { StoreCountComponent } from '../store-count/store-count.component';
import { Graph3CourbeComponent } from '../graph3courbe/graph3courbe.component'
import { GraphAverageMagasinsComponent } from '../graph-average-magasins/graph-average-magasins.component';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FiltersComponent, GraphComponent,StoreCountComponent,StatsComponent,Graph3CourbeComponent,GraphAverageMagasinsComponent],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent {
  catID: number = 0; // ✅ Valeur par défaut au lieu de null
  fabID!: number;
  date_debut!: string;
  date_fin!: string;

  /**
   * Mise à jour des filtres depuis `app-filters`
   */
  updateFilters(filters: {  catID: number | null; fabID: number; date_debut: string; date_fin: string }) {
    this.catID = filters.catID ?? 0; // ✅ Si null, remplace par 0
    this.fabID = filters.fabID;
    this.date_debut = filters.date_debut;
    this.date_fin = filters.date_fin;
  }

  
}
