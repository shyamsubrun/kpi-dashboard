import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { StatsComponent } from './components/stats/stats.component'; // ✅ Import du composant StatsComponent


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ProduitsComponent,NgChartsModule,StatsComponent], // ✅ Corrigé
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Corrigé
})
export class AppComponent {
  title = 'kpi-dashboard';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
