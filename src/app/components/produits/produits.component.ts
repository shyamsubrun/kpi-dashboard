import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // ✅ Vérifie si c'est le navigateur
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';  
import { ProduitsService } from '../../services/produits.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, NgChartsModule],  // ✅ Ajout ici
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: any[] = [];
  isBrowser: boolean; // ✅ Vérification du navigateur

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartData = {
    labels: [] as string[],
    datasets: [{ data: [] as number[], label: 'Score' }]
  };
  barChartType: ChartType = 'bar';

  constructor(
    private produitsService: ProduitsService,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ Ajout pour détecter l'environnement
  ) {
    this.isBrowser = isPlatformBrowser(platformId); // ✅ Vérifie si c'est le navigateur
  }

  ngOnInit(): void {
    if (this.isBrowser) { // ✅ Exécuter seulement dans le navigateur
      this.produitsService.getMockProduits().subscribe((data: { magID: number; score: number }[]) => {
        const topMagasins = data.sort((a, b) => b.score - a.score).slice(0, 10);
        this.barChartLabels = topMagasins.map((mag) => `Mag ${mag.magID}`);
        this.barChartData.labels = this.barChartLabels;
        this.barChartData.datasets[0].data = topMagasins.map((mag) => mag.score);
      });
    }
  }
}
