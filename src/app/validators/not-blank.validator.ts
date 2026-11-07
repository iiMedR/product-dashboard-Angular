import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notBlankValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  return value && value.trim().length > 0
    ? null
    : { notBlank: true };
}
