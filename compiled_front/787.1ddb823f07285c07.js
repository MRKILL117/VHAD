"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[787],{9787:(T,p,s)=>{s.r(p),s.d(p,{OffersModule:()=>S});var d=s(6019),Z=s(9845),c=s(7537),_=s(1859),m=s(4611),e=s(1514),a=s(7754),f=s(6588),h=s(830);function g(o,l){if(1&o&&e._UZ(0,"img",22),2&o){const t=e.oxw().$implicit,r=e.oxw(3);e.Q6J("src",r.http.apiBaseUrl+t.images[0].partialURL,e.LSH)("alt",t.images[0].name)}}function u(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"div",9),e.TgZ(1,"div",10),e.YNc(2,g,1,2,"img",11),e.qZA(),e.TgZ(3,"div",12),e.TgZ(4,"div",13),e.TgZ(5,"label",14),e._uU(6,"Categor\xeda"),e.qZA(),e.TgZ(7,"div",15),e._uU(8),e.qZA(),e.qZA(),e.TgZ(9,"div",13),e.TgZ(10,"label",16),e._uU(11,"Nombre"),e.qZA(),e.TgZ(12,"div",15),e._uU(13),e.qZA(),e.qZA(),e.TgZ(14,"div",13),e.TgZ(15,"label",17),e._uU(16,"Stock disponible"),e.qZA(),e.TgZ(17,"div",15),e._uU(18),e.qZA(),e.qZA(),e.TgZ(19,"div",13),e.TgZ(20,"label",17),e._uU(21,"Precio de oferta"),e.qZA(),e.TgZ(22,"div",15),e._uU(23),e.qZA(),e.qZA(),e.qZA(),e.TgZ(24,"div",18),e.TgZ(25,"div",13),e.TgZ(26,"div",19),e.TgZ(27,"button",20),e.NdJ("click",function(){const i=e.CHM(t).$implicit,v=e.oxw(3),V=e.MAs(10);return v.PrepareProductFormToEdit(i),v.OpenModal(V)}),e._UZ(28,"i",21),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=l.$implicit;e.xp6(2),e.Q6J("ngIf",null==t||null==t.images?null:t.images.length),e.xp6(6),e.hij(" ",null==t.category?null:t.category.name," "),e.xp6(5),e.hij(" ",t.name," "),e.xp6(5),e.hij(" ",t.stock," "),e.xp6(5),e.hij(" ",t.offerPrice," ")}}function x(o,l){if(1&o&&(e.ynx(0),e.TgZ(1,"div",7),e.YNc(2,u,29,5,"div",8),e.qZA(),e.BQk()),2&o){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.productsOffered)}}function C(o,l){if(1&o&&(e.ynx(0),e.YNc(1,x,3,1,"ng-container",3),e.BQk()),2&o){const t=e.oxw(),r=e.MAs(8);e.xp6(1),e.Q6J("ngIf",t.productsOffered.length)("ngIfElse",r)}}function O(o,l){1&o&&(e.TgZ(0,"div",23),e.TgZ(1,"div",24),e._UZ(2,"i",25),e.qZA(),e.qZA())}function A(o,l){1&o&&(e.TgZ(0,"div",26),e.TgZ(1,"span"),e._uU(2,"Sin ofertas registrados"),e.qZA(),e.qZA())}function F(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," Seleccione una categor\xeda "),e.qZA())}function y(o,l){if(1&o&&(e.TgZ(0,"div",50),e.YNc(1,F,2,0,"span",51),e.qZA()),2&o){const t=e.oxw(2);let r;e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.productForm,"categoryId"))||null==r.errors?null:r.errors.required)}}function q(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," Escriba el nombre del producto "),e.qZA())}function b(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," M\xednimo 6 caracteres "),e.qZA())}function N(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," M\xe1ximo 20 caracteres "),e.qZA())}function k(o,l){if(1&o&&(e.TgZ(0,"div",50),e.YNc(1,q,2,0,"span",51),e.YNc(2,b,2,0,"span",51),e.YNc(3,N,2,0,"span",51),e.qZA()),2&o){const t=e.oxw(2);let r,n,i;e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.productForm,"name"))||null==r.errors?null:r.errors.required),e.xp6(1),e.Q6J("ngIf",null==(n=t.form.GetFormControlByName(t.productForm,"name"))||null==n.errors?null:n.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==(i=t.form.GetFormControlByName(t.productForm,"name"))||null==i.errors?null:i.errors.maxlength)}}function I(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," Escriba el stock disponible del producto "),e.qZA())}function U(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," Stock inv\xe1lido "),e.qZA())}function P(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," M\xe1ximo 6 caracteres "),e.qZA())}function w(o,l){if(1&o&&(e.TgZ(0,"div",50),e.YNc(1,I,2,0,"span",51),e.YNc(2,U,2,0,"span",51),e.YNc(3,P,2,0,"span",51),e.qZA()),2&o){const t=e.oxw(2);let r,n,i;e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.productForm,"stock"))||null==r.errors?null:r.errors.required),e.xp6(1),e.Q6J("ngIf",null==(n=t.form.GetFormControlByName(t.productForm,"stock"))||null==n.errors?null:n.errors.pattern),e.xp6(1),e.Q6J("ngIf",null==(i=t.form.GetFormControlByName(t.productForm,"stock"))||null==i.errors?null:i.errors.maxlength)}}function J(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," Escriba el precio de oferta del producto "),e.qZA())}function G(o,l){1&o&&(e.TgZ(0,"span",52),e._uU(1," Precio inv\xe1lido Ej. 10.25 "),e.qZA())}function E(o,l){if(1&o&&(e.TgZ(0,"div",50),e.YNc(1,J,2,0,"span",51),e.YNc(2,G,2,0,"span",51),e.qZA()),2&o){const t=e.oxw(3);let r,n;e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.productForm,"offerPrice"))||null==r.errors?null:r.errors.required),e.xp6(1),e.Q6J("ngIf",null==(n=t.form.GetFormControlByName(t.productForm,"offerPrice"))||null==n.errors?null:n.errors.pattern)}}function M(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"div",13),e.TgZ(1,"label",53),e._uU(2,"Precio de oferta"),e.qZA(),e.TgZ(3,"input",54),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw(2).UpdateProduct()}),e.qZA(),e.YNc(4,E,3,2,"div",35),e.qZA()}if(2&o){const t=e.oxw(2);let r;e.xp6(4),e.Q6J("ngIf",(null==(r=t.form.GetFormControlByName(t.productForm,"offerPrice"))?null:r.touched)&&(null==(r=t.form.GetFormControlByName(t.productForm,"offerPrice"))?null:r.errors))}}function Y(o,l){1&o&&(e.TgZ(0,"span"),e._uU(1,"Actualizar"),e.qZA())}function B(o,l){1&o&&(e.TgZ(0,"span"),e._UZ(1,"i",55),e.qZA())}function Q(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"div",27),e.TgZ(1,"div",28),e.TgZ(2,"h3",29),e._uU(3,"Editar producto"),e.qZA(),e.TgZ(4,"button",30),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return n.CloseModal(),n.form.ResetForm(n.productForm)}),e.TgZ(5,"span"),e._uU(6,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"div",31),e.TgZ(8,"form",32),e.TgZ(9,"div",13),e.TgZ(10,"label",33),e._uU(11,"Categor\xeda"),e.qZA(),e._UZ(12,"ng-select",34),e.YNc(13,y,2,1,"div",35),e.qZA(),e.TgZ(14,"div",13),e.TgZ(15,"label",36),e._uU(16,"Nombre"),e.qZA(),e.TgZ(17,"input",37),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().UpdateProduct()}),e.qZA(),e.YNc(18,k,4,3,"div",35),e.qZA(),e.TgZ(19,"div",13),e.TgZ(20,"label",38),e._uU(21,"Stock disponible"),e.qZA(),e.TgZ(22,"input",39),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().UpdateProduct()}),e.qZA(),e.YNc(23,w,4,3,"div",35),e.qZA(),e.TgZ(24,"div",13),e.TgZ(25,"div",40),e.TgZ(26,"label",41),e._uU(27,"En oferta"),e.qZA(),e.TgZ(28,"div"),e.TgZ(29,"label",42),e.TgZ(30,"input",43),e.NdJ("change",function(n){return e.CHM(t),e.oxw().OnActiveOfferChange(n)}),e.qZA(),e._UZ(31,"span",44),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(32,M,5,1,"div",45),e.qZA(),e.qZA(),e.TgZ(33,"div",46),e.TgZ(34,"button",47),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return n.CloseModal(),n.form.ResetForm(n.productForm)}),e._uU(35," Cancelar "),e.qZA(),e.TgZ(36,"button",48),e.NdJ("click",function(){return e.CHM(t),e.oxw().UpdateProduct()}),e.YNc(37,Y,2,0,"span",49),e.YNc(38,B,2,0,"span",49),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=e.oxw();let r,n,i;e.xp6(8),e.Q6J("formGroup",t.productForm),e.xp6(4),e.Q6J("items",t.categories)("readonly",!0),e.xp6(1),e.Q6J("ngIf",(null==(r=t.form.GetFormControlByName(t.productForm,"categoryId"))?null:r.touched)&&(null==(r=t.form.GetFormControlByName(t.productForm,"categoryId"))?null:r.errors)),e.xp6(5),e.Q6J("ngIf",(null==(n=t.form.GetFormControlByName(t.productForm,"name"))?null:n.touched)&&(null==(n=t.form.GetFormControlByName(t.productForm,"name"))?null:n.errors)),e.xp6(5),e.Q6J("ngIf",(null==(i=t.form.GetFormControlByName(t.productForm,"stock"))?null:i.touched)&&(null==(i=t.form.GetFormControlByName(t.productForm,"stock"))?null:i.errors)),e.xp6(9),e.Q6J("ngIf",t.form.GetFormControlByName(t.productForm,"activeOffer").value),e.xp6(4),e.Q6J("disabled",t.loading.creatingOrUpdating),e.xp6(1),e.Q6J("ngIf",!t.loading.creatingOrUpdating),e.xp6(1),e.Q6J("ngIf",t.loading.creatingOrUpdating)}}const z=[{path:"",component:(()=>{class o{constructor(t,r,n,i){this.modalService=t,this.http=r,this.toast=n,this.form=i,this.modalRefs=[],this.productsOffered=[],this.categories=[],this.loading={getting:!1,updating:!1},this.productForm=new c.cw({name:new c.NI("",[c.kI.required,c.kI.minLength(6),c.kI.maxLength(20)]),stock:new c.NI("",[c.kI.required,c.kI.pattern(/^[0-9]{1,}$/),c.kI.maxLength(6)]),categoryId:new c.NI(null,[c.kI.required]),activeOffer:new c.NI(!1,[c.kI.required]),offerPrice:new c.NI("",[])})}ngOnInit(){this.GetCategories(),this.GetOfferedProducts()}OpenModal(t){this.modalRefs.push(this.modalService.show(t,{backdrop:"static",keyboard:!1}))}CloseModal(){this.modalRefs.length&&this.modalRefs.pop().hide()}PrepareProductFormToEdit(t){this.selectedProduct=Object.assign({},t),this.productForm.controls.name.setValue(t.name),this.productForm.controls.stock.setValue(t.stock),this.productForm.controls.categoryId.setValue(t.categoryId),this.productForm.controls.activeOffer.setValue(t.activeOffer),this.productForm.controls.offerPrice.setValue(t.offerPrice)}OnActiveOfferChange(t){t.target.checked?this.productForm.controls.offerPrice.setValidators([c.kI.required,c.kI.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]):this.productForm.controls.offerPrice.clearValidators(),this.productForm.controls.offerPrice.updateValueAndValidity({onlySelf:!0})}GetCategories(){this.http.Get("/Categories").subscribe(t=>{this.categories=t},t=>{console.error("Error al obtener las categorias",t)})}GetOfferedProducts(){this.loading.getting=!0,this.http.Get("/Products/Offered").subscribe(t=>{this.productsOffered=t,this.loading.getting=!1},t=>{console.error("Error al obtener las ofertas",t),this.loading.getting=!1})}UpdateProduct(){if(!this.productForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario","Formulario incompleto"),void this.productForm.markAllAsTouched();this.loading.creatingOrUpdating=!0;let t=Object.assign({},this.productForm.value);this.http.Patch(`Products/${this.selectedProduct?this.selectedProduct.id:0}`,{product:t}).subscribe(r=>{this.CloseModal(),this.GetOfferedProducts(),this.form.ResetForm(this.productForm),this.toast.ShowDefaultSuccess("Oferta actualizada correctamente"),this.loading.creatingOrUpdating=!1},r=>{this.toast.ShowDefaultDanger("Error al actualizar la oferta"),console.error("Error al actualizar oferta",r),this.loading.creatingOrUpdating=!1})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(_.tT),e.Y36(a.O),e.Y36(f.k),e.Y36(h.o))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-offers"]],decls:11,vars:2,consts:[[1,"row","mt-3","mb-4"],[1,"col-12","view-title","d-flex","justify-content-between","align-items-center"],[1,"d-inline-block"],[4,"ngIf","ngIfElse"],["bigLoading",""],["noOffers",""],["createOrEditProductModal",""],[1,"card-columns","px-3"],["class","card pt-0 px-0",4,"ngFor","ngForOf"],[1,"card","pt-0","px-0"],[1,"card-header","p-0","mb-2"],["class","card-image-header",3,"src","alt",4,"ngIf"],[1,"card-body","pb-0"],[1,"form-group"],["for","category",1,"card-info-label"],[1,"card-info"],["for","name",1,"card-info-label"],["for","stock",1,"card-info-label"],[1,"card-footer","pt-0"],[1,"d-flex","justify-content-between","mt-2"],[1,"btn","btn-info","btn-block",3,"click"],[1,"zmdi","zmdi-edit"],[1,"card-image-header",3,"src","alt"],[1,"row"],[1,"col-12","col-flex-center"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"w-100","text-center",2,"font-size","1.5rem","font-weight","bold"],[1,"modal-content"],[1,"modal-header"],[1,"modaltitle"],[1,"close",3,"click"],[1,"modal-body"],[3,"formGroup"],["for","categoryId"],["bindLabel","name","bindValue","id","formControlName","categoryId","placeholder","Selecicone una categor\xeda",3,"items","readonly"],["class","error-messages",4,"ngIf"],["for","name"],["type","text","readonly","","placeholder","Escriba el nombre del producto","formControlName","name",1,"form-control",3,"keyup.enter"],["for","stock"],["type","text","readonly","","placeholder","Stock disponible del producto","formControlName","stock",1,"form-control",3,"keyup.enter"],[1,"d-flex","h-100","align-items-center","justify-content-between"],["for","activeOffer",1,"m-0"],[1,"switch"],["type","checkbox","formControlName","activeOffer",3,"change"],[1,"slider","round"],["class","form-group",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-secondary",3,"click"],[1,"btn","btn-primary","ml-2",3,"disabled","click"],[4,"ngIf"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"],["for","offerPrice"],["type","text","placeholder","Precio de oeferta del producto","formControlName","offerPrice",1,"form-control",3,"keyup.enter"],[1,"zmdi","zmdi-spinner","zmdi-hc-spin"]],template:function(t,r){if(1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e._uU(3," Ofertas "),e.qZA(),e.qZA(),e.qZA(),e.YNc(4,C,2,2,"ng-container",3),e.YNc(5,O,3,0,"ng-template",null,4,e.W1O),e.YNc(7,A,3,0,"ng-template",null,5,e.W1O),e.YNc(9,Q,39,10,"ng-template",null,6,e.W1O)),2&t){const n=e.MAs(6);e.xp6(4),e.Q6J("ngIf",!r.loading.getting)("ngIfElse",n)}},directives:[d.O5,d.sg,c._Y,c.JL,c.sg,m.w9,c.JJ,c.u,c.Fj,c.Wl],styles:["@media (min-width: 0px){.card-columns[_ngcontent-%COMP%]{column-count:1}}@media (min-width: 574px){.card-columns[_ngcontent-%COMP%]{column-count:2}}@media (min-width: 768px){.card-columns[_ngcontent-%COMP%]{column-count:2}}@media (min-width: 992px){.card-columns[_ngcontent-%COMP%]{column-count:3}}@media (min-width: 1200px){.card-columns[_ngcontent-%COMP%]{column-count:4}}"]}),o})()}];let S=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.u5,d.ez,m.A0,c.UX,_.zk.forRoot(),Z.Bz.forChild(z)]]}),o})()},830:(T,p,s)=>{s.d(p,{o:()=>_});var d=s(7537);function Z(m){return e=>e.value&&m!=e.value?{matchstring:m}:null}var c=s(1514);let _=(()=>{class m{constructor(){this.emailRegex=/^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/,this.emailOrCodeRegex=/(^[0-9]{4}$)|(^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/}GetFormControlByName(a,f){return a.controls.hasOwnProperty(f)?a.get(f):null}ResetForm(a){a.reset()}ClearFormControls(a){for(const f in a.controls)Object.prototype.hasOwnProperty.call(a.controls,f)&&a.removeControl(f)}FormatControlName(a=""){return a.replace(/ /gi,"_").toUpperCase()}OnPasswordChange(a,f,h){const g=this.GetFormControlByName(a,f),u=this.GetFormControlByName(a,h);null!=g&&null!=u&&(u.setValidators([d.kI.required,Z(g.value)]),u.updateValueAndValidity({onlySelf:!0}))}}return m.\u0275fac=function(a){return new(a||m)},m.\u0275prov=c.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})()}}]);