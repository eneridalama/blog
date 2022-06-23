import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.signupForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*d)(?=.*[a-zA-Z]).{8,16}$'),
      ]),
    });
  }

  ngOnInit(): void {}

  signUp() {
    console.log(this.signupForm.value);
    this.isLoading = true;
    this.authService
      .signUp({
        firstName: this.signupForm.value.firstname,
        lastName: this.signupForm.value.lastname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      })
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
          localStorage.setItem('user', JSON.stringify(res.data));
        },
        (error) => {
          this.isLoading = false;
          switch(error.error.errno){
              case 1062:
                this.showError('Email has already been taken');
          }
        }
      );
    this.signupForm.reset();
  }

  showError(errorMsg: string) {
    this.messageService.add({
      key: 'signupToast',
      severity: 'error',
      summary: 'Error',
      detail: errorMsg,
    });
  }
}
