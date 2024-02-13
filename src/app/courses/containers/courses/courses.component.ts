import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Page } from '../../models/page';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  courses$: Observable<Page<Course>> | null = null;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private _coursesService: CoursesService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 }): void {
    this.courses$ = this._coursesService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(() => {
        this.onError('Error while loading available courses.')
        return of<Page<Course>>({
          records: [],
          totalElements: 0,
          totalPages: 10
        });
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
