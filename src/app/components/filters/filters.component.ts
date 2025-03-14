import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],  // ❌ Suppression de StoreCountComponent
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  categories = Array.from({ length: 10 }, (_, i) => i);
  catID!: number;
  fabID!: number;
  
  date_debut: string = this.toInputDate(new Date()); 
  date_fin: string = this.toInputDate(new Date()); 
  minDate: string = this.toInputDate(new Date(2022, 0, 1));
  maxDate: string = this.toInputDate(new Date());

  periodes = [
    { label: 'Hiver (Jan-Mars)', debut: '2022-01-01', fin: '2022-03-31' },
    { label: 'Printemps (Avr-Juin)', debut: '2022-04-01', fin: '2022-06-30' },
    { label: 'Été (Juil-Sept)', debut: '2022-07-01', fin: '2022-09-30' },
    { label: 'Automne (Oct-Déc)', debut: '2022-10-01', fin: '2022-12-31' }
  ];

  selectedPeriode: string = '';

  @Output() filterChange = new EventEmitter<{ 
    catID: number; fabID: number; date_debut: string; date_fin: string; 
  }>();

  toInputDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onCatIDChange(event: Event): void {
    this.catID = Number((event.target as HTMLSelectElement).value);
    this.emitChange();
  }

  onFabIDChange(): void {
    this.emitChange();
  }

  onDateChange(): void {
    this.selectedPeriode = '';
    this.emitChange();
  }

  onPeriodeChange(event: Event): void {
    const periode = this.periodes.find(p => p.label === (event.target as HTMLSelectElement).value);
    if (periode) {
      this.date_debut = periode.debut;
      this.date_fin = periode.fin;
      this.selectedPeriode = periode.label;
      this.emitChange();
    }
  }

  emitChange(): void {
    this.filterChange.emit({
      catID: this.catID,
      fabID: this.fabID,
      date_debut: this.date_debut,
      date_fin: this.date_fin
    });
  }
}
