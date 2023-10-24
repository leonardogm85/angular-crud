import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _coursesService: CoursesService,
    private _snackBar: MatSnackBar,
    private _location: Location
  ) {
    this.form = _formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(): void {
    this._coursesService.save(this.form.value).subscribe({
      next: (value) => {
        this.onSuccess();
      },
      error: (err) => {
        this.onError();
      },
    });
  }

  onCancel(): void {
    this._location.back();
  }

  onSuccess(): void {
    this._snackBar.open('Course saved successfully!', 'Close', { duration: 5000 });
    this.onCancel();
  }

  onError(): void {
    this._snackBar.open('Error while saving course.', 'Close', { duration: 5000 });
  }

}
