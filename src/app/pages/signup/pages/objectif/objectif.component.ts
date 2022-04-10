import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectifModel, TicketSignUpModel } from '../../models/TicketSignUp';
import { SignUpService } from '../../signup.service';
import {SignUpDto} from "../../models/SignupDto";
import {COMPTE} from "../../../../models/constantes/compte";

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss'],
})
export class ObjectifComponent implements OnInit {
  isDisabled: boolean;
  submitted = false;
  isModified = false;
  // objectifInformation: ObjectifModel;
  ticketSignUpInformation: SignUpDto;
  role?: string;

  constructor(
    private signupService: SignUpService,
    private router: Router,
  ) {
    this.isDisabled = true;
    // this.objectifInformation = new ObjectifModel();
    this.ticketSignUpInformation = {
      role: ''
    };
  }

  ngOnInit(): void {
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    console.log("OnInit",this.ticketSignUpInformation);
    const objectif = this.ticketSignUpInformation?.role;
    // identifier si l'utilisateur veut modifier son type de compte
    if (this.role && objectif != this.role) {
      this.isModified = true;
      // this.role = this.ticketSignUpInformation.role;
      // this.isModified =
      //   this.role != this.objectifInformation.isBarber;
    }
  }

  /**
   * Method to save the user and navigate to the next step
   * Verify if the user is a client or a barber or an admin
   * No two choices simultaneously
   */
  nextPage() {
    if (!this.submitted) {
      this.ticketSignUpInformation.role = this.role;
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
      this.role = COMPTE.CLIENT;
      this.ticketSignUpInformation.role = COMPTE.CLIENT;
    // if (this.isModified) {
    //   // this.objectifInformation = new ObjectifModel();
    //   // this.objectifInformation.isClient = true;
    //   // this.nextPage();
    //   // return;
    // }

    console.log("CREATE CLIENT", this.ticketSignUpInformation);

    //this.objectifInformation.isClient = true;
    this.nextPage();
  }

  /**
   * Method to create a Barber's objectif
   */
  createBarber() {
    this.role = COMPTE.BARBER;
    this.ticketSignUpInformation.role = COMPTE.BARBER;
    // if (this.isModified) {
    //   this.objectifInformation = new ObjectifModel();
    //   this.objectifInformation.isBarber = true;
    //   this.nextPage();
    //   return;
    // }
    //
    // this.objectifInformation.isBarber = true;
    console.log("CREATE BARBER", this.ticketSignUpInformation);
    this.nextPage();
  }
}
