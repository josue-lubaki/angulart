import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { TicketSignUpModel } from './models/TicketSignUp';
import {SignUpDto} from "./models/SignupDto";

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  signupInformation: SignUpDto = {}

  private signupInformationComplete = new Subject<SignUpDto>();
  signupInformationComplete$ = this.signupInformationComplete.asObservable();

  getSignUpInformation() {
    return this.signupInformation;
  }

  setSignUpInformation(signupInformation: SignUpDto) {
    this.signupInformation = signupInformation;
  }

  complete() {
    this.signupInformationComplete.next(this.signupInformation);
  }
}
