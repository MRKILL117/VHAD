import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  modalRefs: Array<any> = [];
  productsOffered: Array<any> = [];
  loading: any = {
    getting: false,
    updating: false
  }

  constructor(
    private modalService: BsModalService,
    private http: HttpService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.GetOfferedProducts();
  }

  OpenModal(template: any) {
    this.modalRefs.push(this.modalService.show(template, {backdrop: 'static', keyboard: false}));
  }

  CloseModal() {
    if(this.modalRefs.length) this.modalRefs.pop().hide();
  }

  GetOfferedProducts() {
    this.loading.getting = true;
    this.http.Get(`/Products/Offered`).subscribe((productsOffered: any) => {
      this.productsOffered = productsOffered;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener las ofertas", err);
      this.loading.getting = false;
    })
  }

}
