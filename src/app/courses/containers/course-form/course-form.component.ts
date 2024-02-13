import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCard, MatToolbar, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatHint, NgIf, MatError, MatSelect, MatOption, MatIconButton, MatIcon, NgFor, MatPrefix, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {

  // form = this._formBuilder.group({
  //   _id: [''],
  //   name: ['', [
  //     Validators.required,
  //     Validators.minLength(5),
  //     Validators.maxLength(100)
  //   ]],
  //   category: ['', [
  //     Validators.required
  //   ]]
  // });

  form!: FormGroup;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _coursesService: CoursesService,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    public formService: FormUtilsService
  ) { }

  ngOnInit(): void {
    const course: Course = this._activatedRoute.snapshot.data['course'];

    // this.form.setValue({
    //   _id: course._id,
    //   name: course.name,
    //   category: course.category
    // });

    this.form = this._formBuilder.group({
      _id: [course._id],
      name: [course.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      category: [course.category, [
        Validators.required
      ]],
      lessons: this._formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this._coursesService.save(this.form.value).subscribe({
        next: (value) => {
          this.onSuccess();
        },
        error: (err) => {
          this.onError();
        },
      });
    } else {
      this.formService.validateFormGroup(this.form);
    }
  }

  onCancel(): void {
    this._location.back();
  }

  private onSuccess(): void {
    this._snackBar.open('Course saved successfully!', 'Close', { duration: 5000 });
    this.onCancel();
  }

  private onError(): void {
    this._snackBar.open('Error while saving course.', 'Close', { duration: 5000 });
  }

  private retrieveLessons(course: Course): UntypedFormGroup[] {
    const lessons: UntypedFormGroup[] = [];

    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }): UntypedFormGroup {
    return this._formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]]
    });
  }

  getLessons(): UntypedFormArray {
    return this.formService.getFormArrayByGroup(this.form, 'lessons');
  }

  getControlOfLesson(index: number, name: string): UntypedFormControl {
    return this.formService.getFormControlByArray(this.getLessons(), index, name);
  }

  getControlOfCourse(name: string): UntypedFormControl {
    return this.formService.getFormControlByGroup(this.form, name);
  }

  addLesson(): void {
    this.getLessons().push(this.createLesson());
  }

  deleteLesson(index: number): void {
    this.getLessons().removeAt(index);
  }

}
