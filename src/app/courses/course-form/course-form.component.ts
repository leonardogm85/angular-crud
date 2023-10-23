import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.form = _formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(): void {
console.log('submit');
  }

  onCancel(): void {
    console.log('cancel');
  }

}
