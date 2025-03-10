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
  totalMagasins: number | null = null;
  totalFabricants: number | null = null; // ✅ Nouveau KPI

  constructor(private produitsService: ProduitsService) {}

  ngOnChanges(): void {
    if (this.catID) {
      this.fetchStoreCount();
      this.fetchFabricantCount();
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
}
