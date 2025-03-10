import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ProduitsComponent,NgChartsModule], // ✅ Corrigé
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Corrigé
})
export class AppComponent {
  title = 'kpi-dashboard';
}
