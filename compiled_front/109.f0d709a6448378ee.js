"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[109],{7109:(U,f,c)=>{c.r(f),c.d(f,{UsersModule:()=>Ae});var p=c(6019),h=c(9845),l=c(7537),Z=c(1859),m=c(4611),e=c(1514),_=c(7754),u=c(6588),x=c(3149),T=c(830);function d(n,s){1&n&&(e.TgZ(0,"div",37),e._UZ(1,"i",38),e.qZA())}function C(n,s){if(1&n&&(e.TgZ(0,"div",39),e._UZ(1,"img",40),e.qZA()),2&n){const t=e.oxw().$implicit,o=e.oxw(3);e.xp6(1),e.Q6J("src",o.file.GenerateFileURL(t.profileImage.partialURL),e.LSH)("alt",t.profileImage.name)}}function A(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",21),e.TgZ(1,"div",22),e.TgZ(2,"div",23),e.TgZ(3,"div",24),e.TgZ(4,"div",25),e.TgZ(5,"div",26),e.YNc(6,d,2,0,"div",27),e.YNc(7,C,2,2,"div",28),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"div",29),e.TgZ(9,"div",30),e.TgZ(10,"label"),e._uU(11,"C\xf3digo"),e.qZA(),e.TgZ(12,"div"),e._uU(13),e.qZA(),e.qZA(),e.TgZ(14,"div",30),e.TgZ(15,"label"),e._uU(16,"Nombre"),e.qZA(),e.TgZ(17,"div"),e._uU(18),e.qZA(),e.qZA(),e.TgZ(19,"div",30),e.TgZ(20,"label"),e._uU(21,"Email"),e.qZA(),e.TgZ(22,"div"),e._uU(23),e.qZA(),e.qZA(),e.TgZ(24,"div",30),e.TgZ(25,"label"),e._uU(26,"Rol"),e.qZA(),e.TgZ(27,"div"),e._uU(28),e.qZA(),e.qZA(),e.TgZ(29,"div",30),e.TgZ(30,"button",31),e.NdJ("click",function(){const i=e.CHM(t).$implicit,a=e.oxw(3),g=e.MAs(27);return a.selectedUser=i,a.OpenModal(g)}),e._uU(31," Cambiar contrase\xf1a "),e.qZA(),e.qZA(),e.TgZ(32,"div",6),e.TgZ(33,"div",32),e.TgZ(34,"button",33),e.NdJ("click",function(){const i=e.CHM(t).$implicit,a=e.oxw(3),g=e.MAs(29);return a.SetUserToEdit(i),a.OpenModal(g)}),e._UZ(35,"i",34),e.qZA(),e.TgZ(36,"button",35),e.NdJ("click",function(){const i=e.CHM(t).$implicit,a=e.oxw(3),g=e.MAs(23);return a.SetUserToDelete(i),a.OpenModal(g)}),e._UZ(37,"i",36),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=s.$implicit,o=e.oxw(3);let r;e.xp6(6),e.Q6J("ngIf",!t.profileImage),e.xp6(1),e.Q6J("ngIf",t.profileImage),e.xp6(6),e.Oqu(t.username),e.xp6(5),e.Oqu(t.name),e.xp6(5),e.Oqu(t.email),e.xp6(5),e.Oqu(null==(r=o.GetRoleByName(null==t.role?null:t.role.name))?null:r.label)}}function v(n,s){if(1&n&&(e.ynx(0),e.YNc(1,A,38,6,"div",20),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.users)}}function F(n,s){if(1&n&&(e.TgZ(0,"div",0),e.YNc(1,v,2,1,"ng-container",19),e.qZA()),2&n){const t=e.oxw(),o=e.MAs(21);e.xp6(1),e.Q6J("ngIf",t.users.length)("ngIfElse",o)}}function w(n,s){1&n&&(e.TgZ(0,"div",41),e.TgZ(1,"div",42),e._UZ(2,"i",43),e.qZA(),e.qZA())}function q(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"Sin usuarios registrados"),e.qZA())}function b(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"No se encontraron coincidencias"),e.qZA())}function N(n,s){if(1&n&&(e.TgZ(0,"div",44),e.YNc(1,q,2,0,"span",45),e.YNc(2,b,2,0,"span",45),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",!t.txtToFilter&&!t.roleToFilter),e.xp6(1),e.Q6J("ngIf",t.txtToFilter||t.roleToFilter)}}function k(n,s){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",55),e.qZA())}function y(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"Si, eliminar"),e.qZA())}function I(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",46),e.TgZ(1,"div",47),e.TgZ(2,"h4",48),e._uU(3,"Eliminar usuario"),e.qZA(),e.TgZ(4,"button",49),e.NdJ("click",function(){return e.CHM(t),e.oxw().CloseModal()}),e.TgZ(5,"span"),e._uU(6,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"div",50),e.TgZ(8,"div",6),e.TgZ(9,"div",51),e._uU(10," \xbfEst\xe1 seguro/a que desea eliminar al usuario "),e.TgZ(11,"b"),e._uU(12),e.qZA(),e._uU(13," permanentemente? "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div",52),e.TgZ(15,"button",53),e.NdJ("click",function(){return e.CHM(t),e.oxw().CloseModal()}),e._uU(16," No, cancelar "),e.qZA(),e.TgZ(17,"button",54),e.NdJ("click",function(){e.CHM(t);const r=e.oxw(),i=e.MAs(25);return r.OpenModal(i)}),e.YNc(18,k,2,0,"span",45),e.YNc(19,y,2,0,"span",45),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(12),e.hij('"',t.selectedUser.name,'"'),e.xp6(5),e.Q6J("disabled",t.loading.deleting),e.xp6(1),e.Q6J("ngIf",t.loading.deleting),e.xp6(1),e.Q6J("ngIf",!t.loading.deleting)}}function J(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba su correo o c\xf3digo "),e.qZA())}function M(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,J,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.confirmDeletionForm,"username"))||null==o.errors?null:o.errors.required)}}function E(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba su contrase\xf1a "),e.qZA())}function P(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,E,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.confirmDeletionForm,"password"))||null==o.errors?null:o.errors.required)}}function Q(n,s){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",55),e.qZA())}function Y(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"Eliminar"),e.qZA())}function G(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",46),e.TgZ(1,"div",47),e.TgZ(2,"h4",48),e._uU(3,"Confirmar acci\xf3n"),e.qZA(),e.TgZ(4,"button",49),e.NdJ("click",function(){return e.CHM(t),e.oxw().CloseModal()}),e.TgZ(5,"span"),e._uU(6,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"div",50),e.TgZ(8,"form",56),e.TgZ(9,"div",6),e.TgZ(10,"label",57),e._uU(11,"Correo o c\xf3digo"),e.qZA(),e.TgZ(12,"input",58),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().DeleteUser()}),e.qZA(),e.YNc(13,M,2,1,"div",59),e.qZA(),e.TgZ(14,"div",6),e.TgZ(15,"label",60),e._uU(16,"Contrase\xf1a"),e.qZA(),e.TgZ(17,"input",61),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().DeleteUser()}),e.qZA(),e.YNc(18,P,2,1,"div",59),e.qZA(),e.qZA(),e.qZA(),e.TgZ(19,"div",52),e.TgZ(20,"button",53),e.NdJ("click",function(){return e.CHM(t),e.oxw().CloseModal()}),e._uU(21," Cancelar "),e.qZA(),e.TgZ(22,"button",54),e.NdJ("click",function(){return e.CHM(t),e.oxw().DeleteUser()}),e.YNc(23,Q,2,0,"span",45),e.YNc(24,Y,2,0,"span",45),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();let o,r;e.xp6(8),e.Q6J("formGroup",t.confirmDeletionForm),e.xp6(5),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.confirmDeletionForm,"username"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.confirmDeletionForm,"username"))?null:o.errors)),e.xp6(5),e.Q6J("ngIf",(null==(r=t.form.GetFormControlByName(t.confirmDeletionForm,"password"))?null:r.touched)&&(null==(r=t.form.GetFormControlByName(t.confirmDeletionForm,"password"))?null:r.errors)),e.xp6(4),e.Q6J("disabled",t.loading.deleting),e.xp6(1),e.Q6J("ngIf",t.loading.deleting),e.xp6(1),e.Q6J("ngIf",!t.loading.deleting)}}function O(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba una contrase\xf1a "),e.qZA())}function D(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," M\xednimo 4 caracteres "),e.qZA())}function S(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," M\xe1ximo 30 caracteres "),e.qZA())}function B(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,O,2,0,"span",63),e.YNc(2,D,2,0,"span",63),e.YNc(3,S,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o,r,i;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.changePasswordForm,"password"))||null==o.errors?null:o.errors.required),e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.changePasswordForm,"password"))||null==r.errors?null:r.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==(i=t.form.GetFormControlByName(t.changePasswordForm,"password"))||null==i.errors?null:i.errors.maxlength)}}function z(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba la confirmaci\xf3n de la contrase\xf1a "),e.qZA())}function R(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Las contrase\xf1as no coinciden "),e.qZA())}function H(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,z,2,0,"span",63),e.YNc(2,R,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o,r;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.changePasswordForm,"confirmPassword"))||null==o.errors?null:o.errors.required),e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.changePasswordForm,"confirmPassword"))||null==r.errors?null:r.errors.matchstring)}}function V(n,s){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",55),e.qZA())}function $(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"Cambiar"),e.qZA())}function L(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",46),e.TgZ(1,"div",47),e.TgZ(2,"h4",48),e._uU(3,"Cambiar contrase\xf1a"),e.qZA(),e.TgZ(4,"button",49),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.CloseModal(),r.ResetForm(r.changePasswordForm)}),e.TgZ(5,"span"),e._uU(6,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"div",50),e.TgZ(8,"form",56),e.TgZ(9,"div",6),e.TgZ(10,"label",60),e._uU(11,"Contrase\xf1a"),e.qZA(),e.TgZ(12,"input",65),e.NdJ("input",function(){e.CHM(t);const r=e.oxw();return r.form.OnPasswordChange(r.changePasswordForm,"password","confirmPassword")})("keyup.enter",function(){return e.CHM(t),e.oxw().ChangePassword()}),e.qZA(),e.YNc(13,B,4,3,"div",59),e.qZA(),e.TgZ(14,"div",6),e.TgZ(15,"label",66),e._uU(16,"Confirmar contrase\xf1a"),e.qZA(),e.TgZ(17,"input",67),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().ChangePassword()}),e.qZA(),e.YNc(18,H,3,2,"div",59),e.qZA(),e.qZA(),e.qZA(),e.TgZ(19,"div",52),e.TgZ(20,"button",53),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.CloseModal(),r.ResetForm(r.changePasswordForm)}),e._uU(21," Cancelar "),e.qZA(),e.TgZ(22,"button",68),e.NdJ("click",function(){return e.CHM(t),e.oxw().ChangePassword()}),e.YNc(23,V,2,0,"span",45),e.YNc(24,$,2,0,"span",45),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();let o,r;e.xp6(8),e.Q6J("formGroup",t.changePasswordForm),e.xp6(5),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.changePasswordForm,"password"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.changePasswordForm,"password"))?null:o.errors)),e.xp6(5),e.Q6J("ngIf",(null==(r=t.form.GetFormControlByName(t.changePasswordForm,"confirmPassword"))?null:r.touched)&&(null==(r=t.form.GetFormControlByName(t.changePasswordForm,"confirmPassword"))?null:r.errors)),e.xp6(4),e.Q6J("disabled",t.loading.restoringPassword),e.xp6(1),e.Q6J("ngIf",t.loading.restoringPassword),e.xp6(1),e.Q6J("ngIf",!t.loading.restoringPassword)}}function W(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Seleccione un rol para el usuario "),e.qZA())}function j(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,W,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.userForm,"role"))||null==o.errors?null:o.errors.required)}}function X(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba nombre del titular de la cuenta "),e.qZA())}function K(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," M\xednimo 6 caracteres "),e.qZA())}function ee(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," M\xe1ximo 70 caracteres "),e.qZA())}function te(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Nombre inv\xe1ilido "),e.qZA())}function ne(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,X,2,0,"span",63),e.YNc(2,K,2,0,"span",63),e.YNc(3,ee,2,0,"span",63),e.YNc(4,te,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o,r,i,a;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.userForm,"name"))||null==o.errors?null:o.errors.required),e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.userForm,"name"))||null==r.errors?null:r.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==(i=t.form.GetFormControlByName(t.userForm,"name"))||null==i.errors?null:i.errors.maxlength),e.xp6(1),e.Q6J("ngIf",null==(a=t.form.GetFormControlByName(t.userForm,"name"))||null==a.errors?null:a.errors.pattern)}}function oe(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba email del titular de la cuenta "),e.qZA())}function re(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Email inv\xe1lido "),e.qZA())}function se(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,oe,2,0,"span",63),e.YNc(2,re,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(2);let o,r;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.userForm,"email"))||null==o.errors?null:o.errors.required),e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.userForm,"email"))||null==r.errors?null:r.errors.pattern)}}function le(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Escriba una contrase\xf1a "),e.qZA())}function ie(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," M\xednimo 4 caracteres "),e.qZA())}function ae(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," M\xe1ximo 30 caracteres "),e.qZA())}function _e(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,le,2,0,"span",63),e.YNc(2,ie,2,0,"span",63),e.YNc(3,ae,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(3);let o,r,i;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.userForm,"password"))||null==o.errors?null:o.errors.required),e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.userForm,"password"))||null==r.errors?null:r.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==(i=t.form.GetFormControlByName(t.userForm,"password"))||null==i.errors?null:i.errors.maxlength)}}function ce(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",6),e.TgZ(1,"label",60),e._uU(2,"Contrase\xf1a"),e.qZA(),e.TgZ(3,"input",78),e.NdJ("input",function(){e.CHM(t);const r=e.oxw(2);return r.form.OnPasswordChange(r.userForm,"password","confirmPassword")})("keyup.enter",function(){e.CHM(t);const r=e.oxw(2);return r.isEditing?r.UpdateUserAsAdmin():r.CreateUser()}),e.qZA(),e.YNc(4,_e,4,3,"div",59),e.qZA()}if(2&n){const t=e.oxw(2);let o;e.xp6(4),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.userForm,"password"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.userForm,"password"))?null:o.errors))}}function me(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Confirme la contrase\xf1a "),e.qZA())}function ue(n,s){1&n&&(e.TgZ(0,"span",64),e._uU(1," Las contrase\xf1as no coinciden "),e.qZA())}function pe(n,s){if(1&n&&(e.TgZ(0,"div",62),e.YNc(1,me,2,0,"span",63),e.YNc(2,ue,2,0,"span",63),e.qZA()),2&n){const t=e.oxw(3);let o,r;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.userForm,"confirmPassword"))||null==o.errors?null:o.errors.required),e.xp6(1),e.Q6J("ngIf",null==(r=t.form.GetFormControlByName(t.userForm,"confirmPassword"))||null==r.errors?null:r.errors.matchstring)}}function de(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",6),e.TgZ(1,"label",66),e._uU(2,"Confirmar contrase\xf1a"),e.qZA(),e.TgZ(3,"input",67),e.NdJ("keyup.enter",function(){e.CHM(t);const r=e.oxw(2);return r.isEditing?r.UpdateUserAsAdmin():r.CreateUser()}),e.qZA(),e.YNc(4,pe,3,2,"div",59),e.qZA()}if(2&n){const t=e.oxw(2);let o;e.xp6(4),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.userForm,"confirmPassword"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.userForm,"confirmPassword"))?null:o.errors))}}function ge(n,s){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",55),e.qZA())}function fe(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"Crear"),e.qZA())}function Ze(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",68),e.NdJ("click",function(){return e.CHM(t),e.oxw(2).CreateUser()}),e.YNc(1,ge,2,0,"span",45),e.YNc(2,fe,2,0,"span",45),e.qZA()}if(2&n){const t=e.oxw(2);e.Q6J("disabled",t.loading.creatingOrEditing),e.xp6(1),e.Q6J("ngIf",t.loading.creatingOrEditing),e.xp6(1),e.Q6J("ngIf",!t.loading.creatingOrEditing)}}function Te(n,s){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",55),e.qZA())}function he(n,s){1&n&&(e.TgZ(0,"span"),e._uU(1,"Actualizar"),e.qZA())}function xe(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",79),e.NdJ("click",function(){return e.CHM(t),e.oxw(2).UpdateUserAsAdmin()}),e.YNc(1,Te,2,0,"span",45),e.YNc(2,he,2,0,"span",45),e.qZA()}if(2&n){const t=e.oxw(2);e.Q6J("disabled",t.loading.creatingOrEditing),e.xp6(1),e.Q6J("ngIf",t.loading.creatingOrEditing),e.xp6(1),e.Q6J("ngIf",!t.loading.creatingOrEditing)}}function Ce(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",46),e.TgZ(1,"div",47),e.TgZ(2,"h4",48),e._uU(3),e.qZA(),e.TgZ(4,"button",49),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.CloseModal(),r.ResetForm(r.userForm)}),e.TgZ(5,"span"),e._uU(6,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"div",50),e.TgZ(8,"form",56),e.TgZ(9,"div",6),e.TgZ(10,"label",69),e._uU(11,"Rol de usuario"),e.qZA(),e._UZ(12,"ng-select",70),e.YNc(13,j,2,1,"div",59),e.qZA(),e.TgZ(14,"div",6),e.TgZ(15,"label",71),e._uU(16,"Nombre"),e.qZA(),e.TgZ(17,"input",72),e.NdJ("keyup.enter",function(){e.CHM(t);const r=e.oxw();return r.isEditing?r.UpdateUserAsAdmin():r.CreateUser()}),e.qZA(),e.YNc(18,ne,5,4,"div",59),e.qZA(),e.TgZ(19,"div",6),e.TgZ(20,"label",73),e._uU(21,"Email"),e.qZA(),e.TgZ(22,"input",74),e.NdJ("keyup.enter",function(){e.CHM(t);const r=e.oxw();return r.isEditing?r.UpdateUserAsAdmin():r.CreateUser()}),e.qZA(),e.YNc(23,se,3,2,"div",59),e.qZA(),e.YNc(24,ce,5,1,"div",75),e.YNc(25,de,5,1,"div",75),e.qZA(),e.qZA(),e.TgZ(26,"div",52),e.TgZ(27,"button",53),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.CloseModal(),r.ResetForm(r.userForm)}),e._uU(28," Cancelar "),e.qZA(),e.YNc(29,Ze,3,3,"button",76),e.YNc(30,xe,3,3,"button",77),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();let o,r,i;e.xp6(3),e.Oqu(t.isEditing?"Editar usuario":"Agregar nuevo usuario"),e.xp6(5),e.Q6J("formGroup",t.userForm),e.xp6(4),e.Q6J("readonly",t.isEditing)("items",t.isEditing?t.roles:t.rolesToCreateUser),e.xp6(1),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.userForm,"role"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.userForm,"role"))?null:o.errors)),e.xp6(5),e.Q6J("ngIf",(null==(r=t.form.GetFormControlByName(t.userForm,"name"))?null:r.touched)&&(null==(r=t.form.GetFormControlByName(t.userForm,"name"))?null:r.errors)),e.xp6(5),e.Q6J("ngIf",(null==(i=t.form.GetFormControlByName(t.userForm,"email"))?null:i.touched)&&(null==(i=t.form.GetFormControlByName(t.userForm,"email"))?null:i.errors)),e.xp6(1),e.Q6J("ngIf",!t.isEditing),e.xp6(1),e.Q6J("ngIf",!t.isEditing),e.xp6(4),e.Q6J("ngIf",!t.isEditing),e.xp6(1),e.Q6J("ngIf",t.isEditing)}}const Ue=[{path:"",component:(()=>{class n{constructor(t,o,r,i,a){this.http=t,this.toast=o,this.modalService=r,this.file=i,this.form=a,this.modalRefs=[],this.txtToFilter="",this.roleToFilter=null,this.roles=[],this.rolesToCreateUser=[],this.users=[],this.isEditing=!1,this.user=null,this.loading={getting:!1,creatingOrEditing:!1,deleting:!1,restoringPassword:!1},this.passwordValidators=[l.kI.required,l.kI.minLength(4),l.kI.maxLength(30)],this.userForm=new l.cw({role:new l.NI(null,[l.kI.required]),name:new l.NI("",[l.kI.required,l.kI.minLength(6),l.kI.maxLength(70),l.kI.pattern(/^[a-zA-Z\s]{1,}$/)]),email:new l.NI("",[l.kI.required,l.kI.pattern(this.form.emailRegex)]),password:new l.NI("",[l.kI.required,l.kI.minLength(4),l.kI.maxLength(30)]),confirmPassword:new l.NI("",[l.kI.required]),firstTimeConfiguration:new l.NI(!0,this.passwordValidators)}),this.changePasswordForm=new l.cw({password:new l.NI("",[]),confirmPassword:new l.NI("",[l.kI.required])}),this.confirmDeletionForm=new l.cw({username:new l.NI("",[l.kI.required,l.kI.pattern(this.form.emailOrCodeRegex)]),password:new l.NI("",[l.kI.required])})}ngOnInit(){this.GetRoles(),this.GetUsers();const t=localStorage.getItem("user");this.user=t?JSON.parse(t):null,t&&this.confirmDeletionForm.controls.username.setValue(this.user.email)}OpenModal(t){this.modalRefs.push(this.modalService.show(t,{backdrop:"static",keyboard:!1}))}CloseModal(){this.modalRefs.length&&this.modalRefs.pop().hide()}CloseAllModals(){for(;this.modalRefs.length;)this.CloseModal()}GetRoleByName(t){return this.roles.find(o=>o.name==t)}GetRoles(){this.http.Get("/Accounts/Roles").subscribe(t=>{this.roles=t,this.rolesToCreateUser=t.filter(o=>"User"!=o.name)},t=>{console.error("Error al obtener los roles",t)})}GetUsers(){this.loading.getting=!0,this.http.Get(`/Accounts/FilteredByText/${this.txtToFilter?this.txtToFilter:"*"}/Role/${this.roleToFilter?this.roleToFilter:"*"}`).subscribe(t=>{this.users=t,this.loading.getting=!1},t=>{console.error("Error al obtener los usuarios",t),this.toast.ShowDefaultDanger("Error al obtener los usuarios"),this.loading.getting=!1})}CreateUser(){if(!this.userForm.valid)return this.toast.ShowDefaultWarning("Favor de completar los datos del formulario","Formulario incompleto"),void this.userForm.markAllAsTouched();this.loading.creatingOrEditing=!0,this.http.Post("/Accounts/WithRole",{user:this.userForm.value}).subscribe(t=>{this.GetUsers(),this.ResetForm(this.userForm),this.CloseModal(),this.toast.ShowDefaultSuccess("Usuario creado correctamente"),this.loading.creatingOrEditing=!1},t=>{console.error("Error al crear usuario",t),this.toast.ShowDefaultDanger("Error al crear usuario"),this.loading.creatingOrEditing=!1})}UpdateUserAsAdmin(){if(!this.userForm.valid)return this.toast.ShowDefaultWarning("Favor de completar el formulario","Formulario incompleto"),void this.userForm.markAllAsTouched();let t=Object.assign(Object.assign({},this.userForm.value),{generateToken:this.selectedUser.id==this.user.id});this.loading.creatingOrEditing=!0,this.http.Patch(`/Accounts/${this.selectedUser?this.selectedUser.id:0}/AsAdmin`,{userData:t}).subscribe(o=>{if(o.token){const r=o.token;delete o.token,localStorage.setItem("token",r.id),localStorage.setItem("user",JSON.stringify(o))}this.CloseModal(),this.GetUsers(),this.ResetForm(this.userForm),this.toast.ShowDefaultSuccess("Usuario actualizado correctamente"),this.loading.creatingOrEditing=!1},o=>{console.error("Error al actualizar usuario",o),this.toast.ShowDefaultDanger("Error al actualizar usuario"),this.loading.creatingOrEditing=!1})}DeleteUser(){if(!this.confirmDeletionForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario","Formulario incompleto"),void this.confirmDeletionForm.markAllAsTouched();let t=this.confirmDeletionForm.value;this.form.emailRegex.test(t.username)&&(t.email=t.username,delete t.username),this.loading.deleting=!0,this.http.Post("/Accounts/VerifyIdentity",{password:t.password}).subscribe(o=>{if(!o)return this.toast.ShowDefaultDanger("Credenciales inv\xe1lidas"),void(this.loading.deleting=!1);this.CloseModal(),this.http.Delete(`/Accounts/${this.selectedUser?this.selectedUser.id:0}`).subscribe(r=>{this.confirmDeletionForm.controls.password.setValue(""),this.CloseModal(),this.GetUsers(),this.toast.ShowDefaultSuccess("Usuario eliminado correctamente"),this.loading.deleting=!1},r=>{console.error("Error al eliminar usuario",r),this.toast.ShowDefaultDanger("Error al eliminar el usuario"),this.loading.deleting=!1})},o=>{this.toast.ShowDefaultDanger("Error al verificar identidad"),this.loading.deleting=!1})}ChangePassword(){if(!this.changePasswordForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario correctamente","Formulario incompleto"),void this.changePasswordForm.markAllAsTouched();this.loading.restoringPassword=!0,this.http.Patch(`/Accounts/${this.selectedUser?this.selectedUser.id:0}/SetPassword`,{newPassword:this.changePasswordForm.value.password,generateToken:this.selectedUser.id==this.user.id}).subscribe(o=>{if(o.token){const r=o.token;delete o.token,localStorage.setItem("token",r.id),localStorage.setItem("user",JSON.stringify(o))}this.toast.ShowDefaultSuccess("Contrase\xf1a actualizada correctamente"),this.CloseModal(),this.form.ResetForm(this.changePasswordForm),this.loading.restoringPassword=!1},o=>{console.error("Error al cambiar contrase\xf1a",o),this.toast.ShowDefaultDanger("Error al cambiar contrase\xf1a"),this.loading.restoringPassword=!1})}ResetForm(t){t.reset()}SetUserToDelete(t){this.selectedUser=t}SetUserToEdit(t){this.SetValidatorsToEditUser(),this.userForm.controls.role.setValue(t.role.name),this.userForm.controls.name.setValue(t.name),this.userForm.controls.email.setValue(t.email),this.userForm.controls.firstTimeConfiguration.setValue(!1),this.selectedUser=t,this.isEditing=!0}SetValidatorsToEditUser(){this.userForm.controls.password.clearValidators(),this.userForm.controls.confirmPassword.clearValidators()}SetValidatorsToCreateUser(){this.userForm.controls.password.setValidators(this.passwordValidators),this.userForm.controls.confirmPassword.setValidators([l.kI.required]),this.userForm.controls.firstTimeConfiguration.setValue(!0),this.isEditing=!1}SetTrigger(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.GetUsers()},300)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(_.O),e.Y36(u.k),e.Y36(Z.tT),e.Y36(x.I),e.Y36(T.o))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-users"]],decls:30,vars:5,consts:[[1,"row","mt-3"],[1,"col-12","view-title","d-flex","justify-content-between","align-items-center"],[1,"d-inline-block"],[1,"btn","btn-primary","px-3","py-2",3,"click"],[1,"zmdi","zmdi-plus-circle-o","mr-1"],[1,"col-12","col-md-6","col-lg-8","col-xl-9"],[1,"form-group"],[1,"input-container"],[1,"input-icon","zmdi","zmdi-search"],["type","text","placeholder","Buscar usuarios","maxlength","30",1,"form-control",3,"ngModel","ngModelChange","input","keyup.enter"],[1,"col-12","col-md-6","col-lg-4","col-xl-3"],["bindLabel","label","bindValue","name","placeholder","Filtrar por rol",3,"items","ngModel","ngModelChange","change"],["class","row mt-3",4,"ngIf","ngIfElse"],["bigLoading",""],["noUsers",""],["adminDeleteUserModal",""],["adminConfirmDeleteUserModal",""],["adminRestorePasswordModal",""],["adminAddOrEditUserModal",""],[4,"ngIf","ngIfElse"],["class","col-12 col-md-6 col-lg-4 col-xl-3 mb-4",4,"ngFor","ngForOf"],[1,"col-12","col-md-6","col-lg-4","col-xl-3","mb-4"],[1,"card"],[1,"card-header","py-0"],[1,"relative-container"],[1,"absolute-container"],[1,"square"],["class","icon-container",4,"ngIf"],["class","img-container",4,"ngIf"],[1,"card-body"],[1,"form-group","user-card-info"],[1,"btn","btn-primary","btn-block","mt-2",3,"click"],[1,"d-flex","justify-content-between","mt-2"],[1,"btn","btn-info",2,"padding","5px 20%",3,"click"],[1,"zmdi","zmdi-edit"],[1,"btn","btn-danger",2,"padding","5px 20%",3,"click"],[1,"zmdi","zmdi-delete"],[1,"icon-container"],[1,"zmdi","zmdi-account"],[1,"img-container"],[2,"height","100%","width","100%","border-radius","50%","object-fit","cover","object-position","center",3,"src","alt"],[1,"row"],[1,"col-12","col-flex-center"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"col-12","text-center",2,"font-size","1.5rem","font-weight","bold"],[4,"ngIf"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[1,"close",3,"click"],[1,"modal-body"],[1,"message-text"],[1,"modal-footer"],[1,"btn","btn-secondary","mr-2",3,"click"],[1,"btn","btn-danger",3,"disabled","click"],[1,"zmdi","zmdi-spinner","zmdi-hc-spin"],[3,"formGroup"],["for","username"],["type","text","placeholder","Correo o c\xf3digo","readonly","","formControlName","username",1,"form-control",3,"keyup.enter"],["class","error-messages",4,"ngIf"],["for","password"],["type","password","placeholder","Contrase\xf1a","formControlName","password",1,"form-control",3,"keyup.enter"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"],["type","password","placeholder","Nueva contrase\xf1a","formControlName","password",1,"form-control",3,"input","keyup.enter"],["for","confirmPassword"],["type","password","placeholder","Confirmar contrase\xf1a","formControlName","confirmPassword",1,"form-control",3,"keyup.enter"],[1,"btn","btn-primary",3,"disabled","click"],["for","role"],["bindLabel","label","bindValue","name","formControlName","role","placeholder","Selecicone un rol de usuario",3,"readonly","items"],["for","name"],["type","text","placeholder","Escriba nombre del titular de la cuenta","formControlName","name",1,"form-control",3,"keyup.enter"],["for","email"],["type","text","placeholder","Escriba email del titular de la cuenta","formControlName","email",1,"form-control",3,"keyup.enter"],["class","form-group",4,"ngIf"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],["class","btn btn-info",3,"disabled","click",4,"ngIf"],["type","password","placeholder","Contrase\xf1a de la cuenta","formControlName","password",1,"form-control",3,"input","keyup.enter"],[1,"btn","btn-info",3,"disabled","click"]],template:function(t,o){if(1&t){const r=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e._uU(3," Usuarios "),e.qZA(),e.TgZ(4,"div",2),e.TgZ(5,"button",3),e.NdJ("click",function(){e.CHM(r);const a=e.MAs(29);return o.SetValidatorsToCreateUser(),o.OpenModal(a)}),e._UZ(6,"i",4),e._uU(7," Nuevo "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"div",0),e.TgZ(9,"div",5),e.TgZ(10,"div",6),e.TgZ(11,"div",7),e._UZ(12,"i",8),e.TgZ(13,"input",9),e.NdJ("ngModelChange",function(a){return o.txtToFilter=a})("input",function(){return o.SetTrigger()})("keyup.enter",function(){return o.GetUsers()}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div",10),e.TgZ(15,"div",6),e.TgZ(16,"ng-select",11),e.NdJ("ngModelChange",function(a){return o.roleToFilter=a})("change",function(){return o.GetUsers()}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(17,F,2,2,"div",12),e.YNc(18,w,3,0,"ng-template",null,13,e.W1O),e.YNc(20,N,3,2,"ng-template",null,14,e.W1O),e.YNc(22,I,20,4,"ng-template",null,15,e.W1O),e.YNc(24,G,25,6,"ng-template",null,16,e.W1O),e.YNc(26,L,25,6,"ng-template",null,17,e.W1O),e.YNc(28,Ce,31,11,"ng-template",null,18,e.W1O)}if(2&t){const r=e.MAs(19);e.xp6(13),e.Q6J("ngModel",o.txtToFilter),e.xp6(3),e.Q6J("items",o.roles)("ngModel",o.roleToFilter),e.xp6(1),e.Q6J("ngIf",!o.loading.getting)("ngIfElse",r)}},directives:[l.Fj,l.nD,l.JJ,l.On,m.w9,p.O5,p.sg,l._Y,l.JL,l.sg,l.u],styles:['.relative-container[_ngcontent-%COMP%]{position:relative;width:100%}.absolute-container[_ngcontent-%COMP%]{text-align:center}.square[_ngcontent-%COMP%]{background-color:#fff;position:relative;display:inline-block;min-width:100px;max-width:200px;width:min-content;font-size:5rem;border-radius:50%;border:2px solid black}.square[_ngcontent-%COMP%]:after{content:"";display:block;padding-bottom:100%}.icon-container[_ngcontent-%COMP%]{position:absolute;top:-15%;left:23%}.img-container[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:-19%;left:0}label[_ngcontent-%COMP%]{margin-bottom:0}.user-card-info[_ngcontent-%COMP%]{margin:0 0 10px;border-top:2px solid black}.message-text[_ngcontent-%COMP%]{font-size:1rem}']}),n})()}];let Ae=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[l.u5,p.ez,m.A0,l.UX,Z.zk.forRoot(),h.Bz.forChild(Ue)]]}),n})()},830:(U,f,c)=>{c.d(f,{o:()=>Z});var p=c(7537);function h(m){return e=>e.value&&m!=e.value?{matchstring:m}:null}var l=c(1514);let Z=(()=>{class m{constructor(){this.emailRegex=/^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/,this.emailOrCodeRegex=/(^[0-9]{4}$)|(^[a-zA-Z\xf10-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/}GetFormControlByName(_,u){return _.controls.hasOwnProperty(u)?_.get(u):null}ResetForm(_){_.reset()}ClearFormControls(_){for(const u in _.controls)Object.prototype.hasOwnProperty.call(_.controls,u)&&_.removeControl(u)}FormatControlName(_=""){return _.replace(/ /gi,"_").toUpperCase()}OnPasswordChange(_,u,x){const T=this.GetFormControlByName(_,u),d=this.GetFormControlByName(_,x);null!=T&&null!=d&&(d.setValidators([p.kI.required,h(T.value)]),d.updateValueAndValidity({onlySelf:!0}))}}return m.\u0275fac=function(_){return new(_||m)},m.\u0275prov=l.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})()}}]);