import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormService } from 'src/app/services/form.service';
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
  selectedProduct: any;
  categories: Array<any> = [];
  loading: any = {
    getting: false,
    updating: false
  }
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    stock: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,}$/), Validators.maxLength(6)]),
    categoryId: new FormControl(null, [Validators.required]),
    activeOffer: new FormControl(false, [Validators.required]),
    offerPrice: new FormControl('', []),
  });

  constructor(
    private modalService: BsModalService,
    public http: HttpService,
    private toast: ToastService,
    public form: FormService
  ) { }

  ngOnInit(): void {
    this.GetCategories();
    this.GetOfferedProducts();
  }

  OpenModal(template: any) {
    this.modalRefs.push(this.modalService.show(template, {backdrop: 'static', keyboard: false}));
  }

  CloseModal() {
    if(this.modalRefs.length) this.modalRefs.pop().hide();
  }

  PrepareProductFormToEdit(product: any) {
    this.selectedProduct = Object.assign({}, product);
    this.productForm.controls['name'].setValue(product.name);
    this.productForm.controls['stock'].setValue(product.stock);
    this.productForm.controls['categoryId'].setValue(product.categoryId);
    this.productForm.controls['activeOffer'].setValue(product.activeOffer);
    this.productForm.controls['offerPrice'].setValue(product.offerPrice);
  }

  OnActiveOfferChange(event: any) {
    const checked = event.target.checked;
    if(checked) this.productForm.controls['offerPrice'].setValidators([Validators.required, Validators.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]);
    else this.productForm.controls['offerPrice'].clearValidators();
    this.productForm.controls['offerPrice'].updateValueAndValidity({onlySelf: true});
  }

  GetCategories() {
    this.http.Get(`/Categories`).subscribe((categories: any) => {
      this.categories = categories;
    }, err => {
      console.error("Error al obtener las categorias", err);
    })
  }

  GetOfferedProducts() {
    this.loading.getting = true;
    this.http.Get(`/Products/Offered`).subscribe((productsOffered: any) => {
      this.productsOffered = productsOffered;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener las ofertas", err);
      this.loading.getting = false;
    });
  }

  UpdateProduct() {
    if(!this.productForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.productForm.markAllAsTouched();
      return;
    }
    
    this.loading.creatingOrUpdating = true;
    let product = {
      ...this.productForm.value
    }
    this.http.Patch(`Products/${this.selectedProduct ? this.selectedProduct.id : 0}`, {product}).subscribe((productUpdated: any) => {
      this.CloseModal();
      this.GetOfferedProducts();
      this.form.ResetForm(this.productForm);
      this.toast.ShowDefaultSuccess(`Oferta actualizada correctamente`)
      this.loading.creatingOrUpdating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al actualizar la oferta`);
      console.error("Error al actualizar oferta", err);
      this.loading.creatingOrUpdating = false;
    });
  }

}
