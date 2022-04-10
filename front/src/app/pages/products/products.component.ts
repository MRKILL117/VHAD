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
  timer: any = null;
  isEditing: boolean = false;
  selectedProduct: any = null;
  deletedImages: Array<any> = [];
  products: Array<any> = [];
  txtToFilter: string = '';
  loading: any = {
    creatingOrUpdating: false,
    getting: false,
    deleting: false
  }
  productImages: Array<any> = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]),
    stock: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,}$/)]),
    description: new FormControl('', []),
  });

  constructor(
    private modalService: BsModalService,
    public http: HttpService,
    public file: FileService,
    private toast: ToastService,
    public form: FormService
  ) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static', keyboard: false});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  SetTrigger() {
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.GetProducts();
    }, 300);
  }

  PrepareProductFormToEdit(product: any) {
    this.selectedProduct = Object.assign({}, product);
    if(this.selectedProduct.images.length) this.selectedProduct.images = Array.from(this.selectedProduct.images);
    this.isEditing = true;
    this.productForm.controls['name'].setValue(product.name);
    this.productForm.controls['description'].setValue(product.description);
    this.productForm.controls['price'].setValue(product.price);
    this.productForm.controls['stock'].setValue(product.stock);
  }

  GetProducts() {
    let partialEndpoint = `/Products`;
    if(this.txtToFilter) partialEndpoint = partialEndpoint.concat(`/ThatIncludes/${this.txtToFilter}`);
    this.http.Get(partialEndpoint).subscribe((products: any) => {
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
    });
  }
  
  UpdateProduct() {
    if(!this.productForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.productForm.markAllAsTouched();
      return;
    }
    
    this.loading.creatingOrUpdating = true;
    this.file.UploadFiles(this.productImages, 'product-images').then(filesRoutes => {
      let product = {
        ...this.productForm.value,
        images: filesRoutes,
        deletedImages: this.deletedImages
      }
      this.http.Patch(`Products/${this.selectedProduct ? this.selectedProduct.id : 0}`, {product}).subscribe((productUpdated: any) => {
        this.CloseModal();
        this.GetProducts();
        this.ResetForm();
        this.loading.creatingOrUpdating = false;
      }, err => {
        this.toast.ShowDefaultDanger(`Error al actualizar el producto`);
        console.error("Error al actualizar producto", err);
        this.loading.creatingOrUpdating = false;
      });
    }, err => {
      this.toast.ShowDefaultDanger(`Error al subir imagenes`, err);
    });
  }

  DeleteProduct() {
    this.loading.deleting = true;
    this.http.Delete(`Products/${this.selectedProduct ? this.selectedProduct.id : 0}`).subscribe(productDeleted => {
      this.CloseModal();
      this.GetProducts();
      this.ResetForm();
      this.toast.ShowDefaultSuccess(`Producto eliminado correctamente`);
      this.loading.deleting = false;
    }, err => {
      console.error("Error al elimnar el producto", err);
      this.toast.ShowDefaultDanger(`Error al eliminar producto`);
      this.loading.deleting = false;
    })
  }

  DeleteImage(image: any) {
    const idx = this.selectedProduct.images.findIndex((img: any) => img.id == image.id);
    if(idx != -1) {
      this.selectedProduct.images.splice(idx, 1);
      this.deletedImages.push(image);
    }
  }

  ResetForm() {
    this.form.ResetForm(this.productForm);
    this.selectedProduct = null;
    this.productImages = [];
    this.deletedImages = [];
    this.isEditing = false;
  }

}
