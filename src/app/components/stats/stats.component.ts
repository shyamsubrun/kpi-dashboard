import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HeaderComponent],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  isBrowser: boolean;
  barChartLabels: string[] = [];
  barChartData: any = null; // ✅ Initialise bien `barChartData`
  barChartType: ChartType = 'bar'; 

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      console.log('✅ Fetching data for stats page...'); // ✅ Vérification
      this.fetchData();
    }
  }

  fetchData(): void {
    this.produitsService.getTopMagasinsByCatID(4).subscribe((data: any[]) => {
      console.log('📊 Data received:', data); // ✅ Vérifie si l'API répond

      this.barChartLabels = data.map(mag => `Mag ${mag.magid}`);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          { data: data.map(mag => mag.total_fabricants), label: 'Total Fabricants', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
          { data: data.map(mag => mag.total_produits), label: 'Total Produits', backgroundColor: 'rgba(54, 162, 235, 0.5)' },
          { data: data.map(mag => mag.total_ventes), label: 'Total Ventes', backgroundColor: 'rgba(255, 206, 86, 0.5)' }
        ]
      };
    });
  }
}
