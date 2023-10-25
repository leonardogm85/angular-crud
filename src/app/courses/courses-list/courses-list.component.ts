import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];

  readonly displayedColumns: string[] = [
    'name',
    'category',
    'actions'
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  onAdd(): void {
    this._router.navigate(['new'], { relativeTo: this._activatedRoute });
  }

}
