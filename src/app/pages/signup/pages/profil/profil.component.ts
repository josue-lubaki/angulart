import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../signup.service';

import {
  ObjectifModel,
  PersonalInformationModel,
  TicketSignUpModel
} from '../../models/TicketSignUp';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Subject, takeUntil } from 'rxjs';
import {Address} from "../../../../models/Address";
import {COMPTE} from "../../../../models/constantes/compte";
import { UserDTO } from 'src/app/models/UserDTO';
import {SignUpDto} from "../../models/SignupDto";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  // profilInformation: PersonalInformationModel;
  submitted = false;
  ticketSignUpInformation: SignUpDto;
  imageDisplay: string | ArrayBuffer | null | undefined;
  endSubs$: Subject<any> = new Subject();
  value: Date;
  editMode = false;
  private idUser?: string;
  private readonly role?: string;

  constructor(
    private router: Router,
    private signupService: SignUpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authUserService: AuthUserService,
  ) {

    //this.profilInformation = new PersonalInformationModel();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    console.log("OnInt Profil, get role", this.ticketSignUpInformation.role);
    this.role = this.ticketSignUpInformation.role;
    this.value = new Date();
  }

  ngOnInit() {
    // init form
    this._initUserForm();

    // edit Form when update
    this._checkUpdateMode();

    // initialisation des champs du formulaire avec les données du ticket
    this._initFormFields();
  }


  private _checkUpdateMode(){
    // if user want update information
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('update')) {
        this.editMode = true;
        this.idUser = params.get('update') ?? undefined;

        // set old data
        this.authUserService
          .getUserConnected()
          .pipe(takeUntil(this.endSubs$))
          .subscribe((user:UserDTO) => {
            // pre-remplir role client
            this.userForm['role'].setValue(user.role);
            this.userForm['email'].setValue(user.email);
            this.userForm['phone'].setValue(user.phone);
            this.userForm['fname'].setValue(user.fname);
            this.userForm['lname'].setValue(user.lname);
            this.userForm['imageURL'].setValue(user.imageURL);
            this.imageDisplay = user.imageURL;
            this.userForm['dob'].setValue(user.dob);
            this.userForm['street'].setValue(user.address?.street);
            this.userForm['apartement'].setValue(user.address?.apartement);
            this.userForm['zip'].setValue(user.address?.zip);
            this.userForm['city'].setValue(user.address?.city);
            this.userForm['state'].setValue(user.address?.state);

            // change Validator
            this.userForm['street'].setValidators([]);
            this.userForm['apartement'].setValidators([]);
            this.userForm['zip'].setValidators([]);
            this.userForm['city'].setValidators([]);
            this.userForm['state'].setValidators([]);
            this.userForm['password'].setValidators([]);

            // update form value Validation
            this.userForm['password'].updateValueAndValidity();
            this.userForm['street'].updateValueAndValidity();
            this.userForm['apartement'].updateValueAndValidity();
            this.userForm['zip'].updateValueAndValidity();
            this.userForm['city'].updateValueAndValidity();
            this.userForm['state'].updateValueAndValidity();

            this.ticketSignUpInformation = this.userForm;

            // set ticketSignUpInformation to service
            this.signupService.setSignUpInformation(this.ticketSignUpInformation);
          })
      }
    })
  }

  /**
   * Fonction qui permet d'initialiser les contenus du formulaire dont on a besoin
   * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
   * @return FormGroup
   */
  private _initUserForm() {
    this.form = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.minLength(8)]],
      imageURL: [''],
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

    // set all information on ticketSignUpInformation
    this.ticketSignUpInformation.role = this.role;
    this.ticketSignUpInformation.email = this.form.value.email;
    this.ticketSignUpInformation.phone = this.form.value.phone;
    this.ticketSignUpInformation.fname = this.form.value.fname;
    this.ticketSignUpInformation.lname = this.form.value.lname;
    this.ticketSignUpInformation.imageURL = this.form.value.imageURL;
    this.ticketSignUpInformation.dob = this.value;
    this.ticketSignUpInformation.street = this.form.value.street;
    this.ticketSignUpInformation.apartement = this.form.value.apartement;
    this.ticketSignUpInformation.zip = this.form.value.zip;
    this.ticketSignUpInformation.city = this.form.value.city;
    this.ticketSignUpInformation.state = this.form.value.state;
    this.ticketSignUpInformation.password = this.form.value.password;


    console.log("This.ticket", this.ticketSignUpInformation);

    // setter les informations du form dans PersonalInformation variable
    // this.profilInformation = this.form.value as PersonalInformationModel;
    // this.profilInformation.dob = this.value;
    // this.ticketSignUpInformation.personalInformation = this.profilInformation;

    // if (
    //   this.ticketSignUpInformation.objectif &&
    //   this.ticketSignUpInformation.personalInformation
    // ) {
    //   this.ticketSignUpInformation.personalInformation = this.profilInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);

    console.log("NEXT PROFIL", this.ticketSignUpInformation);

      if(this.editMode)
        this.router.navigate(['/signup/address'], {queryParams: { update: this.idUser}});
      else
        this.router.navigate(['/signup/address']);
    // }
  }

  /**
   * Fonction qui permet de retourner en arrière au click du button "Precedent"
   * @return void
   */
  prevPage() {
    if(this.editMode)
      this.router.navigate(['/profile']);
    else
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
      this.form.patchValue({ imageURL: file });
      this.form.get('imageURL')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      };
    }
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null)
    this.endSubs$.complete()
  }

  private _initFormFields() {
    if(this.ticketSignUpInformation){
      this.form.patchValue({
        fname: this.ticketSignUpInformation.fname,
        lname: this.ticketSignUpInformation.lname,
        email: this.ticketSignUpInformation.email,
        phone: this.ticketSignUpInformation.phone,
        imageURL: this.ticketSignUpInformation.imageURL,
        street: this.ticketSignUpInformation.street,
        apartement: this.ticketSignUpInformation.apartement,
        zip: this.ticketSignUpInformation.zip,
        city: this.ticketSignUpInformation.city,
        state: this.ticketSignUpInformation.state,
        password: this.ticketSignUpInformation.password,
      });
    }
  }
}
