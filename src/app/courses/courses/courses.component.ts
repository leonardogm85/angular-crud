import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

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
    'category',
    'actions'
  ];

  constructor(
    private _coursesService: CoursesService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
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

  onAdd(): void {
    this._router.navigate(['new'], { relativeTo: this._activatedRoute });
  }

}
