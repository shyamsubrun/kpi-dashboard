import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { StatsComponent } from './components/stats/stats.component'; // ✅ Import du composant StatsComponent

import { FiltersComponent } from './components/filters/filters.component';
import { Router } from '@angular/router';  // ✅ Ajout

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ProduitsComponent,NgChartsModule,StatsComponent,FiltersComponent], // ✅ Corrigé
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Corrigé
})
export class AppComponent {
  title = 'kpi-dashboard';
  isBrowser: boolean;

  // ✅ Déclaration des filtres globaux
  catID: number = 5;
  fabID!: number;
  date_debut!: string;
  date_fin!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ✅ Mise à jour des filtres depuis `app-filters`
  updateFilters(filters: { catID: number; fabID: number; date_debut: string; date_fin: string }) {
    this.catID = filters.catID;
    this.fabID = filters.fabID;
    this.date_debut = filters.date_debut;
    this.date_fin = filters.date_fin;
  }
}