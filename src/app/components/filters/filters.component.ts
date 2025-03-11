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
  catID !: number;
  fabID!: number;
  date_debut: string = this.toInputDate(new Date()); 
  date_fin: string = this.toInputDate(new Date()); 
  minDate: string = this.toInputDate(new Date(2022, 0, 1)); // 1er janvier 2022
  maxDate: string = this.toInputDate(new Date()); // Aujourd’hui


  @Output() filterChange = new EventEmitter < {
    catID: number; fabID: number; date_debut: string;
  date_fin: string; }>();
  toApiDate(date: string): string {
    return date.replace(/-/g, ''); // Ex: 2025-03-10 → 20250310
  }

  // ✅ Convertir Date en YYYY-MM-DD pour <input>
  toInputDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Ex: 2025-03-10
  }
  // ✅ Fonction pour formater la date en YYYYMMDD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un 0 devant si < 10
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}${month}${day}`;
  }
  onCatIDChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.catID = Number(target.value);
    this.emitChange();
  }

  onFabIDChange(): void {
    this.emitChange();
  }
  onDateChange(): void {
    this.emitChange();
  }
  emitChange(): void {
    this.filterChange.emit({
      catID: this.catID,
      fabID: this.fabID,
      date_debut: this.toApiDate(this.date_debut), // Format YYYYMMDD
      date_fin: this.toApiDate(this.date_fin),     // Format YYYYMMDD
    });
  }
}