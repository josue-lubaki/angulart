import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Address } from '../models/Address';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  signupInformation: User;
  private informationComplete = new Subject<User>();
  informationComplete$ = this.informationComplete.asObservable();

  constructor() {
    this.signupInformation =  this.clearSignUpInformation();
  }

  getSignUpInformation() {
    return this.signupInformation;
  }

  setSignUpInformation(signupInformation: User) {
    this.signupInformation = signupInformation;
  }

  clearSignUpInformation() {
    let address: Address = {
      street: '',
      city: '',
      state: '',
      zip: '',
      apartment: '',
    };

    return this.signupInformation = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      imageURL: '',
      dob: Date.now(),
      reservations: [],
      isClient: true,
      address: address,
    };
  }

  getSignUpInformationKeys() {
    return Object.keys(this.signupInformation);
  }

  getSignUpInformationValues() {
    return Object.values(this.signupInformation);
  }

  getSignUpInformationKeyValuePairs() {
    return Object.entries(this.signupInformation);
  }

  complete() {
    this.informationComplete.next(this.signupInformation);
  }
}
