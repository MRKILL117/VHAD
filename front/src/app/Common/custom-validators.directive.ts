import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchString(stringToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(!value) return null;
    if(stringToMatch == control.value) return null;
    return {matchstring: stringToMatch};
  }
}

