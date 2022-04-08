import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { matchString } from '../Common/custom-validators.directive';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public emailRegex: RegExp = /^[a-zA-Zñ0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/;
  public emailOrCodeRegex: RegExp = /(^[0-9]{4}$)|(^[a-zA-Zñ0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/;

  constructor() { }

  public GetFormControlByName(form: FormGroup, formControlName: string): any {
    return form.get(formControlName);
  }

  public ResetForm(form: FormGroup) {
    form.reset();
  }

  public OnPasswordChange(form: FormGroup, controlName: string, controlNameToUpdateValidator: string) {
    const formControl: AbstractControl | null = this.GetFormControlByName(form, controlName);
    const formControltoUpdateValidator: AbstractControl | null = this.GetFormControlByName(form, controlNameToUpdateValidator);
    if(formControl != null && formControltoUpdateValidator != null) {
      const controlValue = formControl.value;
      formControltoUpdateValidator.setValidators([
        Validators.required,
        matchString(controlValue)
      ]);
      formControltoUpdateValidator.updateValueAndValidity({onlySelf: true});
    }
  }

}
