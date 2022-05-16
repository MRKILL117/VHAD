import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoleService } from './role.service';
declare var Conekta: any;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers: HttpHeaders;
  public apiBaseUrl: string;
  public hostBaseUrl: string;

  constructor(
    private http: HttpClient,
    private role: RoleService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.apiBaseUrl = environment.apiBaseUrl;
    this.hostBaseUrl = environment.hostBaseUrl;
    Conekta.setPublicKey('');
  }

  private GetEndpointFullUrl(endpoint: string): string {
    let fullEndpoint;
    if(endpoint.charAt(0) == '/') fullEndpoint = `${this.apiBaseUrl}${endpoint}`;
    else fullEndpoint = `${this.apiBaseUrl}/${endpoint}`;
    if(this.role.GetUserToken()) fullEndpoint = fullEndpoint.concat(`?access_token=${this.role.GetUserToken()}`);
    return fullEndpoint;
  }

  public Post(endpoint: string, body: any) {
    return this.http.post(this.GetEndpointFullUrl(endpoint), body, {headers: this.headers});
  }
  
  public Get(endpoint: string) {
    return this.http.get(this.GetEndpointFullUrl(endpoint), {headers: this.headers});
  }
  
  public Patch(endpoint: string, body: any) {
    return this.http.patch(this.GetEndpointFullUrl(endpoint), body, {headers: this.headers});
  }

  public Delete(endpoint: string) {
    return this.http.delete(this.GetEndpointFullUrl(endpoint), {headers: this.headers});
  }

  public UploadFile(endpoint: string, file: any, body: any = null) {
    let formData = new FormData();
    formData.append('file', file);
    if(body) {
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          const element = body[key];
          formData.append(key, JSON.stringify(element));
        }
      }
    }
    return this.http.post(this.GetEndpointFullUrl(endpoint), formData);
  }

  public UploadFormDataFile(endpoint: string, body: FormData) {
    return this.http.post(this.GetEndpointFullUrl(endpoint), body);
  }

  public SetUserSession(userLogged: any) {
    if(userLogged) {
      const userToken = userLogged.token;
      delete userLogged.token;
      localStorage.setItem('token', userToken.id);
      localStorage.setItem('user', JSON.stringify(userLogged));
    }
  }

  // ------------------------------- Conekta ------------------------------- //

  public GenerteCardToken(card: any) {
    return new Promise((res, rej) => {
      let isNumberValid = Conekta.Card.validateNumber(card.number);
      let isExpirationDateValid = Conekta.Card.validateExpirationDate(card.exp_month, card.exp_year);
      let isCvcValid = Conekta.Card.validateCVC(card.cvc);

      if(!isNumberValid) rej('Numero de tarjeta inválido');
      if(!isExpirationDateValid) rej('Fecha de expiración inválida');
      if(!isCvcValid) rej('CVC inválido');
  
      if(isNumberValid && isExpirationDateValid && isCvcValid) {
        Conekta.Token.create({data: {card}}, ((token: any) => {
          res(token);
        }), (err: any) => {
          rej(err);
        });
      }
    });

  }
  
}
