import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  signupInformation: any;
  private informationComplete = new Subject<any>();
  informationComplete$ = this.informationComplete.asObservable();

  constructor() {
    this.clearSignUpInformation();
  }

  getSignUpInformation() {
    return this.signupInformation;
  }

  setSignUpInformation(signupInformation: any) {
    this.signupInformation = signupInformation;
  }

  clearSignUpInformation() {
    this.signupInformation = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      imageURL: '',
      dob: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        apartment: '',
      },
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
    this.informationComplete.next(this.signupInformation.address);
  }
}
