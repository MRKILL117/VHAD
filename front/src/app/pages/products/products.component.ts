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
  categories: Array<any> = [];
  txtToFilter: string = '';
  categoryToFilter: number | null = null;
  loading: any = {
    creatingOrUpdating: false,
    getting: false,
    deleting: false
  }
  productImages: Array<any> = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]),
    stock: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,}$/), Validators.maxLength(6)]),
    description: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
    category: new FormControl(null, [Validators.required]),
    subcategory: new FormControl(null, []),
    activeOffer: new FormControl(false, []),
    offerPrice: new FormControl(null, []),
    isVisible: new FormControl(false, [Validators.required]),
  });

  constructor(
    private modalService: BsModalService,
    public http: HttpService,
    public file: FileService,
    private toast: ToastService,
    public form: FormService
  ) { }

  ngOnInit(): void {
    this.GetCategories();
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
    this.productForm.controls['isVisible'].setValue(product.isVisible);
    this.productForm.controls['category'].setValue(product.category);
    this.productForm.controls['subcategory'].setValue(product.subcategory);
    this.productForm.controls['activeOffer'].setValue(product.activeOffer);
    this.productForm.controls['offerPrice'].setValue(product.offerPrice);
  }
  
  OnActiveOfferChange(event: any) {
    const checked = event.target.checked;
    if(checked) this.productForm.controls['offerPrice'].setValidators([Validators.required, Validators.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]);
    else this.productForm.controls['offerPrice'].setValidators([]);
    this.productForm.controls['offerPrice'].updateValueAndValidity({onlySelf: true});
  }

  OnCategoryChange(category: any) {
    if(category && category.subcategories.length) this.productForm.controls['subcategory'].setValidators([Validators.required]);
    else this.productForm.controls['subcategory'].setValidators([]);
    this.productForm.controls['subcategory'].updateValueAndValidity({onlySelf: true});
  }

  GetCategories() {
    this.http.Get(`/Categories`).subscribe((categories: any) => {
      this.categories = categories;
    }, err => {
      console.error("Error al obtener las categorias", err);
    })
  }

  GetProducts() {
    let partialEndpoint = `/Products`;
    if(this.txtToFilter || this.categoryToFilter) {
      const filterTxt = this.txtToFilter ? this.txtToFilter : '*';
      const filterCategory = this.categoryToFilter ? [this.categoryToFilter] : [];
      partialEndpoint = partialEndpoint.concat(`/ThatIncludes/${filterTxt}/AndCategories/${JSON.stringify(filterCategory)}`);
    }
    this.loading.getting = true;
    this.http.Get(partialEndpoint).subscribe((products: any) => {
      this.products = products;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener los productos", err);
      this.loading.getting = false;
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
    });
  }

  DeleteImage(image: any) {
    const idx = this.selectedProduct.images.findIndex((img: any) => img.id == image.id);
    if(idx != -1) {
      this.selectedProduct.images.splice(idx, 1);
      this.deletedImages.push(image);
    }
  }

  ToggleVisibility(product: any, event: any) {
    if(!event || !event.target) return;
    const checked = event.target.checked;
    product.isVisible = checked;
    this.http.Patch(`/Products/${product ? product.id : 0}/ChangeVisibility`, {isVisible: checked}).subscribe(product => {
      this.toast.ShowDefaultSuccess(`Visibilidad actualizada`);
    }, err => {
      console.error("Error al cambiar visibilidad", err);
      this.toast.ShowDefaultDanger(`Error al cambiar visibilidad`);
    });
  }

  ResetForm() {
    this.form.ResetForm(this.productForm);
    this.productForm.controls['activeOffer'].setValue(false);
    this.selectedProduct = null;
    this.productImages = [];
    this.deletedImages = [];
    this.isEditing = false;
  }

}
