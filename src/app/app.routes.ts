import { Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { Graph3CourbeComponent } from './components/graph3courbe/graph3courbe.component'; // ✅ Ajout de la route
export const routes: Routes = [
  { path: '', component: ProduitsComponent },  // ✅ Page d'accueil
  { path: 'stats', component: StatsComponent }, // ✅ Page Stats
  { path: 'detail-produit', component: Graph3CourbeComponent }, // ✅ Ajout de la route

];
