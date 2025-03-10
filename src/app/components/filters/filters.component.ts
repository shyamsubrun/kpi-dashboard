import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Import ajouté
import { StoreCountComponent } from '../store-count/store-count.component'; // ✅ Import du composant StoreCount

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule,StoreCountComponent],  // ✅ Ajout de FormsModule
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  categories = Array.from({ length: 10 }, (_, i) => i); // Catégories 0 à 9
  catID = 5;
  fabID!: number;

  @Output() filterChange = new EventEmitter<{ catID: number; fabID: number }>();

  onCatIDChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.catID = Number(target.value);
    this.emitChange();
  }

  onFabIDChange(): void {
    this.emitChange();
  }

  emitChange(): void {
    this.filterChange.emit({ catID: this.catID, fabID: this.fabID });
  }
}