import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  changeAuth(status: boolean) {
    this.isAuthenticated$.next(status);
  }
}
