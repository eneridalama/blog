import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AuthModel,
  ResponseModel,
  SignUpModel,
} from '../core/model/auth.model';
import { UserModel } from '../core/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  user: Subject<UserModel> = new Subject();

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.url = environment.baseUrl + '/auth';
  }

  signIn(authModel: AuthModel): Observable<ResponseModel<UserModel>> {
    return this.httpClient
      .post<ResponseModel<UserModel>>(this.url + '/signIn', authModel)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.data.token);
        })
      );
  }

  signUp(signUpModel: SignUpModel): Observable<ResponseModel<UserModel>> {
    return this.httpClient
      .post<ResponseModel<UserModel>>(this.url + '/signUp', signUpModel)
      .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loggedUser() {
    if(this.loggedIn()){
      return localStorage.getItem('user') as any;
    }
    return null;
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('user')!).role == '9';
  }
}
