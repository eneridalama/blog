import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  AuthModel,
  ResponseModel,
  SignUpModel,
} from '../core/model/auth.model';
import { UserModel } from '../core/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  user: Subject<UserModel> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/auth';
  }

  signIn(authModel: AuthModel): Observable<ResponseModel<UserModel>> {
    return this.httpClient
      .post<ResponseModel<UserModel>>(this.url + '/signIn', authModel)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.data.token);
          // this.user.next(res.data);
          // console.log('user ', this.user);
        })
      );
  }

  signUp(signUpModel: SignUpModel): Observable<ResponseModel<UserModel>> {
    return this.httpClient
      .post<ResponseModel<UserModel>>(this.url + '/signUp', signUpModel)
      .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  }

  // googleSignIn(idToken: string): Observable<ResponseModel<UserModel>> {
  //   return this.httpClient
  //     .post<ResponseModel<UserModel>>(this.url + '/google/signIn', idToken)
  //     .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  // }

  // googleSignUp(idToken: string) {
  //   return this.httpClient
  //     .post<ResponseModel<UserModel>>(this.url + '/google/signUp', idToken)
  //     .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  // }
}
