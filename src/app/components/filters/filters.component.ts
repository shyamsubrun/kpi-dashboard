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
  catID!: number;
  fabID!: number;
  
  // Dates manuelles
  date_debut: string = this.toInputDate(new Date()); 
  date_fin: string = this.toInputDate(new Date()); 
  minDate: string = this.toInputDate(new Date(2022, 0, 1)); // 1er janvier 2022
  maxDate: string = this.toInputDate(new Date()); // Aujourd’hui
  
  // Liste des périodes (trimestres)
  periodes = [
    { label: 'Hiver (Jan-Mars)', debut: '20220101', fin: '20220331' },
    { label: 'Printemps (Avr-Juin)', debut: '20220401', fin: '20220630' },
    { label: 'Été (Juil-Sept)', debut: '20220701', fin: '20220930' },
    { label: 'Automne (Oct-Déc)', debut: '20221001', fin: '20221231' }
  ];

  selectedPeriode: string = ''; // Stocke la période sélectionnée

  @Output() filterChange = new EventEmitter<{ 
    catID: number; fabID: number; date_debut: string; date_fin: string; 
  }>();

  toApiDate(date: string): string {
    return date.replace(/-/g, '-'); // Ex: 2025-03-10 → 20250310
  }

  // ✅ Convertir Date en YYYY-MM-DD pour <input>
  toInputDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Ex: 2025-03-10
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
    this.selectedPeriode = ''; // ✅ Si l'utilisateur change la date manuellement, on reset la période
    this.emitChange();
  }

  onPeriodeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const periode = this.periodes.find(p => p.label === target.value);
    if (periode) {
      this.date_debut = this.formatApiToInputDate(periode.debut);
      this.date_fin = this.formatApiToInputDate(periode.fin);
      this.selectedPeriode = periode.label;
      this.emitChange();
    }
  }

  // ✅ Transforme "20220101" en "2022-01-01" pour <input type="date">
  formatApiToInputDate(apiDate: string): string {
    return `${apiDate.slice(0, 4)}-${apiDate.slice(4, 6)}-${apiDate.slice(6, 8)}`;
  }

  emitChange(): void {
    this.filterChange.emit({
      catID: this.catID,
      fabID: this.fabID,
      date_debut: this.toApiDate(this.date_debut),
      date_fin: this.toApiDate(this.date_fin),
    });
  }
}
