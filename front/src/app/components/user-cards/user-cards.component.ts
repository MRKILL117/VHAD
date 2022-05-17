import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  @Output() OnCardSelected: EventEmitter<any> = new EventEmitter<any>(false);
  userCards: Array<any> = [];
  selectedCard: any = null;
  user: any = {};
  loading: any = {
    getting: false,
    creating: false,
  }
  cardForm: FormGroup = new FormGroup({
    number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    cvc: new FormControl('', [Validators.required]),
    exp_month: new FormControl('', [Validators.required]),
    exp_year: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpService,
    public modal: ModalService,
    public form: FormService,
    private toast: ToastService,
    private role: RoleService
  ) {
    this.user = this.role.GetUser();
  }

  ngOnInit(): void {
    // this.GetUserCards();
  }

  GetUserCards() {
    this.loading.getting = true;
  }

  AddCardToUser() {
    if(!this.cardForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.cardForm.markAllAsTouched();
      return;
    }

    this.loading.creating = true;
    this.http.Post(`Accounts/${this.user ? this.user.id: 0}/AddCard`, {card: this.cardForm.value}).subscribe(cardAdded => {
      this.toast.ShowDefaultSuccess(`Tarjeta agregada`);
      this.modal.CloseModal();
      this.loading.creating = false;
    }, err => {
      console.error("Error al agregar tarjeta", err);
      this.toast.ShowDefaultDanger(`Error al agregar tarjeta`);
      this.loading.creating = false;
    })
  }

  SelectCard(card: any) {
    this.selectedCard = card;
    this.OnCardSelected.emit(card);
  }

}
