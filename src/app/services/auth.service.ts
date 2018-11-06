import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';

import { User } from '../models/User';

import * as moment from 'moment';

@Injectable()
export class AuthService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8081';
  }

  signUp(email: string, password: string, username: string) {
    return this.http
      .post<User>(`${this.baseUrl}/api/auth/signup`, {
        email,
        password,
        username
      })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  signIn(email: string, password: string, username: string) {
    return this.http
      .post<User>(`${this.baseUrl}/api/auth/signin`, { email, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult) {
    console.log('authResult: ', authResult.token);
    const expiresAt = moment().add(60 * 60, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  signOut() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isSignedOut() {
    return !this.isSignedIn();
  }

  isSignedIn() {
    if (
      localStorage.getItem('id_token') &&
      JSON.parse(localStorage.getItem('expires_at')) - Date.now() > 0
    ) {
      return true;
    }
  }
}
