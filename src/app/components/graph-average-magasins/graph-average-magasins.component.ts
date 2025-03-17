import { Component, OnInit, Input, OnChanges, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';
import { FormsModule } from '@angular/forms'; // Pour le select
import { FiltersComponent } from '../filters/filters.component';


@Component({
  selector: 'app-graph-average-magasins',
  standalone: true,
  imports: [NgChartsModule, FormsModule, FiltersComponent,CommonModule],
  templateUrl: './graph-average-magasins.component.html',
  styleUrls: ['./graph-average-magasins.component.css'],
})
export class GraphAverageMagasinsComponent implements OnInit, OnChanges {
  isBrowser: boolean;
  @Input() catID!: number | null;
  @Input() date_debut!: string;
  pieChartLabels: string[] = [];
  pieChartData: any = null;
  pieChartType: ChartType = 'doughnut';

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.isBrowser && this.catID && this.date_debut) {
      const year = Number(this.date_debut.split('-')[0]); // Extraire l'année
      this.fetchData(this.catID, year);
    }
  }

  fetchData(category: number, year: number): void {
    this.produitsService.getAverageMagasins(category, year).subscribe((data: any[]) => {
      this.updateChartData(data);
    });
  }

  updateChartData(data: any[]): void {
    if (data.length === 0) {
      alert('Aucune donnée trouvée.');
      return;
    }
    this.pieChartLabels = data.map(item => item.mois);
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: data.map(item => item.nbmag),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF',
            '#C2E0C6', '#FF5733', '#8E44AD', '#3498DB'
          ],
          hoverOffset: 4
        }
      ]
    };
  }
}
