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
  @Input() catID!: number; // Récupère `catID` depuis `filters`
  totalMagasins: number | null = null;

  constructor(private produitsService: ProduitsService) {}

  ngOnChanges(): void {
    if (this.catID) {
      this.fetchStoreCount();
    }
  }

  fetchStoreCount(): void {
    this.produitsService.getTotalMagasinsByCatID(this.catID).subscribe(data => {
      this.totalMagasins = data[0]?.total_magasins || 0; // Sécurise en cas d'absence de données
    });
  }
}
