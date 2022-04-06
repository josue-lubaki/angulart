import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // inject token after login
    const token = this.localStorageService.getToken();

    const requestCloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }});

    return next.handle(requestCloned);
  }
}
