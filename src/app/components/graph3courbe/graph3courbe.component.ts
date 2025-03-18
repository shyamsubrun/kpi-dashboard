import { Component, OnInit, OnChanges, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
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
  imports: [CommonModule, NgChartsModule, FormsModule, FiltersComponent],  // ✅ Ajout de `FormsModule`
  templateUrl: './graph3courbe.component.html',
  styleUrls: ['./graph3courbe.component.css'],
})
export class Graph3CourbeComponent implements OnInit, OnChanges {
  isBrowser: boolean;
  @Input() catID: number | null = null; // ✅ Récupération de catID
  @Input() fabID!:number;
  @Input() date_debut!: string; // ✅ Récupération de date_debut
  @Input() date_fin!: string; // ✅ Récupération de date_fin
  fabricantInput: string = '';
  lineChartLabels: string[] = [];
  lineChartData: any = null;
  lineChartType: ChartType = 'line';
  lineChartOptions: ChartConfiguration['options'] = { responsive: true };

  constructor(
    private produitsService: ProduitsService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['fabID']) {
        this.fabricantInput = params['fabID'];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catID'] || changes['fabID']) {
      // Lorsque catID, date_debut ou date_fin changent, on récupère de nouvelles données
      if (this.catID && this.fabID) {
        this.fetchData(this.catID, this.fabID);
      }
    }
  }

  onSearch(): void {
    if (!this.catID || !this.fabricantInput || !this.date_debut || !this.date_fin) {
      alert("Veuillez entrer une catégorie, un fabricant et des dates");
      return;
    }

    const fabID = Number(this.fabricantInput);
    if (isNaN(fabID)) {
      alert("Le fabricant doit être un nombre valide");
      return;
    }

    this.fetchData(this.catID, this.fabID);
  }

  fetchData(catID: number,fabID: number): void {
    this.produitsService.getScoreEvolution(catID,fabID).subscribe((data: any[]) => {
      this.updateChartData(data);
    });
  }

  updateChartData(data: any[]): void {
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
