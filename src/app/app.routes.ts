import { Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
  { path: 'stats', component: StatsComponent }, // ✅ Route vers le composant Stats
  { path: '', redirectTo: 'stats', pathMatch: 'full' } // ✅ Redirige vers /stats par défaut
];
