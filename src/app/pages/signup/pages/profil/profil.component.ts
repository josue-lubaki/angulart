import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../signup.service';
import {
  ObjectifModel,
  PersonalInformationModel,
  TicketSignUpModel,
} from '../../models/TicketSignUp';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Subject, takeUntil } from 'rxjs';
import { Address } from '../../../../models/Address';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  form: FormGroup;
  profilInformation: PersonalInformationModel;
  submitted = false;
  ticketSignUpInformation: TicketSignUpModel;
  imageDisplay: string | ArrayBuffer | null | undefined;
  endSubs$: Subject<any> = new Subject();
  value: Date;
  private isUpdated = false;
  private idUser?: string;

  constructor(
    private router: Router,
    private signupService: SignUpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authUserService: AuthUserService
  ) {
    this.form = this._initUserForm();
    this.profilInformation = new PersonalInformationModel();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    this.value = new Date();
  }

  ngOnInit() {
    // Vérifier si le queryParams contient 'update'
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('update')) {
        this.isUpdated = true;
        this.idUser = params.get('update') ?? undefined;
        // get information of user current
        this.authUserService
          .getUserConnected()
          .pipe(takeUntil(this.endSubs$))
          .subscribe((user) => {
          // pré-remplir le profilInformation, objectif et adresse
          const obj = new ObjectifModel();
          if (user.isClient) obj.isClient = user.isClient;
          else if (user.isBarber) obj.isBarber = user.isBarber;

          const personnal = new PersonalInformationModel(
            user.fname,
            user.lname,
            user.imageURL,
            user.email,
            user.password,
            user.dob,
            user.phone
          );

          const adresse = new Address(
            user.address?.street,
            user.address?.apartment,
            user.address?.zip,
            user.address?.city,
            user.address?.state
          );

          this.ticketSignUpInformation.objectif = obj;
          this.ticketSignUpInformation.address = adresse;
          this.ticketSignUpInformation.personalInformation = personnal;
          this.signupService.setSignUpInformation(this.ticketSignUpInformation)
          this.form.patchValue(
            this.ticketSignUpInformation.personalInformation
          );
          if(personnal.dob)
            this.value = personnal.dob
        });
      } else {
        // Pré-remplir les données du formulaire
        if (this.ticketSignUpInformation.personalInformation) {
          this.form.patchValue(
            this.ticketSignUpInformation.personalInformation
          );

          if (this.ticketSignUpInformation.personalInformation.dob)
            this.value = this.ticketSignUpInformation.personalInformation.dob;
        }

        // Si l'utilisateur n'a aucun objectif, on le redirige vers la page d'objectif
        if (
          !this.ticketSignUpInformation.objectif.isClient &&
          !this.ticketSignUpInformation.objectif.isBarber
        ) {
          this.router.navigate(['/signup/objectif']);
        }
      }
    });
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
    this.profilInformation.dob = this.value;
    this.ticketSignUpInformation.personalInformation = this.profilInformation;

    if (
      this.ticketSignUpInformation.objectif &&
      this.ticketSignUpInformation.personalInformation
    ) {
      this.ticketSignUpInformation.personalInformation = this.profilInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);

      if(this.isUpdated)
        this.router.navigate(['/signup/address'], {queryParams: { update: this.idUser}});
      else
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
}
