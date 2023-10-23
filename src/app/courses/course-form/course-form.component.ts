import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) {
    this.form = _formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(): void {
    this._coursesService.save(this.form.value).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        this.onError();
      },
    });
  }

  onCancel(): void {
    console.log('cancel');
  }

  onError(): void {
    this._snackBar.open('Error while saving course.', 'Close', { duration: 5000 });
  }

}
