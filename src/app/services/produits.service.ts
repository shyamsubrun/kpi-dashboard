import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  private mockUrl = 'assets/mocks/mock-produits.json'; // ✅ URL vers ton fichier mock

  constructor(private http: HttpClient) {}

  getMockProduits(): Observable<any> {
    return this.http.get<any>(this.mockUrl);
  }
}
