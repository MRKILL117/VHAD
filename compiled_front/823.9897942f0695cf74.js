"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[823],{4823:(z,u,e)=>{e.r(u),e.d(u,{ProductModule:()=>b});var d=e(6019),l=e(9845),p=e(7537),t=e(1514),s=e(7754),a=e(3149),g=e(754),m=e(6588),f=e(7477);function h(n,r){if(1&n&&t._UZ(0,"img",20),2&n){const o=t.oxw();t.Q6J("src",o.file.GenerateFileURL(null==o.product?null:o.product.images[0].partialURL),t.LSH)("alt",null==o.product?null:o.product.images[0].name)}}function v(n,r){1&n&&t._UZ(0,"img",21)}function Z(n,r){if(1&n&&(t.TgZ(0,"div",22),t.TgZ(1,"div",23),t._uU(2),t.ALo(3,"number"),t.qZA(),t.TgZ(4,"div"),t._uU(5),t.ALo(6,"number"),t.qZA(),t.qZA()),2&n){const o=t.oxw();t.xp6(2),t.hij(" $",t.xi3(3,2,null==o.product?null:o.product.price,"1.2-2")," "),t.xp6(3),t.hij(" $",t.xi3(6,5,null==o.product?null:o.product.offerPrice,"1.2-2")," ")}}function T(n,r){if(1&n&&(t.TgZ(0,"div",24),t.TgZ(1,"div"),t._uU(2),t.ALo(3,"number"),t.qZA(),t.qZA()),2&n){const o=t.oxw();t.xp6(2),t.hij(" $",t.xi3(3,1,null==o.product?null:o.product.price,"1.2-2")," ")}}function x(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div"),t.TgZ(1,"button",25),t.NdJ("click",function(){t.CHM(o);const c=t.oxw();return c.cart.AddProduct(c.product)}),t.TgZ(2,"span"),t._uU(3," A\xf1adir "),t.qZA(),t._UZ(4,"i",26),t.qZA(),t.qZA()}}function A(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div"),t.TgZ(1,"button",25),t.NdJ("click",function(){t.CHM(o);const c=t.oxw();return c.cart.RemoveProduct(c.product)}),t.TgZ(2,"span"),t._uU(3," Quitar "),t.qZA(),t._UZ(4,"i",26),t.qZA(),t.qZA()}}const P=[{path:"",component:(()=>{class n{constructor(o,i,c,C,y,_){this.http=o,this.file=i,this.router=c,this.toast=C,this.cart=y,this.activeRoute=_,this.productId=null,this.product=null,this.loading={getting:!1}}ngOnInit(){this.activeRoute.params.subscribe(o=>{this.productId=Number(o.productId),this.GetProduct()})}GetProduct(){this.loading.getting=!0,this.http.Get(`Products/${this.productId?this.productId:0}`).subscribe(o=>{this.product=o,console.log(o),this.loading.getting=!1},o=>{console.error("Error al obtener el producto",o),this.loading.getting=!1})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(s.O),t.Y36(a.I),t.Y36(g.c),t.Y36(m.k),t.Y36(f.N),t.Y36(l.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-product"]],decls:24,vars:9,consts:[[1,"row","mt-4"],[1,"col-12","d-flex","align-items-center",2,"height","50px"],[1,"mr-2","clickeable",3,"click"],[1,"zmdi","zmdi-arrow-back","zmdi-hc-2x"],[2,"font-size","2.5rem"],[1,"row","justify-content-center","my-5"],[1,"col-12","col-sm-10"],[1,"card","pt-0","px-0"],[1,"card-header","p-0","mb-2"],["class","card-image",3,"src","alt",4,"ngIf"],["style","position: absolute; top: 4%; right: 4%; height: 9vh; min-height: 60px;","src","assets/icons/offer-icon.png",4,"ngIf"],[1,"card-body","py-0"],[1,"product-description","position-relative",2,"font-size","1rem"],[1,"product-description-gradient"],[1,"text-right","product-category"],[1,"card-footer","py-0","text-right"],[1,"d-flex","justify-content-between","h-100","align-items-end"],["style","font-size: 1.6rem; font-weight: bold; color: black;",4,"ngIf"],["style","font-size: 1.6rem; font-weight: bold; color: black; margin-top: 1.8rem;",4,"ngIf"],[4,"ngIf"],[1,"card-image",3,"src","alt"],["src","assets/icons/offer-icon.png",2,"position","absolute","top","4%","right","4%","height","9vh","min-height","60px"],[2,"font-size","1.6rem","font-weight","bold","color","black"],[1,"text-left",2,"font-size","1.2rem","text-decoration","line-through","color","#888"],[2,"font-size","1.6rem","font-weight","bold","color","black","margin-top","1.8rem"],[1,"btn","btn-warning",3,"click"],[1,"zmdi","zmdi-shopping-cart","ml-1"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.NdJ("click",function(){return i.router.GoToRoute("inicio")}),t._UZ(3,"i",3),t.qZA(),t.TgZ(4,"div",4),t._uU(5),t.qZA(),t.qZA(),t.qZA(),t.TgZ(6,"div",5),t.TgZ(7,"div",6),t.TgZ(8,"div",7),t.TgZ(9,"div",8),t.YNc(10,h,1,2,"img",9),t.YNc(11,v,1,0,"img",10),t.qZA(),t.TgZ(12,"div",11),t.TgZ(13,"div",12),t._uU(14),t._UZ(15,"div",13),t.qZA(),t.TgZ(16,"div",14),t._uU(17),t.qZA(),t.qZA(),t.TgZ(18,"div",15),t.TgZ(19,"div",16),t.YNc(20,Z,7,8,"div",17),t.YNc(21,T,4,4,"div",18),t.YNc(22,x,5,0,"div",19),t.YNc(23,A,5,0,"div",19),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(5),t.hij(" ",null==i.product?null:i.product.name," "),t.xp6(5),t.Q6J("ngIf",null==i.product||null==i.product.images?null:i.product.images.length),t.xp6(1),t.Q6J("ngIf",null==i.product?null:i.product.activeOffer),t.xp6(3),t.hij(" ",null==i.product?null:i.product.description," "),t.xp6(3),t.hij(" ",null==i.product||null==i.product.category?null:i.product.category.name," "),t.xp6(3),t.Q6J("ngIf",null==i.product?null:i.product.activeOffer),t.xp6(1),t.Q6J("ngIf",!(null!=i.product&&i.product.activeOffer)),t.xp6(1),t.Q6J("ngIf",!i.cart.GetProductFormCart(i.product)),t.xp6(1),t.Q6J("ngIf",i.cart.GetProductFormCart(i.product)))},directives:[d.O5],pipes:[d.JJ],styles:[".product-category[_ngcontent-%COMP%]{margin:10px 0 0;font-size:1.1rem;color:#000;font-weight:bolder}.product-name[_ngcontent-%COMP%]{text-align:right;font-size:1.2rem;color:#000;font-weight:bold;text-transform:uppercase;margin:6px 0}.product-description[_ngcontent-%COMP%]{margin:15px 0 0;font-size:1.2rem!important;color:#666;text-align:justify;text-justify:inter-word;line-height:1.2rem}.card-image[_ngcontent-%COMP%]{border-radius:12px 12px 0 0;width:100%;height:40vh;min-height:100px;object-fit:cover;object-position:center}"]}),n})()}];let b=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[p.u5,d.ez,p.UX,l.Bz.forChild(P)]]}),n})()}}]);