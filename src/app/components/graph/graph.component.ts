import { Component, Input, OnChanges, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnChanges {
  @Input() catID!: number;
  @Input() fabID!: number;

  isBrowser: boolean;
  average: number = 0;
  barChartLabels: string[] = [];
  barChartData = {
    labels: [] as string[],
    datasets: [{ data: [] as number[], label: 'Percentage' }]
  };
  barChartOptions: ChartConfiguration['options'] = { responsive: true };
  barChartType: ChartType = 'bar';

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(): void {
    if (this.isBrowser) {
      this.fetchData();
    }
  }

  fetchData(): void {
    if (!this.catID || !this.fabID) return;

    this.produitsService.getStatsByCatFab(this.catID, this.fabID).subscribe((data) => {
      this.average = data.average;
      const topMagasins = data.top_mag;

      this.barChartLabels = topMagasins.map((mag: { magID: number }) => `Mag ${mag.magID}`);
      this.barChartData.labels = this.barChartLabels;
      this.barChartData.datasets[0].data = topMagasins.map((mag: { percentage: number }) => mag.percentage);

      this.barChartData = { ...this.barChartData }; // ✅ Force le rafraîchissement
    });
  }
}
