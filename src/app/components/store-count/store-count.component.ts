import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsService } from '../../services/produits.service';

@Component({
  selector: 'app-store-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-count.component.html',
  styleUrls: ['./store-count.component.css']
})
export class StoreCountComponent implements OnChanges {
  @Input() catID!: number;
  @Input() date_debut!: string;
  @Input() date_fin!: string;
  totalMagasins: number | null = null;
  totalFabricants: number | null = null; // ✅ Nouveau KPI
  avgProductsPerFab: number | null = null;

  constructor(private produitsService: ProduitsService) {}

  ngOnChanges(): void {
    if (this.catID) {
      this.fetchStoreCount();
      this.fetchFabricantCount();
      this.fetchAvgProductsPerFab();
    }
  }

  fetchStoreCount(): void {
    this.produitsService.getTotalMagasinsByCatID(this.catID).subscribe(data => {
      this.totalMagasins = data[0]?.total_magasins || 0;
    });
  }

  fetchFabricantCount(): void { // ✅ Récupération des fabricants
    this.produitsService.getTotalFabricantsByCatID(this.catID).subscribe(data => {
      this.totalFabricants = data[0]?.total_fabricants || 0;
    });
  }

  fetchAvgProductsPerFab(): void {
    if (!this.date_debut || !this.date_fin) return;
    
    this.produitsService.getAvgProductsPerFab(this.catID, this.date_debut, this.date_fin).subscribe(data => {
      this.avgProductsPerFab = data[0]?.avg_products_per_fab || 0;
    });
  }


fetchFabricantsCount(): void {
  if (!this.catID) return; // Vérifier que la catégorie est sélectionnée

  this.produitsService.getTotalFabricantsByCatID(this.catID).subscribe(data => {
    this.totalFabricants = data.total_fabricants || 0;
  });
}




}
