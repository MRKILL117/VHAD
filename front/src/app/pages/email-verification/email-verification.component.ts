import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  loading: boolean = true;
  linkCaducated: boolean = false;
  emailVerified: boolean = false;
  verificationLink: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private role: RoleService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.verificationLink = params.verificationLink;
      this.VerifyEmail();
    });
  }

  VerifyEmail() {
    this.http.Patch(`/Accounts/VerifyEmail`, {verificationLink: this.verificationLink}).subscribe((emailVerified: any) => {
      this.emailVerified = emailVerified;
      if(emailVerified) {
        let userUpdated = this.role.GetUser();
        userUpdated.emailVerified = emailVerified;
        this.http.SetUserSession(userUpdated);
      }
      this.loading = false;
    }, err => {
      console.error("Error al verificar email", err);
      this.loading = false;
    })
  }

}
