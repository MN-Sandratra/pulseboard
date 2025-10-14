import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Page } from '../models/Page.model';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/doctors`;

  list(
    params: { q?: string; page?: number; size?: number; sort?: string } = {}
  ): Observable<Page<Doctor>> {
    let hp = new HttpParams();
    if (params.q) hp = hp.set('q', params.q);
    hp = hp
      .set('page', String(params.page ?? 0))
      .set('size', String(params.size ?? 10))
      .set('sort', params.sort ?? 'lastName,asc');
    return this.http.get<Page<Doctor>>(this.baseUrl, { params: hp });
  }

  get(id: number) {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  create(body: Doctor) {
    return this.http.post<Doctor>(this.baseUrl, body);
  }

  update(id: number, body: Doctor) {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
