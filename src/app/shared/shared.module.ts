import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
