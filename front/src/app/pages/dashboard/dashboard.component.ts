import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productsOffered: Array<any> = [];
  loading: any = {
    getting: false
  }

  constructor(
    public http: HttpService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.GetOfferedProducts();
  }

  GetOfferedProducts() {
    this.loading.getting = true;
    this.http.Get(`/Products/OfferedAsCostumer/1`).subscribe((productsOffered: any) => {
      this.productsOffered = productsOffered;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener las ofertas", err);
      this.loading.getting = false;
    });
  }

}
