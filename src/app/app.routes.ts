import { Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { ProduitsComponent } from './components/produits/produits.component';

export const routes: Routes = [
  { path: '', component: ProduitsComponent },  // ✅ Page d'accueil
  { path: 'stats', component: StatsComponent } // ✅ Page Stats
];
