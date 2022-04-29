import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRefs: Array<any> = [];

  constructor(
    private modalService: BsModalService,
  ) { }

  OpenModal(template: any, keyboard: boolean = true) {
    const modalRef = this.modalService.show(template, {backdrop: 'static', keyboard});
    this.modalRefs.push(modalRef);
  }

  CloseModal() {
    if(this.modalRefs.length) this.modalRefs.pop().hide();
  }

}
