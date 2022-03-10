import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastrService
  ) { }

  ShowDefaultSuccess(message: string, title: string = 'Exito') {
    this.toast.success(message, title);
  }

  ShowDefaultWarning(message: string, title: string = 'Advertencia') {
    this.toast.warning(message, title);
  }

  ShowDefaultDanger(message: string, title: string = 'Error') {
    this.toast.error(message, title);
  }
  ShowDefaultInfo(message: string, title: string = 'Información') {
    this.toast.info(message, title);
  }
}
