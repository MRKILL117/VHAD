"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[35],{6035:(b,f,_)=>{_.r(f),_.d(f,{ProductsModule:()=>At});var p=_(6019),C=_(9845),c=_(7537),Z=_(1859),u=_(4611),t=_(1514),s=_(7754),d=_(3149),v=_(6588),h=_(830);function g(o,i){if(1&o&&t._UZ(0,"img",42),2&o){const e=t.oxw().$implicit,n=t.oxw(3);t.Q6J("src",n.http.apiBaseUrl+e.images[0].partialURL,t.LSH)("alt",e.images[0].name)}}function F(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",20),t.TgZ(1,"div",21),t.YNc(2,g,1,2,"img",22),t.qZA(),t.TgZ(3,"div",23),t.TgZ(4,"div",7),t.TgZ(5,"label",24),t._uU(6,"Clave del producto"),t.qZA(),t.TgZ(7,"div",25),t._uU(8),t.qZA(),t.qZA(),t.TgZ(9,"div",7),t.TgZ(10,"label",26),t._uU(11,"Categor\xeda"),t.qZA(),t.TgZ(12,"div",25),t._uU(13),t.qZA(),t.qZA(),t.TgZ(14,"div",7),t.TgZ(15,"label",27),t._uU(16,"Nombre"),t.qZA(),t.TgZ(17,"div",25),t._uU(18),t.qZA(),t.qZA(),t.TgZ(19,"div",7),t.TgZ(20,"label",28),t._uU(21,"Precio"),t.qZA(),t.TgZ(22,"div",25),t._uU(23),t.qZA(),t.qZA(),t.TgZ(24,"div",7),t.TgZ(25,"label",29),t._uU(26,"Stock disponible"),t.qZA(),t.TgZ(27,"div",25),t._uU(28),t.qZA(),t.qZA(),t.TgZ(29,"div",7),t.TgZ(30,"label",30),t._uU(31,"Descripci\xf3n"),t.qZA(),t.TgZ(32,"div",25),t._uU(33),t.qZA(),t.qZA(),t.qZA(),t.TgZ(34,"div",31),t.TgZ(35,"div",7),t.TgZ(36,"div",32),t.TgZ(37,"label",33),t._uU(38,"Visible"),t.qZA(),t.TgZ(39,"div"),t.TgZ(40,"label",34),t.TgZ(41,"input",35),t.NdJ("change",function(r){const a=t.CHM(e).$implicit;return t.oxw(3).ToggleVisibility(a,r)}),t.qZA(),t._UZ(42,"span",36),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(43,"div",7),t.TgZ(44,"div",37),t.TgZ(45,"button",38),t.NdJ("click",function(){const l=t.CHM(e).$implicit,a=t.oxw(3),m=t.MAs(23);return a.PrepareProductFormToEdit(l),a.OpenModal(m)}),t._UZ(46,"i",39),t.qZA(),t.TgZ(47,"button",40),t.NdJ("click",function(){const l=t.CHM(e).$implicit,a=t.oxw(3),m=t.MAs(25);return a.selectedProduct=l,a.OpenModal(m)}),t._UZ(48,"i",41),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=i.$implicit;t.xp6(2),t.Q6J("ngIf",null==e||null==e.images?null:e.images.length),t.xp6(6),t.hij(" ",e.key," "),t.xp6(5),t.hij(" ",null==e.category?null:e.category.name," "),t.xp6(5),t.hij(" ",e.name," "),t.xp6(5),t.hij(" ",e.price," "),t.xp6(5),t.hij(" ",e.stock," "),t.xp6(5),t.hij(" ",e.description," "),t.xp6(8),t.Q6J("checked",e.isVisible)}}function P(o,i){if(1&o&&(t.ynx(0),t.TgZ(1,"div",18),t.YNc(2,F,49,8,"div",19),t.qZA(),t.BQk()),2&o){const e=t.oxw(2);t.xp6(2),t.Q6J("ngForOf",e.products)}}function A(o,i){if(1&o&&(t.ynx(0),t.YNc(1,P,3,1,"ng-container",13),t.BQk()),2&o){const e=t.oxw(),n=t.MAs(21);t.xp6(1),t.Q6J("ngIf",e.products.length)("ngIfElse",n)}}function N(o,i){1&o&&(t.TgZ(0,"div",5),t.TgZ(1,"div",43),t._UZ(2,"i",44),t.qZA(),t.qZA())}function q(o,i){1&o&&(t.TgZ(0,"span"),t._uU(1,"Sin productos registrados"),t.qZA())}function y(o,i){1&o&&(t.TgZ(0,"span"),t._uU(1,"No se encontraron coincidencias"),t.qZA())}function I(o,i){if(1&o&&(t.TgZ(0,"div",45),t.YNc(1,q,2,0,"span",46),t.YNc(2,y,2,0,"span",46),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",!e.txtToFilter&&!e.categoryToFilter),t.xp6(1),t.Q6J("ngIf",e.txtToFilter||e.categoryToFilter)}}function k(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Escriba el nombre del producto "),t.qZA())}function U(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," M\xednimo 6 caracteres "),t.qZA())}function w(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," M\xe1ximo 20 caracteres "),t.qZA())}function J(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,k,2,0,"span",73),t.YNc(2,U,2,0,"span",73),t.YNc(3,w,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(2);let n,r,l;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"name"))||null==n.errors?null:n.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.form.GetFormControlByName(e.productForm,"name"))||null==r.errors?null:r.errors.minlength),t.xp6(1),t.Q6J("ngIf",null==(l=e.form.GetFormControlByName(e.productForm,"name"))||null==l.errors?null:l.errors.maxlength)}}function E(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Escriba la descripci\xf3n del producto "),t.qZA())}function O(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," M\xednimo 6 caracteres "),t.qZA())}function Q(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," M\xe1ximo 150 caracteres "),t.qZA())}function G(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,E,2,0,"span",73),t.YNc(2,O,2,0,"span",73),t.YNc(3,Q,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(2);let n,r,l;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"description"))||null==n.errors?null:n.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.form.GetFormControlByName(e.productForm,"description"))||null==r.errors?null:r.errors.minlength),t.xp6(1),t.Q6J("ngIf",null==(l=e.form.GetFormControlByName(e.productForm,"description"))||null==l.errors?null:l.errors.maxlength)}}function M(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Escriba el precio del producto "),t.qZA())}function Y(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Precio inv\xe1lido Ej. 10.25 "),t.qZA())}function B(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,M,2,0,"span",73),t.YNc(2,Y,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(2);let n,r;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"price"))||null==n.errors?null:n.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.form.GetFormControlByName(e.productForm,"price"))||null==r.errors?null:r.errors.pattern)}}function S(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Escriba el stock disponible del producto "),t.qZA())}function V(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Stock inv\xe1lido "),t.qZA())}function z(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," M\xe1ximo 6 caracteres "),t.qZA())}function D(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,S,2,0,"span",73),t.YNc(2,V,2,0,"span",73),t.YNc(3,z,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(2);let n,r,l;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"stock"))||null==n.errors?null:n.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.form.GetFormControlByName(e.productForm,"stock"))||null==r.errors?null:r.errors.pattern),t.xp6(1),t.Q6J("ngIf",null==(l=e.form.GetFormControlByName(e.productForm,"stock"))||null==l.errors?null:l.errors.maxlength)}}function $(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Seleccione una categor\xeda "),t.qZA())}function j(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,$,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(2);let n;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"category"))||null==n.errors?null:n.errors.required)}}function H(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Seleccione una subcategor\xeda "),t.qZA())}function L(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,H,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(3);let n;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"subcategory"))||null==n.errors?null:n.errors.required)}}function R(o,i){if(1&o&&(t.TgZ(0,"div",7),t.TgZ(1,"label",75),t._uU(2,"Subcategor\xeda"),t.qZA(),t._UZ(3,"ng-select",76),t.YNc(4,L,2,1,"div",55),t.qZA()),2&o){const e=t.oxw(2);let n;t.xp6(3),t.Q6J("items",e.form.GetFormControlByName(e.productForm,"category").value.subcategories),t.xp6(1),t.Q6J("ngIf",(null==(n=e.form.GetFormControlByName(e.productForm,"subcategory"))?null:n.touched)&&(null==(n=e.form.GetFormControlByName(e.productForm,"subcategory"))?null:n.errors))}}function W(o,i){if(1&o&&(t.TgZ(0,"label",82),t._uU(1),t.qZA()),2&o){const e=t.oxw(2).$implicit,n=t.oxw(3);t.s9C("for",n.GenerateFormName(e)),t.xp6(1),t.Oqu(e.formName)}}function X(o,i){if(1&o&&(t.TgZ(0,"div",32),t.TgZ(1,"label",83),t._uU(2),t.qZA(),t.TgZ(3,"div"),t.TgZ(4,"label",34),t._UZ(5,"input",84),t._UZ(6,"span",36),t.qZA(),t.qZA(),t.qZA()),2&o){const e=t.oxw(2).$implicit,n=t.oxw(3);t.xp6(1),t.s9C("for",n.GenerateFormName(e)),t.xp6(1),t.Oqu(e.formName),t.xp6(3),t.s9C("formControlName",n.GenerateFormName(e))}}function K(o,i){if(1&o&&t._UZ(0,"ng-select",85),2&o){const e=t.oxw(2).$implicit,n=t.oxw(3);t.s9C("formControlName",n.GenerateFormName(e)),t.s9C("placeholder",e.formName),t.Q6J("items",e.options)}}function tt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"input",86),t.NdJ("keyup.enter",function(){t.CHM(e);const r=t.oxw(5);return r.isEditing?r.UpdateProduct():r.CreateProduct()}),t.qZA()}if(2&o){const e=t.oxw(2).$implicit,n=t.oxw(3);t.s9C("formControlName",n.GenerateFormName(e)),t.Q6J("placeholder",e.formName)}}function et(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Este campo es obligatorio "),t.qZA())}function ot(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Valor inv\xe1lido "),t.qZA())}function nt(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,et,2,0,"span",73),t.YNc(2,ot,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(2).$implicit,n=t.oxw(3);let r,l;t.xp6(1),t.Q6J("ngIf",null==(r=n.form.GetFormControlByName(n.productFilterForm,n.GenerateFormName(e)))||null==r.errors?null:r.errors.required),t.xp6(1),t.Q6J("ngIf",null==(l=n.form.GetFormControlByName(n.productFilterForm,n.GenerateFormName(e)))||null==l.errors?null:l.errors.pattern)}}function rt(o,i){if(1&o&&(t.ynx(0),t.YNc(1,W,2,2,"label",78),t.YNc(2,X,7,3,"div",79),t.YNc(3,K,1,3,"ng-select",80),t.YNc(4,tt,1,2,"input",81),t.YNc(5,nt,3,2,"div",55),t.BQk()),2&o){const e=t.oxw().$implicit,n=t.oxw(3);let r;t.xp6(1),t.Q6J("ngIf","boolean"!=e.type),t.xp6(1),t.Q6J("ngIf","boolean"==e.type),t.xp6(1),t.Q6J("ngIf","options"==e.type),t.xp6(1),t.Q6J("ngIf","string"==e.type||"number"==e.type||"decimal"==e.type),t.xp6(1),t.Q6J("ngIf",(null==(r=n.form.GetFormControlByName(n.productFilterForm,n.GenerateFormName(e)))?null:r.touched)&&(null==(r=n.form.GetFormControlByName(n.productFilterForm,n.GenerateFormName(e)))?null:r.errors))}}function it(o,i){if(1&o&&(t.TgZ(0,"div",7),t.YNc(1,rt,6,5,"ng-container",46),t.qZA()),2&o){const e=i.$implicit,n=t.oxw(3);t.xp6(1),t.Q6J("ngIf",n.form.GetFormControlByName(n.productFilterForm,n.GenerateFormName(e)))}}function lt(o,i){if(1&o&&(t.ynx(0),t.TgZ(1,"form",52),t.YNc(2,it,2,1,"div",77),t.qZA(),t.BQk()),2&o){const e=t.oxw(2);t.xp6(1),t.Q6J("formGroup",e.productFilterForm),t.xp6(1),t.Q6J("ngForOf",e.form.GetFormControlByName(e.productForm,"category").value.filters)}}function ct(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Escriba el precio de oferta del producto "),t.qZA())}function at(o,i){1&o&&(t.TgZ(0,"span",74),t._uU(1," Precio inv\xe1lido Ej. 10.25 "),t.qZA())}function st(o,i){if(1&o&&(t.TgZ(0,"div",72),t.YNc(1,ct,2,0,"span",73),t.YNc(2,at,2,0,"span",73),t.qZA()),2&o){const e=t.oxw(3);let n,r;t.xp6(1),t.Q6J("ngIf",null==(n=e.form.GetFormControlByName(e.productForm,"offerPrice"))||null==n.errors?null:n.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.form.GetFormControlByName(e.productForm,"offerPrice"))||null==r.errors?null:r.errors.pattern)}}function _t(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",7),t.TgZ(1,"label",87),t._uU(2,"Precio de oferta"),t.qZA(),t.TgZ(3,"input",88),t.NdJ("keyup.enter",function(){t.CHM(e);const r=t.oxw(2);return r.isEditing?r.UpdateProduct():r.CreateProduct()}),t.qZA(),t.YNc(4,st,3,2,"div",55),t.qZA()}if(2&o){const e=t.oxw(2);let n;t.xp6(4),t.Q6J("ngIf",(null==(n=e.form.GetFormControlByName(e.productForm,"offerPrice"))?null:n.touched)&&(null==(n=e.form.GetFormControlByName(e.productForm,"offerPrice"))?null:n.errors))}}function ut(o,i){if(1&o&&(t.TgZ(0,"div",5),t.TgZ(1,"div",95),t._uU(2),t.qZA(),t.TgZ(3,"div",96),t._UZ(4,"i",97),t.qZA(),t.qZA()),2&o){const e=i.$implicit;t.xp6(2),t.hij(" ",e.name," ")}}function dt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",7),t.TgZ(1,"label",89),t._uU(2,"Imagenes"),t.qZA(),t.YNc(3,ut,5,1,"div",90),t.TgZ(4,"div",91),t.NdJ("click",function(){return t.CHM(e),t.MAs(9).click()}),t.TgZ(5,"span"),t._UZ(6,"i",92),t._uU(7," Seleccionar"),t.qZA(),t.qZA(),t.TgZ(8,"input",93,94),t.NdJ("change",function(r){t.CHM(e);const l=t.oxw(2);return l.productImages=l.file.OnFileChange(r)}),t.qZA(),t.qZA()}if(2&o){const e=t.oxw(2);t.xp6(3),t.Q6J("ngForOf",e.productImages)}}function mt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",99),t.TgZ(1,"div",100),t._UZ(2,"img",101),t.TgZ(3,"i",102),t.NdJ("click",function(){const l=t.CHM(e).$implicit;return t.oxw(4).DeleteImage(l)}),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=i.$implicit,n=t.oxw(4);t.xp6(2),t.Q6J("src",n.http.apiBaseUrl+e.partialURL,t.LSH)("alt",e.name)}}function pt(o,i){if(1&o&&(t.ynx(0),t.YNc(1,mt,4,2,"div",98),t.BQk()),2&o){const e=t.oxw(3);t.xp6(1),t.Q6J("ngForOf",e.selectedProduct.images)}}function gt(o,i){if(1&o&&(t.TgZ(0,"div",5),t.TgZ(1,"div",95),t._uU(2),t.qZA(),t.TgZ(3,"div",96),t._UZ(4,"i",97),t.qZA(),t.qZA()),2&o){const e=i.$implicit;t.xp6(2),t.hij(" ",e.name," ")}}function ft(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",7),t.TgZ(1,"label",89),t._uU(2,"Imagenes"),t.qZA(),t.YNc(3,pt,2,1,"ng-container",46),t.YNc(4,gt,5,1,"div",90),t.TgZ(5,"div",91),t.NdJ("click",function(){return t.CHM(e),t.MAs(10).click()}),t.TgZ(6,"span"),t._UZ(7,"i",92),t._uU(8," Seleccionar"),t.qZA(),t.qZA(),t.TgZ(9,"input",93,94),t.NdJ("change",function(r){t.CHM(e);const l=t.oxw(2);return l.productImages=l.file.OnFileChange(r)}),t.qZA(),t.qZA()}if(2&o){const e=t.oxw(2);t.xp6(3),t.Q6J("ngIf",e.selectedProduct),t.xp6(1),t.Q6J("ngForOf",e.productImages)}}function Zt(o,i){1&o&&(t.TgZ(0,"span"),t._uU(1,"Crear"),t.qZA())}function ht(o,i){1&o&&(t.TgZ(0,"span"),t._UZ(1,"i",104),t.qZA())}function xt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"button",103),t.NdJ("click",function(){return t.CHM(e),t.oxw(2).CreateProduct()}),t.YNc(1,Zt,2,0,"span",46),t.YNc(2,ht,2,0,"span",46),t.qZA()}if(2&o){const e=t.oxw(2);t.Q6J("disabled",e.loading.creatingOrUpdating),t.xp6(1),t.Q6J("ngIf",!e.loading.creatingOrUpdating),t.xp6(1),t.Q6J("ngIf",e.loading.creatingOrUpdating)}}function Tt(o,i){1&o&&(t.TgZ(0,"span"),t._uU(1,"Actualizar"),t.qZA())}function Ct(o,i){1&o&&(t.TgZ(0,"span"),t._UZ(1,"i",104),t.qZA())}function vt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"button",103),t.NdJ("click",function(){return t.CHM(e),t.oxw(2).UpdateProduct()}),t.YNc(1,Tt,2,0,"span",46),t.YNc(2,Ct,2,0,"span",46),t.qZA()}if(2&o){const e=t.oxw(2);t.Q6J("disabled",e.loading.creatingOrUpdating),t.xp6(1),t.Q6J("ngIf",!e.loading.creatingOrUpdating),t.xp6(1),t.Q6J("ngIf",e.loading.creatingOrUpdating)}}function Ft(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",47),t.TgZ(1,"div",48),t.TgZ(2,"h3",49),t._uU(3),t.qZA(),t.TgZ(4,"button",50),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return r.CloseModal(),r.ResetForm()}),t.TgZ(5,"span"),t._uU(6,"\xd7"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"div",51),t.TgZ(8,"form",52),t.TgZ(9,"div",7),t.TgZ(10,"label",53),t._uU(11,"Nombre"),t.qZA(),t.TgZ(12,"input",54),t.NdJ("keyup.enter",function(){t.CHM(e);const r=t.oxw();return r.isEditing?r.UpdateProduct():r.CreateProduct()}),t.qZA(),t.YNc(13,J,4,3,"div",55),t.qZA(),t.TgZ(14,"div",7),t.TgZ(15,"label",56),t._uU(16,"Descripci\xf3n"),t.qZA(),t._UZ(17,"textarea",57),t.YNc(18,G,4,3,"div",55),t.qZA(),t.TgZ(19,"div",7),t.TgZ(20,"label",58),t._uU(21,"Precio"),t.qZA(),t.TgZ(22,"input",59),t.NdJ("keyup.enter",function(){t.CHM(e);const r=t.oxw();return r.isEditing?r.UpdateProduct():r.CreateProduct()}),t.qZA(),t.YNc(23,B,3,2,"div",55),t.qZA(),t.TgZ(24,"div",7),t.TgZ(25,"label",60),t._uU(26,"Stock disponible"),t.qZA(),t.TgZ(27,"input",61),t.NdJ("keyup.enter",function(){t.CHM(e);const r=t.oxw();return r.isEditing?r.UpdateProduct():r.CreateProduct()}),t.qZA(),t.YNc(28,D,4,3,"div",55),t.qZA(),t.TgZ(29,"div",7),t.TgZ(30,"label",62),t._uU(31,"Categor\xeda"),t.qZA(),t.TgZ(32,"ng-select",63),t.NdJ("change",function(r){return t.CHM(e),t.oxw().OnCategoryChange(r)}),t.qZA(),t.YNc(33,j,2,1,"div",55),t.qZA(),t.YNc(34,R,5,2,"div",64),t.YNc(35,lt,3,2,"ng-container",46),t.TgZ(36,"div",7),t.TgZ(37,"div",32),t.TgZ(38,"label",65),t._uU(39,"Visible"),t.qZA(),t.TgZ(40,"div"),t.TgZ(41,"label",34),t._UZ(42,"input",66),t._UZ(43,"span",36),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(44,"div",7),t.TgZ(45,"div",32),t.TgZ(46,"label",67),t._uU(47,"En oferta"),t.qZA(),t.TgZ(48,"div"),t.TgZ(49,"label",34),t.TgZ(50,"input",68),t.NdJ("change",function(r){return t.CHM(e),t.oxw().OnActiveOfferChange(r)}),t.qZA(),t._UZ(51,"span",36),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(52,_t,5,1,"div",64),t.YNc(53,dt,10,1,"div",64),t.YNc(54,ft,11,2,"div",64),t.qZA(),t.qZA(),t.TgZ(55,"div",69),t.TgZ(56,"button",70),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return r.CloseModal(),r.ResetForm()}),t._uU(57," Cancelar "),t.qZA(),t.YNc(58,xt,3,3,"button",71),t.YNc(59,vt,3,3,"button",71),t.qZA(),t.qZA()}if(2&o){const e=t.oxw();let n,r,l,a,m,x,T;t.xp6(3),t.Oqu(e.isEditing?"Editar producto":"Crear producto"),t.xp6(5),t.Q6J("formGroup",e.productForm),t.xp6(5),t.Q6J("ngIf",(null==(n=e.form.GetFormControlByName(e.productForm,"name"))?null:n.touched)&&(null==(n=e.form.GetFormControlByName(e.productForm,"name"))?null:n.errors)),t.xp6(5),t.Q6J("ngIf",(null==(r=e.form.GetFormControlByName(e.productForm,"description"))?null:r.touched)&&(null==(r=e.form.GetFormControlByName(e.productForm,"description"))?null:r.errors)),t.xp6(5),t.Q6J("ngIf",(null==(l=e.form.GetFormControlByName(e.productForm,"price"))?null:l.touched)&&(null==(l=e.form.GetFormControlByName(e.productForm,"price"))?null:l.errors)),t.xp6(5),t.Q6J("ngIf",(null==(a=e.form.GetFormControlByName(e.productForm,"stock"))?null:a.touched)&&(null==(a=e.form.GetFormControlByName(e.productForm,"stock"))?null:a.errors)),t.xp6(4),t.Q6J("items",e.categories),t.xp6(1),t.Q6J("ngIf",(null==(m=e.form.GetFormControlByName(e.productForm,"category"))?null:m.touched)&&(null==(m=e.form.GetFormControlByName(e.productForm,"category"))?null:m.errors)),t.xp6(1),t.Q6J("ngIf",null==(x=e.form.GetFormControlByName(e.productForm,"category"))||null==x.value||null==x.value.subcategories?null:x.value.subcategories.length),t.xp6(1),t.Q6J("ngIf",null==(T=e.form.GetFormControlByName(e.productForm,"category"))||null==T.value||null==T.value.filters?null:T.value.filters.length),t.xp6(17),t.Q6J("ngIf",e.form.GetFormControlByName(e.productForm,"activeOffer").value),t.xp6(1),t.Q6J("ngIf",!e.isEditing),t.xp6(1),t.Q6J("ngIf",e.isEditing),t.xp6(4),t.Q6J("ngIf",!e.isEditing),t.xp6(1),t.Q6J("ngIf",e.isEditing)}}function bt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",47),t.TgZ(1,"div",48),t.TgZ(2,"h3",105),t._uU(3,"Eliminar producto"),t.qZA(),t.TgZ(4,"button",50),t.NdJ("click",function(){return t.CHM(e),t.oxw().CloseModal()}),t.TgZ(5,"span"),t._uU(6,"\xd7"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"div",51),t._uU(8),t.qZA(),t.TgZ(9,"div",69),t.TgZ(10,"button",70),t.NdJ("click",function(){return t.CHM(e),t.oxw().CloseModal()}),t._uU(11," No, cancelar "),t.qZA(),t.TgZ(12,"button",106),t.NdJ("click",function(){return t.CHM(e),t.oxw().DeleteProduct()}),t._uU(13," Si, eliminar "),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=t.oxw();t.xp6(8),t.hij(' \xbfEst\xe1 seguro que desea eliminar el producto "',null==e.selectedProduct?null:e.selectedProduct.name,'"? ')}}const Pt=[{path:"",component:(()=>{class o{constructor(e,n,r,l,a){this.modalService=e,this.http=n,this.file=r,this.toast=l,this.form=a,this.timer=null,this.isEditing=!1,this.selectedProduct=null,this.deletedImages=[],this.products=[],this.categories=[],this.txtToFilter="",this.categoryToFilter=null,this.loading={creatingOrUpdating:!1,getting:!1,deleting:!1},this.productImages=[],this.productForm=new c.cw({name:new c.NI("",[c.kI.required,c.kI.minLength(6),c.kI.maxLength(20)]),price:new c.NI("",[c.kI.required,c.kI.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]),stock:new c.NI("",[c.kI.required,c.kI.pattern(/^[0-9]{1,}$/),c.kI.maxLength(6)]),description:new c.NI("",[c.kI.required,c.kI.minLength(6),c.kI.maxLength(150)]),category:new c.NI(null,[c.kI.required]),subcategory:new c.NI(null,[]),activeOffer:new c.NI(!1,[]),offerPrice:new c.NI(null,[]),isVisible:new c.NI(!1,[c.kI.required])}),this.productFilterForm=new c.cw({})}ngOnInit(){this.GetCategories(),this.GetProducts()}OpenModal(e){this.modalRef=this.modalService.show(e,{backdrop:"static",keyboard:!1})}CloseModal(){this.modalRef&&this.modalRef.hide()}SetTrigger(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.GetProducts()},300)}PrepareProductFormToEdit(e){this.selectedProduct=Object.assign({},e),this.selectedProduct.images.length&&(this.selectedProduct.images=Array.from(this.selectedProduct.images));const n=this.categories.find(r=>r.id==e.categoryId);this.isEditing=!0,this.productForm.controls.name.setValue(e.name),this.productForm.controls.description.setValue(e.description),this.productForm.controls.price.setValue(e.price),this.productForm.controls.stock.setValue(e.stock),this.productForm.controls.isVisible.setValue(e.isVisible),this.productForm.controls.category.setValue(n),this.OnCategoryChange(n),this.productForm.controls.subcategory.setValue(e.subcategory),this.productForm.controls.activeOffer.setValue(e.activeOffer),this.OnActiveOfferChange(e.activeOffer),this.productForm.controls.offerPrice.setValue(e.offerPrice)}OnActiveOfferChange(e){let n;n="boolean"==typeof e?e:e.target.checked,this.productForm.controls.offerPrice.setValidators(n?[c.kI.required,c.kI.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/)]:[]),this.productForm.controls.offerPrice.updateValueAndValidity({onlySelf:!0})}OnCategoryChange(e){this.productForm.controls.subcategory.setValidators(e&&e.subcategories.length?[c.kI.required]:[]),this.productForm.controls.subcategory.updateValueAndValidity({onlySelf:!0}),this.SetProductFilterForm(e)}GetProductFilterValue(e){if(!this.selectedProduct)return null;const n=this.selectedProduct.filters.find(r=>r.categoryFilterId==e.categoryFilterId);return n?n.value:null}SetProductFilterForm(e){this.form.ClearFormControls(this.productFilterForm),e&&e.filters&&e.filters.length&&(e.filters.forEach(n=>{let r=[c.kI.required],l=null;switch(n.type){case"number":r.push(c.kI.pattern(/^[0-9]{1,}$/));break;case"decimal":r.push(c.kI.pattern(/^[0-9]{1,}(.[0-9]{1,2})?$/));break;case"boolean":l=!1}this.isEditing&&(l=this.GetProductFilterValue(n)),this.productFilterForm.addControl(this.GenerateFormName(n),new c.NI(l,r))}),this.productFilterForm.updateValueAndValidity({onlySelf:!1}))}GenerateFormName(e){return`${e.categoryFilterId}~${e.formName}`}GetCategories(){this.http.Get("/Categories").subscribe(e=>{this.categories=e},e=>{console.error("Error al obtener las categorias",e)})}GetProducts(){let e="/Products";(this.txtToFilter||this.categoryToFilter)&&(e=e.concat(`/ThatIncludes/${this.txtToFilter?this.txtToFilter:"*"}/AndCategories/${JSON.stringify(this.categoryToFilter?[this.categoryToFilter]:[])}`)),this.loading.getting=!0,this.http.Get(e).subscribe(n=>{this.products=n,this.loading.getting=!1},n=>{console.error("Error al obtener los productos",n),this.loading.getting=!1})}CreateProduct(){if(!this.productForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario","Formulario incompleto"),this.productForm.markAllAsTouched(),void this.productFilterForm.markAllAsTouched();this.loading.creatingOrUpdating=!0,this.file.UploadFiles(this.productImages,"product-images").then(e=>{let n=Object.assign(Object.assign({},this.productForm.value),{images:e,filters:Object.assign({},this.productFilterForm.value)});this.http.Post("Products",{product:n}).subscribe(r=>{this.CloseModal(),this.toast.ShowDefaultSuccess("Producto creado correctamente"),this.GetProducts(),this.ResetForm(),this.loading.creatingOrUpdating=!1},r=>{this.toast.ShowDefaultDanger("Error al crear producto"),console.error("Error al crear producto",r),this.loading.creatingOrUpdating=!1})},e=>{this.toast.ShowDefaultDanger("Error al subir imagenes",e)})}UpdateProduct(){if(!this.productForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario","Formulario incompleto"),void this.productForm.markAllAsTouched();this.loading.creatingOrUpdating=!0,this.file.UploadFiles(this.productImages,"product-images").then(e=>{let n=Object.assign(Object.assign({},this.productForm.value),{images:e,deletedImages:this.deletedImages,filters:Object.assign({},this.productFilterForm.value)});this.http.Patch(`Products/${this.selectedProduct?this.selectedProduct.id:0}`,{product:n}).subscribe(r=>{this.CloseModal(),this.toast.ShowDefaultSuccess("Producto actualizado correctamente"),this.GetProducts(),this.ResetForm(),this.loading.creatingOrUpdating=!1},r=>{this.toast.ShowDefaultDanger("Error al actualizar el producto"),console.error("Error al actualizar producto",r),this.loading.creatingOrUpdating=!1})},e=>{this.toast.ShowDefaultDanger("Error al subir imagenes",e)})}DeleteProduct(){this.loading.deleting=!0,this.http.Delete(`Products/${this.selectedProduct?this.selectedProduct.id:0}`).subscribe(e=>{this.CloseModal(),this.GetProducts(),this.ResetForm(),this.toast.ShowDefaultSuccess("Producto eliminado correctamente"),this.loading.deleting=!1},e=>{console.error("Error al elimnar el producto",e),this.toast.ShowDefaultDanger("Error al eliminar producto"),this.loading.deleting=!1})}DeleteImage(e){const n=this.selectedProduct.images.findIndex(r=>r.id==e.id);-1!=n&&(this.selectedProduct.images.splice(n,1),this.deletedImages.push(e))}ToggleVisibility(e,n){if(!n||!n.target)return;const r=n.target.checked;e.isVisible=r,this.http.Patch(`/Products/${e?e.id:0}/ChangeVisibility`,{isVisible:r}).subscribe(l=>{},l=>{console.error("Error al cambiar visibilidad",l),this.toast.ShowDefaultDanger("Error al cambiar visibilidad")})}ResetForm(){this.form.ClearFormControls(this.productFilterForm),this.form.ResetForm(this.productForm),this.productForm.controls.activeOffer.setValue(!1),this.selectedProduct=null,this.productImages=[],this.deletedImages=[],this.isEditing=!1}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(Z.tT),t.Y36(s.O),t.Y36(d.I),t.Y36(v.k),t.Y36(h.o))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-products"]],decls:26,vars:5,consts:[[1,"row","mt-3","mb-4"],[1,"col-12","view-title","d-flex","justify-content-between","align-items-center"],[1,"d-inline-block"],[1,"btn","btn-primary","px-3","py-2",3,"click"],[1,"zmdi","zmdi-plus-circle-o","mr-1"],[1,"row"],[1,"col-12","col-sm-6","col-md-7","col-lg-8","col-xl-9"],[1,"form-group"],[1,"input-container"],[1,"input-icon","zmdi","zmdi-search"],["type","text","placeholder","Buscar productos",1,"form-control",3,"ngModel","ngModelChange","input"],[1,"col-12","col-sm-6","col-md-5","col-lg-4","col-xl-3"],["bindLabel","name","bindValue","id","placeholder","Filrar por categor\xeda",3,"items","ngModel","ngModelChange","change"],[4,"ngIf","ngIfElse"],["bigLoading",""],["noProducts",""],["createOrEditProductModal",""],["deleteProductModal",""],[1,"card-columns","px-3"],["class","card pt-0 px-0",4,"ngFor","ngForOf"],[1,"card","pt-0","px-0"],[1,"card-header","p-0","mb-2"],["class","card-image-header",3,"src","alt",4,"ngIf"],[1,"card-body","pb-0"],["for","key",1,"card-info-label"],[1,"card-info"],["for","category",1,"card-info-label"],["for","name",1,"card-info-label"],["for","price",1,"card-info-label"],["for","stock",1,"card-info-label"],["for","description",1,"card-info-label"],[1,"card-footer","pt-0"],[1,"d-flex","h-100","align-items-center","justify-content-between"],["for","isVisible",1,"card-info-label"],[1,"switch"],["type","checkbox",3,"checked","change"],[1,"slider","round"],[1,"d-flex","justify-content-between","mt-2"],[1,"btn","btn-info",2,"padding","5px 20%",3,"click"],[1,"zmdi","zmdi-edit"],[1,"btn","btn-danger",2,"padding","5px 20%",3,"click"],[1,"zmdi","zmdi-delete"],[1,"card-image-header",3,"src","alt"],[1,"col-12","col-flex-center"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"w-100","text-center",2,"font-size","1.5rem","font-weight","bold"],[4,"ngIf"],[1,"modal-content"],[1,"modal-header"],[1,"modaltitle"],[1,"close",3,"click"],[1,"modal-body"],[3,"formGroup"],["for","name"],["type","text","placeholder","Escriba el nombre del producto","formControlName","name",1,"form-control",3,"keyup.enter"],["class","error-messages",4,"ngIf"],["for","description"],["rows","5","placeholder","Descripci\xf3n del producto","formControlName","description",1,"form-control"],["for","price"],["type","text","placeholder","Precio del producto","formControlName","price",1,"form-control",3,"keyup.enter"],["for","stock"],["type","text","placeholder","Stock disponible del producto","formControlName","stock",1,"form-control",3,"keyup.enter"],["for","category"],["bindLabel","name","formControlName","category","placeholder","Selecicone una categor\xeda",3,"items","change"],["class","form-group",4,"ngIf"],["for","isVisible",1,"m-0"],["type","checkbox","formControlName","isVisible"],["for","activeOffer",1,"m-0"],["type","checkbox","formControlName","activeOffer",3,"change"],[1,"modal-footer"],[1,"btn","btn-secondary",3,"click"],["class","btn btn-primary ml-2",3,"disabled","click",4,"ngIf"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"],["for","subcategory"],["bindLabel","name","formControlName","subcategory","placeholder","Selecicone una categor\xeda",3,"items"],["class","form-group",4,"ngFor","ngForOf"],[3,"for",4,"ngIf"],["class","d-flex h-100 align-items-center justify-content-between",4,"ngIf"],["bindLabel","name","bindValue","name",3,"items","formControlName","placeholder",4,"ngIf"],["class","form-control","type","text",3,"placeholder","formControlName","keyup.enter",4,"ngIf"],[3,"for"],[1,"m-0",3,"for"],["type","checkbox",3,"formControlName"],["bindLabel","name","bindValue","name",3,"items","formControlName","placeholder"],["type","text",1,"form-control",3,"placeholder","formControlName","keyup.enter"],["for","offerPrice"],["type","text","placeholder","Precio de oferta del producto","formControlName","offerPrice",1,"form-control",3,"keyup.enter"],["for","images"],["class","row",4,"ngFor","ngForOf"],[1,"btn","btn-block","btn-primary",3,"click"],[1,"zmdi","zmdi-plus-circle"],["type","file","multiple","","accept","image/*","placeholder","Imagenes del producto",1,"d-none",3,"change"],["productImageInput",""],[1,"col-8","col-md-10","px-0"],[1,"col-4","col-md-2","px-0","text-right"],[1,"zmdi","zmdi-close","zmdi-hc-lg","clickeable",2,"color","var(--danger)"],["class","row mb-3",4,"ngFor","ngForOf"],[1,"row","mb-3"],[1,"col-12","px-0"],[1,"product-image",3,"src","alt"],["title","Eliminar imagen",1,"zmdi","zmdi-close","zmdi-hc-2x","clickeable","img-top-right",3,"click"],[1,"btn","btn-primary","ml-2",3,"disabled","click"],[1,"zmdi","zmdi-spinner","zmdi-hc-spin"],[1,"modal-title"],[1,"btn","btn-danger",3,"click"]],template:function(e,n){if(1&e){const r=t.EpF();t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._uU(3," Productos "),t.qZA(),t.TgZ(4,"div",2),t.TgZ(5,"button",3),t.NdJ("click",function(){t.CHM(r);const a=t.MAs(23);return n.OpenModal(a)}),t._UZ(6,"i",4),t._uU(7," Nuevo "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(8,"div",5),t.TgZ(9,"div",6),t.TgZ(10,"div",7),t.TgZ(11,"div",8),t._UZ(12,"i",9),t.TgZ(13,"input",10),t.NdJ("ngModelChange",function(a){return n.txtToFilter=a})("input",function(){return n.SetTrigger()}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(14,"div",11),t.TgZ(15,"div",7),t.TgZ(16,"ng-select",12),t.NdJ("ngModelChange",function(a){return n.categoryToFilter=a})("change",function(){return n.SetTrigger()}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(17,A,2,2,"ng-container",13),t.YNc(18,N,3,0,"ng-template",null,14,t.W1O),t.YNc(20,I,3,2,"ng-template",null,15,t.W1O),t.YNc(22,Ft,60,15,"ng-template",null,16,t.W1O),t.YNc(24,bt,14,1,"ng-template",null,17,t.W1O)}if(2&e){const r=t.MAs(19);t.xp6(13),t.Q6J("ngModel",n.txtToFilter),t.xp6(3),t.Q6J("items",n.categories)("ngModel",n.categoryToFilter),t.xp6(1),t.Q6J("ngIf",!n.loading.getting)("ngIfElse",r)}},directives:[c.Fj,c.JJ,c.On,u.w9,p.O5,p.sg,c._Y,c.JL,c.sg,c.u,c.Wl],styles:[".product-image[_ngcontent-%COMP%]{width:100%;max-height:20vh;object-fit:cover;object-position:center}.img-top-right[_ngcontent-%COMP%]{color:var(--danger);position:absolute;top:5%;right:2%;background-color:#fff;padding:0 7px;border-radius:50%}@media (min-width: 0px){.card-columns[_ngcontent-%COMP%]{column-count:1}}@media (min-width: 574px){.card-columns[_ngcontent-%COMP%]{column-count:2}}@media (min-width: 768px){.card-columns[_ngcontent-%COMP%]{column-count:2}}@media (min-width: 992px){.card-columns[_ngcontent-%COMP%]{column-count:3}}@media (min-width: 1200px){.card-columns[_ngcontent-%COMP%]{column-count:4}}"]}),o})()}];let At=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[c.u5,p.ez,u.A0,c.UX,Z.zk.forRoot(),C.Bz.forChild(Pt)]]}),o})()},830:(b,f,_)=>{_.d(f,{o:()=>Z});var p=_(7537);function C(u){return t=>t.value&&u!=t.value?{matchstring:u}:null}var c=_(1514);let Z=(()=>{class u{constructor(){this.emailRegex=/^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/,this.emailOrCodeRegex=/(^[0-9]{4}$)|(^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/}GetFormControlByName(s,d){return s.controls.hasOwnProperty(d)?s.get(d):null}ResetForm(s){s.reset()}ClearFormControls(s){for(const d in s.controls)Object.prototype.hasOwnProperty.call(s.controls,d)&&s.removeControl(d)}FormatControlName(s=""){return s.replace(/ /gi,"_").toUpperCase()}OnPasswordChange(s,d,v){const h=this.GetFormControlByName(s,d),g=this.GetFormControlByName(s,v);null!=h&&null!=g&&(g.setValidators([p.kI.required,C(h.value)]),g.updateValueAndValidity({onlySelf:!0}))}}return u.\u0275fac=function(s){return new(s||u)},u.\u0275prov=c.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()}}]);