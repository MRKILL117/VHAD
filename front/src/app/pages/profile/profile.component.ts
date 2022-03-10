import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('firstTimeConfigurationModal') firstTimeConfigurationModal: any;
  modalRef: any = null;
  user: any;

  constructor(
    private role: RoleService,
    private toast: ToastService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    this.CheckUserFirstConfiguration();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  CheckUserFirstConfiguration() {
    // if(this.user && !this.user.firstTimeConfiguration) this.OpenModal(this.firstTimeConfigurationModal);
  }

}
