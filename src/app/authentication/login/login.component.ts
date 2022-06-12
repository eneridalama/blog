import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/core/model/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private messageService: MessageService
    ) {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
              '^(?=.*d)(?=.*[a-zA-Z]).{8,16}$'
            )
      ]),
    });
  }

  ngOnInit(): void {}
  
  logIn() {
    console.log(this.loginForm.value);

    this.isLoading = true;
    this.authService
      .signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/home']);
          this.isLoading = false;
          type user = Omit<UserModel, "token">
          localStorage.setItem('user', JSON.stringify(res.data as user));
        },
        (error) => {
          this.isLoading = false;
          this.showError("The credentials you have entered are incorrect.");
        }
      );
    this.loginForm.reset();
  }

  async signInWithGoogle() {
    console.log('google sign in is active');
    try {
      await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } catch (e) {
      console.log(e);
    }
  }

  showError(errorMsg: string) {
    this.messageService.add({
      key: 'loginToast',
      severity: 'error',
      summary: 'Error',
      detail: errorMsg,
    });
  }
}
