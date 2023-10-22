import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, first, tap } from 'rxjs';

import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly _api: string = '/assets/courses.json';

  constructor(
    private _httpClient: HttpClient
  ) { }

  list(): Observable<Course[]> {
    return this._httpClient.get<Course[]>(this._api).pipe(
      first(),
      delay(1000),
      tap(console.log)
    );
  }
}
