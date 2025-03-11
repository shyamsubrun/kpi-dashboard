import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';  

@Component({
  selector: 'app-graphique',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './graphique.component.html',
  styleUrls: ['./graphique.component.css']
})
export class GraphiqueComponent implements OnInit {
  isBrowser: boolean;
  
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  barChartLabels: string[] = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai'];
  barChartData = {
    labels: this.barChartLabels,
    datasets: [{ data: [50, 60, 70, 80, 90], label: 'Performance' }]
  };
  barChartType: ChartType = 'bar';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}
}
