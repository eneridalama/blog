import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { passwordRegex } from './../../core/common/constants';
import { UserRole } from './../../core/common/enums';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    });
  }

  ngOnInit(): void {}

  logIn() {
    this.isLoading = true;
    this.authService
      .signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }).pipe(tap(res => {
        if (res && res.data && res.data.role == UserRole.USER) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.isLoading = false;
        localStorage.setItem('user', JSON.stringify(res.data));
      },(error) => {
        this.isLoading = false;
        this.showError('The credentials you have entered are incorrect.');
      })).subscribe();
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
