import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('token') || '';
    var request = req.clone({});
    if (token && token !== '') {
      if (token.startsWith('', 0)) {
        token = token.substring(1, token.length);
      }
      if (token.endsWith('', token.length - 1)) {
        token = token.substring(0, token.length - 1);
      }
      request = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    return next.handle(request);
  }
}
