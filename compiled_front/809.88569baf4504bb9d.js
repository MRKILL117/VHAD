"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[809],{1809:(C,d,l)=>{l.r(d),l.d(d,{LoginModule:()=>A});var f=l(6019),v=l(9845),i=l(7537),o=l(1514),a=l(7754),c=l(830),n=l(6588);function u(t,m){1&t&&(o.TgZ(0,"span",26),o._uU(1," C\xf3digo o correo no v\xe1lido "),o.qZA())}function h(t,m){1&t&&(o.TgZ(0,"span",26),o._uU(1," Favor de ingresar su c\xf3digo o su correo "),o.qZA())}function Z(t,m){if(1&t&&(o.TgZ(0,"div",24),o.YNc(1,u,2,0,"span",25),o.YNc(2,h,2,0,"span",25),o.qZA()),2&t){const r=o.oxw();let e,s;o.xp6(1),o.Q6J("ngIf",null==(e=r.form.GetFormControlByName(r.loginForm,"username"))||null==e.errors?null:e.errors.pattern),o.xp6(1),o.Q6J("ngIf",null==(s=r.form.GetFormControlByName(r.loginForm,"username"))||null==s.errors?null:s.errors.required)}}function p(t,m){1&t&&(o.TgZ(0,"span",26),o._uU(1," Favor de ingresar su contrase\xf1a "),o.qZA())}function F(t,m){if(1&t&&(o.TgZ(0,"div",24),o.YNc(1,p,2,0,"span",25),o.qZA()),2&t){const r=o.oxw();let e;o.xp6(1),o.Q6J("ngIf",null==(e=r.form.GetFormControlByName(r.loginForm,"password"))||null==e.errors?null:e.errors.required)}}const T=[{path:"",component:(()=>{class t{constructor(r,e,s,g){this.http=r,this.form=e,this.toast=s,this.router=g,this.loginForm=new i.cw({username:new i.NI("",[i.kI.required,i.kI.pattern(/(^[0-9]{4}$)|(^[a-zA-Z0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/)]),password:new i.NI("",[i.kI.required])})}ngOnInit(){let r=localStorage.getItem("user");null!=r&&(r=JSON.parse(r),r.role&&"string"==typeof r.role.name&&this.router.navigate([`${r.role.name.toLowerCase()}/inicio`]))}Login(){if(!this.loginForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar todos los campos","Formulario incompleto"),void this.loginForm.markAllAsTouched();let r=this.loginForm.value;this.form.emailRegex.test(r.username)&&(r.email=r.username,delete r.username),this.http.Post("/Accounts/Login",{credentials:this.loginForm.value}).subscribe(e=>{this.http.SetUserSession(e),this.toast.ShowDefaultSuccess("Sesi\xf3n iniciada correctamente"),this.router.navigate(e.firstTimeConfiguration?[`/${e.role.name.toLowerCase()}/inicio`]:[`/${e.role.name.toLowerCase()}/perfil`])},e=>{this.toast.ShowDefaultDanger("Correo y/o contrase\xf1a incorrectos","Login fallido"),console.error("Error al hacer login",e)})}GetRegisterRoute(){return`${this.http.hostBaseUrl}/registro`}GetRecoverPasswordRoute(){return`${this.http.hostBaseUrl}/recuperar-cuenta`}}return t.\u0275fac=function(r){return new(r||t)(o.Y36(a.O),o.Y36(c.o),o.Y36(n.k),o.Y36(v.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-login"]],decls:35,vars:5,consts:[[1,"full-screen"],[1,"vertical-center"],[1,"w-100"],[1,"row","justify-content-center"],[1,"col-12","col-md-8","col-lg-6"],[1,"card"],[1,"card-header"],[1,"card-title","mb-0"],[1,"card-body"],[3,"formGroup"],[1,"form-group"],["for","username"],[1,"input-container"],[1,"input-icon","zmdi","zmdi-lock"],["type","text","formControlName","username","placeholder","Ingrese su c\xf3digo o su email",1,"form-control",3,"keyup.enter"],["class","error-messages",4,"ngIf"],["for","password"],[1,"input-icon","zmdi","zmdi-key"],["type","password","formControlName","password","placeholder","Ingrese su contrase\xf1a",1,"form-control",3,"keyup.enter"],[1,"text-center"],[3,"href"],[1,"text-center","mt-2"],[1,"card-footer","text-right"],[1,"btn","btn-primary",3,"click"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"]],template:function(r,e){if(1&r&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"div",2),o.TgZ(3,"div",3),o.TgZ(4,"div",4),o.TgZ(5,"div",5),o.TgZ(6,"div",6),o.TgZ(7,"h3",7),o._uU(8,"Login"),o.qZA(),o.qZA(),o.TgZ(9,"div",8),o.TgZ(10,"form",9),o.TgZ(11,"div",10),o.TgZ(12,"label",11),o._uU(13,"C\xf3digo o email"),o.qZA(),o.TgZ(14,"div",12),o._UZ(15,"i",13),o.TgZ(16,"input",14),o.NdJ("keyup.enter",function(){return e.Login()}),o.qZA(),o.qZA(),o.YNc(17,Z,3,2,"div",15),o.qZA(),o.TgZ(18,"div",10),o.TgZ(19,"label",16),o._uU(20,"Contrase\xf1a"),o.qZA(),o.TgZ(21,"div",12),o._UZ(22,"i",17),o.TgZ(23,"input",18),o.NdJ("keyup.enter",function(){return e.Login()}),o.qZA(),o.qZA(),o.YNc(24,F,2,1,"div",15),o.qZA(),o.qZA(),o.TgZ(25,"div",19),o._uU(26," \xbfNo tienes cuenta? "),o.TgZ(27,"a",20),o._uU(28,"Registrate aqu\xed"),o.qZA(),o.qZA(),o.TgZ(29,"div",21),o.TgZ(30,"a",20),o._uU(31,"\xbfOlvido su contrase\xf1a?"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(32,"div",22),o.TgZ(33,"button",23),o.NdJ("click",function(){return e.Login()}),o._uU(34," Iniciar sesi\xf3n "),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&r){let s,g;o.xp6(10),o.Q6J("formGroup",e.loginForm),o.xp6(7),o.Q6J("ngIf",(null==(s=e.form.GetFormControlByName(e.loginForm,"username"))?null:s.touched)&&(null==(s=e.form.GetFormControlByName(e.loginForm,"username"))?null:s.errors)),o.xp6(7),o.Q6J("ngIf",(null==(g=e.form.GetFormControlByName(e.loginForm,"password"))?null:g.touched)&&(null==(g=e.form.GetFormControlByName(e.loginForm,"password"))?null:g.errors)),o.xp6(3),o.s9C("href",e.GetRegisterRoute(),o.LSH),o.xp6(3),o.s9C("href",e.GetRecoverPasswordRoute(),o.LSH)}},directives:[i._Y,i.JL,i.sg,i.Fj,i.JJ,i.u,f.O5],styles:[".card[_ngcontent-%COMP%]{background-color:#fff8;box-shadow:none!important}"]}),t})()}];let A=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[i.u5,f.ez,i.UX,v.Bz.forChild(T)]]}),t})()},830:(C,d,l)=>{l.d(d,{o:()=>o});var f=l(7537);function v(a){return c=>c.value&&a!=c.value?{matchstring:a}:null}var i=l(1514);let o=(()=>{class a{constructor(){this.emailRegex=/^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/,this.emailOrCodeRegex=/(^[0-9]{4}$)|(^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/}GetFormControlByName(n,u){return n.controls.hasOwnProperty(u)?n.get(u):null}ResetForm(n){n.reset()}ClearFormControls(n){for(const u in n.controls)Object.prototype.hasOwnProperty.call(n.controls,u)&&n.removeControl(u)}FormatControlName(n=""){return n.replace(/ /gi,"_").toUpperCase()}OnPasswordChange(n,u,h){const Z=this.GetFormControlByName(n,u),p=this.GetFormControlByName(n,h);null!=Z&&null!=p&&(p.setValidators([f.kI.required,v(Z.value)]),p.updateValueAndValidity({onlySelf:!0}))}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275prov=i.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()}}]);