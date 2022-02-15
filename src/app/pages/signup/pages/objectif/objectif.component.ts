import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectifModel, TicketSignUpModel } from '../../models/TicketSignUp';
import { SignUpService } from '../../signup.service';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss'],
})
export class ObjectifComponent implements OnInit {
  isDisabled: boolean;
  submitted = false;
  isModified = false;
  objectifInformation: ObjectifModel;
  ticketSignUpInformation: TicketSignUpModel;

  constructor(
    private signupService: SignUpService,
    private router: Router,
  ) {
    this.isDisabled = true;
    this.objectifInformation = new ObjectifModel();
    this.ticketSignUpInformation = new TicketSignUpModel();
  }

  ngOnInit(): void {
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();

    const objectif = this.ticketSignUpInformation.objectif;
    // identifier si l'utilisateur veut modifier son type de compte
    if (objectif.isClient != objectif.isBarber) {
      this.objectifInformation = this.ticketSignUpInformation.objectif;
      this.isModified =
        this.objectifInformation.isClient != this.objectifInformation.isBarber;
    }
  }

  /**
   * Method to save the user and navigate to the next step
   * Verify if the user is a client or a barber or an admin
   * No two choices simultaneously
   */
  nextPage() {
    if (!this.submitted) {
      this.ticketSignUpInformation.objectif = this.objectifInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);
      this.router.navigate(['/signup/profile']);
    }

    this.submitted = true;
  }

  /**
   *
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Method to create a Client's objectif
   */
  createClient() {
    if (this.isModified) {
      this.objectifInformation = new ObjectifModel();
      this.objectifInformation.isClient = true;
      this.nextPage();
      return;
    }

    this.objectifInformation.isClient = true;
    this.nextPage();
  }

  /**
   * Method to create a Barber's objectif
   */
  createBarber() {
    if (this.isModified) {
      this.objectifInformation = new ObjectifModel();
      this.objectifInformation.isBarber = true;
      this.nextPage();
      return;
    }

    this.objectifInformation.isBarber = true;
    this.nextPage();
  }
}
