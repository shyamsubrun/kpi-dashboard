import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  private baseUrl = 'http://127.0.0.1:8000/api/produits/';

  constructor(private http: HttpClient) {}

  getStatsByCatFab(catID: number, fabID: number): Observable<any> {
    const url = `${this.baseUrl}?type=avg-cat-fab-10-mag&catID=${catID}&fabID=${fabID}`;
    return this.http.get<any>(url);
  }

  getTotalMagasinsByCatID(catID: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/produits/?type=mag-cat&catID=${catID}`;
    return this.http.get<any>(url);
  }



  getTotalMfabByCatID(catID: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/produits/?type=fab-cat&catID=${catID}`;
    return this.http.get<any>(url);
  }
  

}
