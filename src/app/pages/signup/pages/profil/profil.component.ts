import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../signup.service';

import { AuthUserService } from 'src/app/services/auth-user.service';
import { Subject, takeUntil } from 'rxjs';
import { UserDTO } from 'src/app/models/UserDTO';
import {SignUpDto} from "../../models/SignupDto";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  ticketSignUpInformation: SignUpDto;
  imageDisplay: string | ArrayBuffer | null | undefined;
  endSubs$: Subject<any> = new Subject();
  value: Date;
  editMode = false;
  private idUser?: string;
  private role?: string;

  constructor(
    private router: Router,
    private signupService: SignUpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authUserService: AuthUserService,
  ) {

    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
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
            this.role = user.role;
            this.imageDisplay = user.imageURL;
            // pre-remplir les champs du formulaire
            this.form.patchValue({
              fname: user.fname,
              lname: user.lname,
              email: user.email,
              phone: user.phone,
              imageURL: user.imageURL,
              password: user.password,
              role: user.role,
              dob: user.dob,
              street: user.address?.street,
              city: user.address?.city,
              zip: user.address?.zip,
              state: user.address?.state,
              apartment: user.address?.apartment,
            });

            this.ticketSignUpInformation = this.form.value;

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
      imageURL: ['', Validators.required],
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
    this.ticketSignUpInformation.dob = this.value;
    this.ticketSignUpInformation.street = this.form.value.street;
    this.ticketSignUpInformation.apartment = this.form.value.apartment;
    this.ticketSignUpInformation.zip = this.form.value.zip;
    this.ticketSignUpInformation.city = this.form.value.city;
    this.ticketSignUpInformation.state = this.form.value.state;
    this.ticketSignUpInformation.password = this.form.value.password;
    this.ticketSignUpInformation.imageURL = this.form.value.imageURL;

    this.signupService.setSignUpInformation(this.ticketSignUpInformation);

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
   * @param event le fichier image à upload
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
        apartment: this.ticketSignUpInformation.apartment,
        zip: this.ticketSignUpInformation.zip,
        city: this.ticketSignUpInformation.city,
        state: this.ticketSignUpInformation.state,
        password: this.ticketSignUpInformation.password,
      });
    }
  }
}
