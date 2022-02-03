import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { User } from 'src/app/models/User';
import { SignUpService } from '../signup.service';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss'],
})
export class ObjectifComponent implements OnInit {
  isDisabled: boolean = true;
  submitted: boolean = false;
  personalInformation: User;

  ngOnInit(): void {}

  constructor(private signupService: SignUpService, private router: Router) {
    this.personalInformation = this._initPersonalInformation();
  }

  /**
   *  Method to initialize the personal information Form
   */
  private _initPersonalInformation() {
    return this.signupService.getSignUpInformation();
  }

  /**
   * Method to save the user and navigate to the next step
   */
  nextPage() {
    if (this.personalInformation && !this.isDisabled) {
      this.signupService.setSignUpInformation(this.personalInformation);
      console.log(this.personalInformation);
      this.router.navigate(['/signup/profil']);
    }
    this.submitted = true;
  }

  /**
   * Method to create a Client
   */
  createClient() {
    this.isDisabled = false;
    this.personalInformation.isClient = true;
  }

  /**
   * Method to create a Barber
   */
  createBarber() {
    this.isDisabled = false;
    this.personalInformation.isClient = false;
  }
}
