import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FiltersComponent, GraphComponent],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent {
  catID = 5;
  fabID!: number;

  updateFilters(filters: { catID: number; fabID: number }) {
    this.catID = filters.catID;
    this.fabID = filters.fabID;
  }

  
}
