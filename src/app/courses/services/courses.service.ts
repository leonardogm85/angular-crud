import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, tap } from 'rxjs';

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
      first(),
      tap(console.log)
    );
  }

  save(record: Course): Observable<Course> {
    return this._httpClient.post<Course>(this._api, record).pipe(
      first()
    );
  }
}
