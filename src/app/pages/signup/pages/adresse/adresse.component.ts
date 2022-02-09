import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/Address';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { TicketSignUpModel } from '../../models/TicketSignUp';
import { User } from '../../../../models/User';
import { SignUpService } from '../../signup.service';

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss'],
})
export class AdresseComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  addressInformation: Address;
  ticketSignUpInformation: TicketSignUpModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignUpService,
    private authUserService: AuthUserService
  ) {
    this.form = this._initAdresseForm();
    this.addressInformation = new Address();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
  }

  private _initAdresseForm() {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: [
        '',
        [Validators.required],
        Validators.pattern('/^[A-Za-z][0-9][A-Za-z]s[0-9][A-Za-z][0-9]/g'),
        Validators.minLength(6),
      ],
      state: ['', Validators.required],
      apartment: ['', Validators.required],
    });
  }

  /**
   * Getter du formulaire
   * @returns FormGroup
   */
  get adresseForm() {
    return this.form.controls;
  }

  nextPage() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // setter les informations du form dans PersonalInformation variable
    this.addressInformation = this.form.value as Address;

    if (
      this.ticketSignUpInformation.objectif &&
      this.ticketSignUpInformation.personalInformation
    ) {
      this.ticketSignUpInformation.address = this.addressInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);
      this.signupService.complete();
      this.createUser(this.ticketSignUpInformation);
      this.router.navigate(['/login']);
    }
  }

  /**
   * Créer un utilisateur depuis le formulaire
   * @param ticketSignUpInformation
   * @returns void
   */
  createUser(ticketSignUpInformation: TicketSignUpModel) {
    let user = new User(
      ticketSignUpInformation.personalInformation.fname,
      ticketSignUpInformation.personalInformation.lname,
      ticketSignUpInformation.personalInformation.image,
      ticketSignUpInformation.personalInformation.email,
      ticketSignUpInformation.personalInformation.password,
      ticketSignUpInformation.personalInformation.dob,
      ticketSignUpInformation.personalInformation.phone,
      ticketSignUpInformation.address,
      ticketSignUpInformation.objectif.isClient,
      ticketSignUpInformation.objectif.isBarber,
      false
    );

    this.authUserService.createUser(user);
  }

  /**
   * Methode qui permet de retourner en arrière au click du button "Precedent"
   * @return void
   */
  prevPage() {
    this.router.navigate(['/signup/profil']);
  }

  ngOnInit(): void {
    // Pré-remplir les données du formulaire
    if (this.ticketSignUpInformation.address) {
      this.form.patchValue(this.ticketSignUpInformation.address);
    }

    // Si l'utilisateur n'a aucun objectif, on le redirige vers la page d'objectif
    // sinon si une information personnelle est manquante, on le redirige vers la page d'information personnelle
    if (
      this.ticketSignUpInformation.objectif.isClient == false &&
      this.ticketSignUpInformation.objectif.isBarber == false
    ) {
      this.router.navigate(['/signup/objectif']);
    } else if (
      this.ticketSignUpInformation.personalInformation.fname == undefined ||
      this.ticketSignUpInformation.personalInformation.lname == undefined ||
      this.ticketSignUpInformation.personalInformation.email == undefined ||
      this.ticketSignUpInformation.personalInformation.password == undefined ||
      this.ticketSignUpInformation.personalInformation.phone == undefined
    ) {
      this.router.navigate(['/signup/profil']);
    }
  }
}
