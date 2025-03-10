import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsService } from '../../services/produits.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: any[] = [];
  topMagasins: any[] = [];

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.produitsService.getMockProduits().subscribe((data) => {
      this.produits = data;
      // Trier par score décroissant et sélectionner les 10 meilleurs
      this.topMagasins = this.produits.sort((a, b) => b.score - a.score).slice(0, 10);
    });
  }
}
