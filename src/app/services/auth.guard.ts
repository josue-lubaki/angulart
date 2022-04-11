import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorage : LocalStorageService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // verify validity of token
    const token = this.localStorage.getToken();

    if(token && typeof token != 'undefined'){
      // décoder le token si existe
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(!AuthGuard._tokenExpired(tokenDecode.exp)){
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

  /**
   * Method that verify if token is again valid
   * @param expiration the expiration time of token to validate
   * @return boolean
   * */
  private static _tokenExpired(expiration: number) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
