import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  modalRef: any;
  isEditing: boolean = false;
  products: Array<any> = [];
  loading: any = {
    creatingOrUpdating: false,
    getting: false,
    deleting: false
  }
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    key: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  constructor(
    private modalService: BsModalService,
    private http: HttpService,
    private toast: ToastService,
    public form: FormService
  ) { }

  ngOnInit(): void {
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static', keyboard: false});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  GetProducts() {
    this.http.Get(`Products`).subscribe((products: any) => {
      this.products = products;
    }, err => {
      console.error("Error al obtener los productos", err);
    });
  }

  CreateProduct() {
    if(!this.productForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading.creatingOrUpdating = true;
    this.http.Post(`Products`, {product: this.productForm.value}).subscribe((newProduct: any) => {
      this.toast.ShowDefaultSuccess(`Producto creado correctamente`);
      this.GetProducts();
      this.loading.creatingOrUpdating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear producto`);
      console.error("Error al crear producto", err);
      this.loading.creatingOrUpdating = false;
    });
  }
  
  UpdateProduct() {
    if(!this.productForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.productForm.markAllAsTouched();
      return;
    }
    
    this.loading.creatingOrUpdating = true;
    this.http.Patch(`Products`, {product: this.productForm.value}).subscribe((productUpdated: any) => {
      this.GetProducts();
      this.loading.creatingOrUpdating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al actualizar el producto`);
      console.error("Error al actualizar producto", err);
      this.loading.creatingOrUpdating = false;
    });
  }

}
