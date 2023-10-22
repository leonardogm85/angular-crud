import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;

  displayedColumns: string[] = [
    'name',
    'category'
  ];

  constructor(
    private _coursesService: CoursesService,
    private _dialog: MatDialog
  ) {
    this.courses$ = _coursesService.list().pipe(
      catchError(err => {
        this.onError('Error while loading available courses.')
        return of([]);
      })
    );
  }

  onError(message: string): void {
    this._dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

}
