import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../signup.service';
import {
  PersonalInformationModel,
  TicketSignUpModel,
} from '../../models/TicketSignUp';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  form: FormGroup;
  profilInformation: PersonalInformationModel;
  submitted: boolean = false;
  ticketSignUpInformation: TicketSignUpModel;

  constructor(
    private router: Router,
    private signupService: SignUpService,
    private fb: FormBuilder
  ) {
    this.form = this._initUserForm();
    this.profilInformation = new PersonalInformationModel();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
  }

  ngOnInit() {
    // Pré-remplir les données du formulaire
    if (this.ticketSignUpInformation.personalInformation) {
      this.form.patchValue(this.ticketSignUpInformation.personalInformation);
    }

    // Si l'utilisateur n'a aucun objectif, on le redirige vers la page d'objectif
    if (
      this.ticketSignUpInformation.objectif.isClient == false &&
      this.ticketSignUpInformation.objectif.isBarber == false
    ) {
      this.router.navigate(['/signup/objectif']);
    }
  }

  /**
   * Methode qui permet d'initialiser les contenus du formulaire dont on a besoin
   * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
   * @return FormGroup
   */
  private _initUserForm() {
    return this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      imageURL: [''],
      dob: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
    });
  }

  /**
   * Getter du formulaire
   * @returns FormGroup
   */
  get userForm() {
    return this.form.controls;
  }

  nextPage() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // setter les informations du form dans PersonalInformation variable
    this.profilInformation = this.form.value as PersonalInformationModel;

    if (
      this.ticketSignUpInformation.objectif &&
      this.ticketSignUpInformation.personalInformation
    ) {
      this.ticketSignUpInformation.personalInformation = this.profilInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);
      console.log(
        'this.signupService.signupInformation - APE',
        this.signupService.signupInformation
      );
      this.router.navigate(['/signup/address']);
    }
  }

  /**
   * Methode qui permet de retourner en arrière au click du button "Precedent"
   * @return void
   */
  prevPage() {
    this.router.navigate(['/signup/objectif']);
  }
}
