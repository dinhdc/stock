import {
  UserRegisterRequest,
  LoginResponse,
} from './../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServerService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.endpoint;

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/app/login`, {
      username,
      password,
    });
  }

  register(user: UserRegisterRequest) {
    return this.http.post(`${this.baseUrl}/api/app/sign-up`, user);
  }
}
