import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Address } from '../models/Address';
import { ObjectifModel, TicketSignUpModel } from './models/TicketSignUp';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  signupInformation: TicketSignUpModel = new TicketSignUpModel();

  private signupInformationComplete = new Subject<TicketSignUpModel>();
  signupInformationComplete$ = this.signupInformationComplete.asObservable();

  getSignUpInformation() {
    return this.signupInformation;
  }

  setSignUpInformation(signupInformation: TicketSignUpModel) {
    this.signupInformation = signupInformation;
  }

  complete() {
    this.signupInformationComplete.next(this.signupInformation);
  }
}
