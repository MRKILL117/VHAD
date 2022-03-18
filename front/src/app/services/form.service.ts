import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public emailRegex: RegExp = /^[a-zA-Z0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/;

  constructor() { }

  public GetFormControlByName(form: FormGroup, formControlName: string): any {
    return form.get(formControlName);
  }
}
