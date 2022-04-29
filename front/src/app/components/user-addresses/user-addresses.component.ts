import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  userAddresses: Array<any> = [];

  constructor(
    private http: HttpService,
    public modal: ModalService
  ) { }

  ngOnInit(): void {
  }

  GetUserAddresses() {

  }

}
