import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ObjectifModel, TicketSignUpModel } from '../../models/TicketSignUp';
import { SignUpService } from '../../signup.service';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss'],
})
export class ObjectifComponent implements OnInit {
  isDisabled: boolean;
  submitted: boolean = false;
  isModified: boolean = false;
  objectifInformation: ObjectifModel;
  ticketSignUpInformation: TicketSignUpModel;

  ngOnInit(): void {
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    this.isModified =
      this.objectifInformation.isClient != this.objectifInformation.isBarber;
  }

  constructor(private signupService: SignUpService, private router: Router) {
    this.isDisabled = true;
    this.objectifInformation = new ObjectifModel();
    this.ticketSignUpInformation = new TicketSignUpModel();
  }

  /**
   * Method to save the user and navigate to the next step
   * Verify if the user is a client or a barber or an admin
   * No two choices simultaneously
   */
  nextPage() {
    if (!this.submitted && !this.isDisabled) {
      this.ticketSignUpInformation.objectif = this.objectifInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);
      this.router.navigate(['/signup/profil']);
    }

    this.submitted = true;
  }

  /**
   * Method to create a Client's objectif
   */
  createClient() {
    this.isDisabled = false;

    if (this.isModified) {
      this.objectifInformation = new ObjectifModel();
      this.objectifInformation.isClient = true;
      return;
    }

    this.objectifInformation.isClient = true;
  }

  /**
   * Method to create a Barber's objectif
   */
  createBarber() {
    this.isDisabled = false;

    if (this.isModified) {
      this.objectifInformation = new ObjectifModel();
      this.objectifInformation.isBarber = true;
      return;
    }

    this.objectifInformation.isBarber = true;
  }
}
