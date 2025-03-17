import { Component, Input, OnChanges, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ChartType, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-graph2-4',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FiltersComponent],
  templateUrl: './graph2-4.component.html',
  styleUrls: ['./graph2-4.component.css'],
})
export class Graph2_4Component implements OnChanges {
  isBrowser: boolean;

  @Input() catID!: number;
  @Input() fabID!: number;

  lineChartLabels: string[] = [];
  lineChartData: any = null;
  lineChartType: ChartType = 'line';
  lineChartOptions: ChartConfiguration['options'] = { responsive: true };

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(): void {
    if (this.catID && this.fabID) {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.produitsService.getScoreSanteTousLesMois(this.catID, this.fabID)
      .subscribe((data: any) => {
        console.log("📡 Réponse de l'API:", data);

        if (!data || !data.top_mag || !Array.isArray(data.top_mag)) {
          console.error("❌ Erreur: La réponse API n'est pas valide", data);
          return;
        }

        this.updateChartData(data.top_mag);
      }, error => {
        console.error("🚨 Erreur API:", error);
      });
  }

  updateChartData(data: any[]): void {
    if (!data.length) {
      console.warn("⚠️ Aucun score santé trouvé pour cette sélection.");
      return;
    }

    this.lineChartLabels = data.map(item => item.mois_annee);
    this.lineChartData = {
      labels: this.lineChartLabels,
      datasets: [
        {
          data: data.map(item => item.avg_percentage),
          label: 'Score Santé (%)',
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }
      ]
    };
  }
}
