import { Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { Graph3CourbeComponent } from './components/graph3courbe/graph3courbe.component'; // ✅ Ajout de la route
import { GraphAverageMagasinsComponent } from './components/graph-average-magasins/graph-average-magasins.component';
import { Graph2_4Component } from './components/graph2-4/graph2-4.component';

export const routes: Routes = [
  { path: '', component: ProduitsComponent },  // ✅ Page d'accueil
  { path: 'stats', component: StatsComponent }, // ✅ Page Stats
  { path: 'detail-produit', component: Graph3CourbeComponent }, // ✅ Ajout de la route
  { path: 'se-connecter', component: GraphAverageMagasinsComponent }, // ✅ Afficher le graphe sur cette route
  { path: 'graph2-4', component: Graph2_4Component },  // ✅ Ajout du nouveau graphique

];
