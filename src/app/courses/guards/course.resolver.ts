import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Observable<Course>> = (route, state) => {

  if (route.paramMap.has('id')) {
    return inject(CoursesService).loadById(route.paramMap.get('id')!);
  }

  return of<Course>({
    _id: '',
    name: '',
    category: ''
  });

};
