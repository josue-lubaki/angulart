import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  imageDisplay: string | ArrayBuffer | null | undefined;

  value: Date;

  constructor(
    private router: Router,
    private signupService: SignUpService,
    private fb: FormBuilder
  ) {
    this.form = this._initUserForm();
    this.profilInformation = new PersonalInformationModel();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    this.value = new Date();
  }

  ngOnInit() {
    // Pré-remplir les données du formulaire
    if (this.ticketSignUpInformation.personalInformation) {
      this.form.patchValue(this.ticketSignUpInformation.personalInformation);
    }

    // Si l'utilisateur n'a aucun objectif, on le redirige vers la page d'objectif
    if (
      !this.ticketSignUpInformation.objectif.isClient &&
      !this.ticketSignUpInformation.objectif.isBarber
    ) {
      this.router.navigate(['/signup/objectif']);
    }
  }

  /**
   * Fonction qui permet d'initialiser les contenus du formulaire dont on a besoin
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
      image: [''],
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
   * Fonction qui permet de retourner en arrière au click du button "Precedent"
   * @return void
   */
  prevPage() {
    this.router.navigate(['/signup/objectif']);
  }

  /**
   * Fonction qui pemet de uploader une image
   * @method patchValue() ajouter un champ une valeur dans un FormGroup
   * @method updateValueAndValidity notifie s'il y a eu changement dans le formulaire
   * @param event : le fichier image à upload
   */
  onImageUpdload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      console.log('this.form.value', this.form.value);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
        console.log('this.imageDisplay', this.imageDisplay);
      };
    }
  }
}
