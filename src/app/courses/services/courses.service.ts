import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly _api: string = '/api/courses';

  constructor(
    private _httpClient: HttpClient
  ) { }

  list(): Observable<Course[]> {
    return this._httpClient.get<Course[]>(this._api).pipe(
      first()
    );
  }

  loadById(id: string): Observable<Course> {
    return this._httpClient.get<Course>(`${this._api}/${id}`).pipe(
      first()
    );
  }

  save(record: Partial<Course>): Observable<Course> {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: string): Observable<object> {
    return this._httpClient.delete(`${this._api}/${id}`).pipe(
      first()
    );
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this._httpClient.post<Course>(this._api, record).pipe(
      first()
    );
  }

  private update(record: Partial<Course>): Observable<Course> {
    return this._httpClient.put<Course>(`${this._api}/${record._id}`, record).pipe(
      first()
    );
  }
}
