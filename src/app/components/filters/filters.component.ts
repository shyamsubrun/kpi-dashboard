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
  date_debut: string = this.formatDate(new Date()); 
  date_fin: string = this.formatDate(new Date()); 


  @Output() filterChange = new EventEmitter < {
    catID: number; fabID: number; date_debut: string;
  date_fin: string; }>();

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

  emitChange(): void {
    this.filterChange.emit({
      catID: this.catID, fabID: this.fabID, date_debut: this.date_debut,
      date_fin:this.date_fin});
  }

  onDateChange(): void {
  // Convertir les dates en format YYYYMMDD avant l'envoi
  this.date_debut = this.formatDate(new Date(this.date_debut));
  this.date_fin = this.formatDate(new Date(this.date_fin));

  this.emitChange();
}
}