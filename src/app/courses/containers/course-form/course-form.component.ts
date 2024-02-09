import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
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
    private _activatedRoute: ActivatedRoute
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
    console.log(this.form);
    console.log(this.form.value);
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
      alert('The form is invalid.');
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

  getErrorMessage<TType>(control: AbstractControl<TType>): string {
    if (control.hasError('required')) {
      return 'The value must be provided.';
    }

    if (control.hasError('minlength')) {
      return `The value must be a minimum of ${control.getError('minlength')['requiredLength']} characters.`;
    }

    if (control.hasError('maxlength')) {
      return `The value must be a maximum of ${control.getError('maxlength')['requiredLength']} characters.`;
    }

    return 'The value is invalid.';
  }

  private retrieveLessons(course: Course) {
    const lessons = [];

    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
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

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons'));
  }

  getLessonFormControlByIndex(index: number, name: string) {
    return this.getLessonsFormArray().at(index).get(name);
  }

  isFormArrayRequired(): boolean {
    const lessons = this.getLessonsFormArray();

    return !lessons.valid
      &&
      lessons.hasError('required')
      &&
      lessons.touched;
  }

  addLesson(): void {
    this.getLessonsFormArray().push(this.createLesson());
  }

  deleteLesson(index: number): void {
    this.getLessonsFormArray().removeAt(index);
  }

}
