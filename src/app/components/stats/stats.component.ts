import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ChartType, ChartConfiguration } from 'chart.js';
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
  barChartData: any = null;
  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y', // 🔄 Barres horizontales
    scales: {
      x: {
        stacked: true // ✅ Permet d'empiler les segments dans chaque barre
      },
      y: {
        stacked: true
      }
    }
  };
  categories = Array.from({ length: 10 }, (_, i) => i);
  selectedCategory: number | null = null;

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.fetchData();
    }
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value === "all" ? null : Number(target.value);
    this.fetchData();
  }

  fetchData(): void {
    this.produitsService.getTopMagasins(this.selectedCategory).subscribe((data: any[]) => {
      if (this.selectedCategory == null) {
        this.updateChartData_all(data);
      } 
      else this.updateChartData(data);
    });
  }

  updateChartData(data: any[]): void {
    console.log('📊 Data received:', data);

    this.barChartLabels = data.map(mag => mag.magid ? `Mag ${mag.magid}` : 'Mag inconnu');
    // ✅ Calcul des segments
    const segment1 = data.map(mag => (mag.score || 0) * 0.6);
    const segment2 = data.map(mag => (mag.score || 0) * 0.3);
    const segment3 = data.map(mag => (mag.score || 0) * 0.1);

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        { data: segment1, label: 'Vente (60%)', backgroundColor: 'rgba(75, 192, 192, 0.8)' },
        { data: segment2, label: 'Produit (30%)', backgroundColor: 'rgba(255, 159, 64, 0.8)' },
        { data: segment3, label: 'Fabricant (10%)', backgroundColor: 'rgba(255, 99, 132, 0.8)' }
      ]
    };
  }
  updateChartData_all(data: any[]): void {
    console.log('📊 Data received:', data);

    this.barChartLabels = data.map(mag => mag.magid ? `Mag ${mag.magid}` : 'Mag inconnu');
    const segment1 = data.map(mag => (mag.score || 0) * 0.4);
    const segment2 = data.map(mag => (mag.score || 0) * 0.3);
    const segment3 = data.map(mag => (mag.score || 0) * 0.2);
    const segment4 = data.map(mag => (mag.score || 0) * 0.1);

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        { data: segment1, label: 'Vente (40%)', backgroundColor: 'rgba(75, 192, 192, 0.8)' },
        { data: segment2, label: 'Produit (30%)', backgroundColor: 'rgba(255, 159, 64, 0.8)' },
        { data: segment3, label: 'Catégorie (20%)', backgroundColor: 'rgba(255, 1, 64, 0.8)' },
        { data: segment4, label: 'Fabricant (10%)', backgroundColor: 'rgba(255, 99, 132, 0.8)' }
      ]
    };
  }
}
