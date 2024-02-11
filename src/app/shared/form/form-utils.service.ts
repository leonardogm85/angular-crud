import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  validateFormGroup(formGroup: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(formGroup.controls).forEach(name => {
      const abstractControl = formGroup.get(name);

      abstractControl?.markAsTouched({ onlySelf: true });

      if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
        this.validateFormGroup(abstractControl);
      }
    });
  }

  getFormControlByGroup(formGroup: UntypedFormGroup, name: string): UntypedFormControl {
    return formGroup.get(name) as UntypedFormControl;
  }

  getFormControlByArray(formArray: UntypedFormArray, index: number, name: string): UntypedFormControl {
    return formArray.at(index).get(name) as UntypedFormControl;
  }

  getFormArrayByGroup(formGroup: UntypedFormGroup, name: string): UntypedFormArray {
    return formGroup.get(name) as UntypedFormArray;
  }

  getFormControlErrorMessage(control: UntypedFormControl): string {
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

  isFormArrayRequired(array: UntypedFormArray): boolean {
    return !array.valid
      &&
      array.hasError('required')
      &&
      array.touched;
  }

}
