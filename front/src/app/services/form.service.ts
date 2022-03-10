import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public GetFormControlByName(form: FormGroup, formControlName: string): any {
    return form.get(formControlName);
  }
}
