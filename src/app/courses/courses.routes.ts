import { Routes } from "@angular/router";

import { CoursesComponent } from "./containers/courses/courses.component";
import { CourseFormComponent } from "./containers/course-form/course-form.component";
import { courseResolver } from "./guards/course.resolver";

export const coursesRoutes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'new', component: CourseFormComponent, resolve: { course: courseResolver } },
  { path: 'edit/:id', component: CourseFormComponent, resolve: { course: courseResolver } }
];
