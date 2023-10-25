import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];

  @Output() add: EventEmitter<void> = new EventEmitter<void>();

  readonly displayedColumns: string[] = [
    'name',
    'category',
    'actions'
  ];

  onAdd(): void {
    this.add.emit();
  }

}
