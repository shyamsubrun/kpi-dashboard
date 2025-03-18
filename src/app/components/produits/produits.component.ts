import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { GraphComponent } from '../graph/graph.component';
import { StatsComponent } from '../stats/stats.component';
import { StoreCountComponent } from '../store-count/store-count.component';
import { Graph3CourbeComponent } from '../graph3courbe/graph3courbe.component';
import { GraphAverageMagasinsComponent } from '../graph-average-magasins/graph-average-magasins.component';
import { Graph2_4Component } from '../graph2-4/graph2-4.component';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    CommonModule, 
    FiltersComponent, 
    GraphComponent, 
    StoreCountComponent, 
    StatsComponent, 
    Graph3CourbeComponent, 
    GraphAverageMagasinsComponent, 
    Graph2_4Component
  ],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent {
  catID: number =0; 
  fabID!: number;
  date_debut!: string;
  date_fin!: string;

  isModalOpen = false;
  modalTitle = '';
  selectedGraph: string | null = null;

  /**
   * Mise à jour des filtres depuis app-filters
   */
  updateFilters(filters: { catID: number | null; fabID: number; date_debut: string; date_fin: string }) {
    this.catID = filters.catID ?? 0;
    this.fabID = filters.fabID;
    this.date_debut = filters.date_debut;
    this.date_fin = filters.date_fin;
  }

  /**
   * ✅ Ouvre le modal et affiche le bon graphique
   */
  openModal(graphName: string) {
    this.selectedGraph = graphName;
    this.modalTitle = this.getGraphTitle(graphName);
    this.isModalOpen = true;
  }

  /**
   * ✅ Ferme le modal
   */
  closeModal() {
    this.isModalOpen = false;
    this.selectedGraph = null;
  }

  /**
   * ✅ Associe un titre à chaque graphique
   */
  getGraphTitle(graphName: string): string {
    const titles: { [key: string]: string } = {
      'storeCount': 'Nombre de Magasins',
      'graph': 'Graphique Principal',
      'stats': 'Statistiques',
      'graph3courbe': 'Détail Produit - Graphique 3 Courbes',
      'graphAverage': 'Nombre moyen de magasins par catégorie',
      'graph2-4': 'Graphique 2.4 - Score Santé'
    };
    return titles[graphName] || 'Graphique';
  }
}