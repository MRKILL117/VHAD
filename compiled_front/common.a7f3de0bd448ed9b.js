"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[592],{8036:(E,y,s)=>{s.d(y,{S:()=>d});var e=s(1514),u=s(7537),v=s(7754),g=s(9299),f=s(6588),I=s(830),i=s(1859),m=s(6019);const h=["verifyIdentityModal"];function C(t,a){1&t&&(e.TgZ(0,"span",21),e._uU(1," Escriba su correo o c\xf3digo "),e.qZA())}function T(t,a){if(1&t&&(e.TgZ(0,"div",19),e.YNc(1,C,2,0,"span",20),e.qZA()),2&t){const o=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=o.form.GetFormControlByName(o.confirmIdentityForm,"username"))||null==n.errors?null:n.errors.required)}}function M(t,a){1&t&&(e.TgZ(0,"span",21),e._uU(1," Escriba su contrase\xf1a "),e.qZA())}function F(t,a){if(1&t&&(e.TgZ(0,"div",19),e.YNc(1,M,2,0,"span",20),e.qZA()),2&t){const o=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=o.form.GetFormControlByName(o.confirmIdentityForm,"password"))||null==n.errors?null:n.errors.required)}}function Z(t,a){1&t&&(e.TgZ(0,"span"),e._UZ(1,"i",22),e.qZA())}function A(t,a){1&t&&(e.TgZ(0,"span"),e._uU(1,"Confirmar"),e.qZA())}const r=function(){return{backdrop:"static",keyboard:!1}};let d=(()=>{class t{constructor(o,n,l,c){this.http=o,this.role=n,this.toast=l,this.form=c,this.onSuccess=new e.vpe,this.onCancel=new e.vpe,this.validatingIdentity=!1,this.confirmIdentityForm=new u.cw({username:new u.NI("",[u.kI.required,u.kI.pattern(this.form.emailOrCodeRegex)]),password:new u.NI("",[u.kI.required])}),this.user=this.role.GetUser(),this.confirmIdentityForm.controls.username.setValue(this.user.email)}ngOnInit(){}show(){var o;null===(o=this.verifyIdentityModal)||void 0===o||o.show()}ConfirmIdentity(){if(!this.confirmIdentityForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario","Formulario incompleto"),void this.confirmIdentityForm.markAllAsTouched();let o=this.confirmIdentityForm.value;this.form.emailRegex.test(o.username)&&(o.email=o.username,delete o.username),this.validatingIdentity=!0,this.http.Post("/Accounts/VerifyIdentity",{password:o.password}).subscribe(n=>{var l;if(!n)return this.toast.ShowDefaultDanger("Credenciales inv\xe1lidas"),void(this.validatingIdentity=!1);null===(l=this.verifyIdentityModal)||void 0===l||l.hide(),this.validatingIdentity=!1,this.onSuccess.emit(),this.ResetForm()},n=>{console.error("Error al validar credenciales",n),this.toast.ShowDefaultDanger("Error al validar identidad"),this.validatingIdentity=!1})}ResetForm(){this.confirmIdentityForm.reset(),this.confirmIdentityForm.controls.username.setValue(this.user.email)}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(v.O),e.Y36(g.N),e.Y36(f.k),e.Y36(I.o))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-verify-identity-modal"]],viewQuery:function(o,n){if(1&o&&e.Gf(h,5),2&o){let l;e.iGM(l=e.CRH())&&(n.verifyIdentityModal=l.first)}},outputs:{onSuccess:"onSuccess",onCancel:"onCancel"},decls:28,vars:8,consts:[["bsModal","","tabindex","-1","role","dialog","aria-labelledby","first-time-configuration",1,"modal","fade",3,"config"],["verifyIdentityModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[1,"close",3,"click"],[1,"modal-body"],[3,"formGroup"],[1,"form-group"],["for","username"],["type","text","placeholder","Correo o c\xf3digo","readonly","","formControlName","username",1,"form-control"],["class","error-messages",4,"ngIf"],["for","password"],["type","password","placeholder","Contrase\xf1a","formControlName","password",1,"form-control",3,"keyup.enter"],[1,"modal-footer"],[1,"btn","btn-secondary","mr-2",3,"click"],[1,"btn","btn-primary",3,"disabled","click"],[4,"ngIf"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"],[1,"zmdi","zmdi-spinner","zmdi-hc-spin"]],template:function(o,n){if(1&o){const l=e.EpF();e.TgZ(0,"div",0,1),e.TgZ(2,"div",2),e.TgZ(3,"div",3),e.TgZ(4,"div",4),e.TgZ(5,"h4",5),e._uU(6,"Confirmar acci\xf3n"),e.qZA(),e.TgZ(7,"button",6),e.NdJ("click",function(){return e.CHM(l),e.MAs(1).hide(),n.onCancel.emit()}),e.TgZ(8,"span"),e._uU(9,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(10,"div",7),e.TgZ(11,"form",8),e.TgZ(12,"div",9),e.TgZ(13,"label",10),e._uU(14,"Correo o c\xf3digo"),e.qZA(),e._UZ(15,"input",11),e.YNc(16,T,2,1,"div",12),e.qZA(),e.TgZ(17,"div",9),e.TgZ(18,"label",13),e._uU(19,"Contrase\xf1a"),e.qZA(),e.TgZ(20,"input",14),e.NdJ("keyup.enter",function(){return n.ConfirmIdentity()}),e.qZA(),e.YNc(21,F,2,1,"div",12),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"div",15),e.TgZ(23,"button",16),e.NdJ("click",function(){return e.CHM(l),e.MAs(1).hide(),n.onCancel.emit()}),e._uU(24," Cancelar "),e.qZA(),e.TgZ(25,"button",17),e.NdJ("click",function(){return n.ConfirmIdentity()}),e.YNc(26,Z,2,0,"span",18),e.YNc(27,A,2,0,"span",18),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&o){let l,c;e.Q6J("config",e.DdM(7,r)),e.xp6(11),e.Q6J("formGroup",n.confirmIdentityForm),e.xp6(5),e.Q6J("ngIf",(null==(l=n.form.GetFormControlByName(n.confirmIdentityForm,"username"))?null:l.touched)&&(null==(l=n.form.GetFormControlByName(n.confirmIdentityForm,"username"))?null:l.errors)),e.xp6(5),e.Q6J("ngIf",(null==(c=n.form.GetFormControlByName(n.confirmIdentityForm,"password"))?null:c.touched)&&(null==(c=n.form.GetFormControlByName(n.confirmIdentityForm,"password"))?null:c.errors)),e.xp6(4),e.Q6J("disabled",n.validatingIdentity),e.xp6(1),e.Q6J("ngIf",n.validatingIdentity),e.xp6(1),e.Q6J("ngIf",!n.validatingIdentity)}},directives:[i.oB,u._Y,u.JL,u.sg,u.Fj,u.JJ,u.u,m.O5],styles:[""]}),t})()},6250:(E,y,s)=>{s.d(y,{t:()=>i});var e=s(6019),u=s(7537),v=s(1859),f=(s(8036),s(1514));let i=(()=>{class m{}return m.\u0275fac=function(C){return new(C||m)},m.\u0275mod=f.oAB({type:m}),m.\u0275inj=f.cJS({imports:[[u.u5,e.ez,u.UX,v.zk.forRoot()]]}),m})()},3149:(E,y,s)=>{s.d(y,{I:()=>A});var e,u=new Uint8Array(16);function v(){if(!e&&!(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(u)}const g=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,I=function(r){return"string"==typeof r&&g.test(r)};for(var i=[],m=0;m<256;++m)i.push((m+256).toString(16).substr(1));const M=function(r,d,t){var a=(r=r||{}).random||(r.rng||v)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,d){t=t||0;for(var o=0;o<16;++o)d[t+o]=a[o];return d}return function(r){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=(i[r[d+0]]+i[r[d+1]]+i[r[d+2]]+i[r[d+3]]+"-"+i[r[d+4]]+i[r[d+5]]+"-"+i[r[d+6]]+i[r[d+7]]+"-"+i[r[d+8]]+i[r[d+9]]+"-"+i[r[d+10]]+i[r[d+11]]+i[r[d+12]]+i[r[d+13]]+i[r[d+14]]+i[r[d+15]]).toLowerCase();if(!I(t))throw TypeError("Stringified UUID is invalid");return t}(a)};var F=s(1514),Z=s(7754);let A=(()=>{class r{constructor(t){this.http=t}GenerateParcialFileUrl(t,a){return`/Folders/${t}/download/${a}`}UploadFiles(t,a){return new Promise((o,n)=>{let l=new FormData,c=[];const _=Array.from(t);if(!_||!_.length)return o(c);_.forEach((p,U)=>{const P=p.name.split(".").pop();let D=`${M()}.${P}`;l.append(`file_${U+1}`,p,D),c.push(this.GenerateParcialFileUrl(a,D))}),this.http.UploadFormDataFile(`/Folders/${a}/upload`,l).subscribe(p=>{o(c)},p=>n(p))})}UploadFile(t,a){return new Promise((o,n)=>{t||o(null);let l=new FormData;const c=t.name.split(".").pop();let _=`${M()}.${c}`;l.append("file",t,_),this.http.UploadFormDataFile(`/Folders/${a}/upload`,l).subscribe(p=>{o(this.GenerateParcialFileUrl(a,_))},p=>n(p))})}DeleteFile(t,a){return new Promise((o,n)=>{this.http.Delete(`/Folders/${a}/files/${t}`).subscribe(l=>{o(!0)},l=>n(l))})}OnFileChange(t){return t&&t.target?t.target.files:[]}GenerateFileURL(t){return`${this.http.apiBaseUrl}${t}`}}return r.\u0275fac=function(t){return new(t||r)(F.LFG(Z.O))},r.\u0275prov=F.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},754:(E,y,s)=>{s.d(y,{c:()=>g});var e=s(1514),u=s(9845),v=s(9299);let g=(()=>{class f{constructor(i,m){this.router=i,this.role=m}GoToRoute(i){const m=this.role.GetUser();this.router.navigate(m?[`/${m.role.name.toLowerCase()}/${i}`]:[`/${i}`])}}return f.\u0275fac=function(i){return new(i||f)(e.LFG(u.F0),e.LFG(v.N))},f.\u0275prov=e.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),f})()}}]);