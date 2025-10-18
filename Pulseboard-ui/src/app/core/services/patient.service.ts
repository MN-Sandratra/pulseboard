import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Page } from '../models/Page.model';
import { Patient } from '../models/patient.model';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/patients`;

  list(
    params: { q?: string; page?: number; size?: number; sort?: string } = {}
  ): Observable<Page<Patient>> {
    let hp = new HttpParams();
    if (params.q) hp = hp.set('q', params.q);
    hp = hp
      .set('page', String(params.page ?? 0))
      .set('size', String(params.size ?? 10))
      .set('sort', params.sort ?? 'lastName,asc');
    return this.http.get<Page<Patient>>(this.baseUrl, { params: hp });
  }

  get(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  create(body: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, body);
  }

  update(id: number, body: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
