import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartType, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ProduitsService } from '../../services/produits.service';
import { FormsModule } from '@angular/forms'; // Pour le select

@Component({
  selector: 'app-graph-average-magasins',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './graph-average-magasins.component.html',
  styleUrls: ['./graph-average-magasins.component.css'],
})
export class GraphAverageMagasinsComponent implements OnInit {
  isBrowser: boolean;
  categories: number[] = Array.from({ length: 10 }, (_, i) => i);
  selectedCategory: number | null = null;
  selectedYear: number = 2022; // Par défaut
  years: number[] = [2022, 2023, 2024, 2025]; // Années disponibles
  pieChartLabels: string[] = [];
  pieChartData: any = null;
  pieChartType: ChartType = 'doughnut'; // 📊 Diagramme circulaire

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  onSearch(): void {
    if (this.selectedCategory === null) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }
    this.fetchData(this.selectedCategory, this.selectedYear);
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
