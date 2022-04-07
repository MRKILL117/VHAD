import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FileService } from 'src/app/services/file.service';
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
  productImages: Array<any> = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    key: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  constructor(
    private modalService: BsModalService,
    private http: HttpService,
    public file: FileService,
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
    this.file.UploadFiles(this.productImages, 'product-images').then(filesRoutes => {
      let product = {
        ...this.productForm.value,
        images: filesRoutes
      }
      this.http.Post(`Products`, {product}).subscribe((newProduct: any) => {
        this.CloseModal();
        this.toast.ShowDefaultSuccess(`Producto creado correctamente`);
        this.GetProducts();
        this.ResetForm();
        this.loading.creatingOrUpdating = false;
      }, err => {
        this.toast.ShowDefaultDanger(`Error al crear producto`);
        console.error("Error al crear producto", err);
        this.loading.creatingOrUpdating = false;
      });
    }, err => {
      this.toast.ShowDefaultDanger(`Error al subir imagenes`, err);
    })
  }
  
  UpdateProduct() {
    if(!this.productForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.productForm.markAllAsTouched();
      return;
    }
    
    this.loading.creatingOrUpdating = true;
    this.http.Patch(`Products`, {product: this.productForm.value}).subscribe((productUpdated: any) => {
      this.CloseModal();
      this.GetProducts();
      this.ResetForm();
      this.loading.creatingOrUpdating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al actualizar el producto`);
      console.error("Error al actualizar producto", err);
      this.loading.creatingOrUpdating = false;
    });
  }

  ResetForm() {
    this.form.ResetForm(this.productForm);
    this.productImages = [];
  }

}
