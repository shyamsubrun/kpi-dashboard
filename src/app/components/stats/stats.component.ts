import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  isBrowser: boolean;
  barChartLabels: string[] = [];
  barChartData: any;
  barChartType: ChartType = 'bar';

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId); // ✅ Vérifie si on est sur le navigateur
  }

  async ngOnInit() {
    if (this.isBrowser) {
      const { ChartType } = await import('chart.js'); // ✅ Import dynamique pour éviter l'erreur SSR
      this.barChartType = ChartType.bar;

      this.fetchData();
    }
  }

  fetchData(): void {
    this.produitsService.getTopMagasinsByCatID(4).subscribe((data: any[]) => {
      this.barChartLabels = data.map(mag => `Mag ${mag.magID}`);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          { data: data.map(mag => mag.total_fabricants), label: 'Total Fabricants' },
          { data: data.map(mag => mag.total_produits), label: 'Total Produits' },
          { data: data.map(mag => mag.total_ventes), label: 'Total Ventes' }
        ]
      };
    });
  }
}
