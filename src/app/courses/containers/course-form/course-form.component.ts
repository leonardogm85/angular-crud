import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this._formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _coursesService: CoursesService,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const course: Course = this._activatedRoute.snapshot.data['course'];

    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
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
