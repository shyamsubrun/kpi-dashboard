import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ChartType, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Ajout pour l'input
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-graph3courbe',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule,FiltersComponent],  // ✅ Ajout de `FormsModule`
  templateUrl: './graph3courbe.component.html',
  styleUrls: ['./graph3courbe.component.css'],
})
export class Graph3CourbeComponent implements OnInit {
  isBrowser: boolean;
  categories: number[] = Array.from({ length: 10 }, (_, i) => i);
  selectedCategory: number | null = null;
  fabricantInput: string = '';
  lineChartLabels: string[] = [];
  lineChartData: any = null;
  lineChartType: ChartType = 'line';
  lineChartOptions: ChartConfiguration['options'] = { responsive: true };
  catID: number | null = null; // ✅ Permet d'utiliser "Toutes les catégories"
  fabID!: number;
  constructor(
    private produitsService: ProduitsService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // ✅ Ne charge pas de données au début, juste récupère les paramètres URL si présents
    this.route.queryParams.subscribe(params => {
      if (params['fabID']) {
        this.fabricantInput = params['fabID'];
      }
    });
  }

  onSearch(): void {
    if (!this.selectedCategory || !this.fabricantInput) {
      alert("Veuillez entrer une catégorie et un fabricant");
      return;
    }

    const fabID = Number(this.fabricantInput);
    if (isNaN(fabID)) {
      alert("Le fabricant doit être un nombre valide");
      return;
    }

    this.fetchData(this.selectedCategory, fabID);
  }
  updateFilters(filters: { catID: number | null; fabID: number }) {
    this.catID = filters.catID;
    this.fabID = filters.fabID;
  
    if (this.catID === null || this.fabID === 0) {
      console.warn("❌ Catégorie ou fabricant invalide.");
      return; // Ne pas appeler fetchData si les valeurs sont invalides
    }
  
    this.fetchData(this.catID, this.fabID); // ✅ Appel correct de fetchData avec les paramètres
  }
  
  
  fetchData(category: number, fabricant: number): void {
    this.produitsService.getScoreEvolution(category, fabricant).subscribe((data: any[]) => {
      this.updateChartData(data);
    });
  }

  updateChartData(data: any[]): void {
    if (data.length === 0) {
      alert("Aucune donnée trouvée pour cette sélection.");
      return;
    }

    this.lineChartLabels = data.map(item => item.mois);
    this.lineChartData = {
      labels: this.lineChartLabels,
      datasets: [
        {
          data: data.map(item => item.ventes_fab),
          label: 'Nombre vente',
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }
      ]
    };
  }


}
