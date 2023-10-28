import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private _coursesService: CoursesService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(): void {
    this.courses$ = this._coursesService.list().pipe(
      catchError(() => {
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

  onEdit(course: Course): void {
    this._router.navigate(['edit', course._id], { relativeTo: this._activatedRoute });
  }

  onDelete(course: Course): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: 'Are you sure you want to remove this course?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._coursesService.remove(course._id).subscribe({
          next: () => {
            this.refresh();
            this._snackBar.open('Course removed successfully!', 'Close', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => {
            this.onError('Error while removing course.');
          }
        });
      }
    });
  }

}
