"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[478],{9478:(A,c,n)=>{n.r(c),n.d(c,{EmailVerificationModule:()=>V});var l=n(6019),s=n(9845),d=n(7537),f=n(1859),m=n(4611),i=n(1514),v=n(7754),g=n(9299);function u(t,o){1&t&&(i.TgZ(0,"div",14),i._uU(1," El correo se ha verificado "),i.qZA())}function h(t,o){1&t&&(i.TgZ(0,"div",15),i._uU(1," El link de verificaci\xf3n ha caducado "),i.qZA())}function p(t,o){1&t&&(i.TgZ(0,"div",15),i._uU(1," Error al verificar correo "),i.qZA())}function Z(t,o){if(1&t&&(i.TgZ(0,"div"),i.YNc(1,u,2,0,"div",11),i.YNc(2,h,2,0,"div",12),i.YNc(3,p,2,0,"div",12),i.TgZ(4,"div",13),i._uU(5," Puede cerrar esta ventana "),i.qZA(),i.qZA()),2&t){const e=i.oxw();i.xp6(1),i.Q6J("ngIf",e.emailVerified&&!e.linkCaducated),i.xp6(1),i.Q6J("ngIf",e.linkCaducated),i.xp6(1),i.Q6J("ngIf",!e.emailVerified&&!e.linkCaducated)}}function E(t,o){1&t&&(i.TgZ(0,"div"),i._UZ(1,"i",16),i.qZA())}const T=[{path:"",component:(()=>{class t{constructor(e,a,r){this.activatedRoute=e,this.http=a,this.role=r,this.loading=!0,this.linkCaducated=!1,this.emailVerified=!1,this.verificationLink=""}ngOnInit(){this.activatedRoute.params.subscribe(e=>{this.verificationLink=e.verificationLink,this.VerifyEmail()})}VerifyEmail(){this.http.Patch("/Accounts/VerifyEmail",{verificationLink:this.verificationLink}).subscribe(e=>{if(this.emailVerified=e,e){let a=this.role.GetUser();a.emailVerified=e,this.http.SetUserSession(a)}this.loading=!1},e=>{console.error("Error al verificar email",e),this.loading=!1})}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(s.gz),i.Y36(v.O),i.Y36(g.N))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-email-verification"]],decls:13,vars:2,consts:[[1,"full-screen"],[1,"vertical-center"],[1,"w-100"],[1,"row","justify-content-center"],[1,"col-12","col-md-8","col-lg-6"],[1,"card"],[1,"card-header"],[1,"card-title","text-center",2,"font-weight","bolder"],[1,"card-body","text-center",2,"font-size","2rem","font-weight","bold"],[4,"ngIf","ngIfElse"],["bigLoading",""],["style","color: var(--success);",4,"ngIf"],["style","color: var(--danger);",4,"ngIf"],[1,"mt-3",2,"font-size","1.5rem","font-weight","normal"],[2,"color","var(--success)"],[2,"color","var(--danger)"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"]],template:function(e,a){if(1&e&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"div",2),i.TgZ(3,"div",3),i.TgZ(4,"div",4),i.TgZ(5,"div",5),i.TgZ(6,"div",6),i.TgZ(7,"h3",7),i._uU(8,"Verificaci\xf3n de correo"),i.qZA(),i.qZA(),i.TgZ(9,"div",8),i.YNc(10,Z,6,3,"div",9),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.YNc(11,E,2,0,"ng-template",null,10,i.W1O)),2&e){const r=i.MAs(12);i.xp6(10),i.Q6J("ngIf",!a.loading)("ngIfElse",r)}},directives:[l.O5],styles:[".card[_ngcontent-%COMP%]{background-color:#fff8;box-shadow:none!important}"]}),t})()}];let V=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[[d.u5,l.ez,m.A0,d.UX,f.zk.forRoot(),s.Bz.forChild(T)]]}),t})()}}]);