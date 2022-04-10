import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { TicketSignUpModel } from '../../models/TicketSignUp';
import { SignUpService } from '../../signup.service';
import { MessageService } from 'primeng/api';
import {Address} from "../../../../models/Address";
import {COMPTE} from "../../../../models/constantes/compte";
import {UserDTO} from "../../../../models/UserDTO";
import { SignUpDto } from '../../models/SignupDto';

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss'],
})
export class AdresseComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  addressInformation?: Address;
  ticketSignUpInformation: SignUpDto;
  private isUpdate = false;
  private idUser?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignUpService,
    private authUserService: AuthUserService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    console.log("Address get Ticket - onInit", this.ticketSignUpInformation);
  }


  ngOnInit(): void {
    this._initAdresseForm();

    this._checkEditMode();

    // Pré-remplir les données du formulaire
    // if (this.ticketSignUpInformation.street
    //   && this.ticketSignUpInformation.city
    //   && this.ticketSignUpInformation.zip
    //   && this.ticketSignUpInformation.state
    //   && this.ticketSignUpInformation.apartement) {
    //   // this.isUpdate = true;
    //   this.adresseForm['street'].patchValue(this.ticketSignUpInformation.street);
    //   this.adresseForm['city'].patchValue(this.ticketSignUpInformation.city);
    //   this.adresseForm['zip'].patchValue(this.ticketSignUpInformation.zip);
    //   this.adresseForm['state'].patchValue(this.ticketSignUpInformation.state);
    //   this.adresseForm['apartement'].patchValue(this.ticketSignUpInformation.apartement);
    // }
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
    console.log("After ckeck Edit Mode (role = ", this.ticketSignUpInformation.role, ")");

    // Si l'utilisateur n'a aucun objectif, on le redirige vers la page d'objectif
    // sinon si une information personnelle est manquante, on le redirige vers la page d'information personnelle
    // if (!this.ticketSignUpInformation.role) {
    //   console.log("Redirection vers la page d'objectif");
    //   this.router.navigate(['/signup/objectif']);
    // } else if (
    //   this.ticketSignUpInformation.fname == undefined ||
    //   this.ticketSignUpInformation.lname == undefined ||
    //   this.ticketSignUpInformation.email == undefined ||
    //   this.ticketSignUpInformation.password == undefined ||
    //   this.ticketSignUpInformation.phone == undefined
    // ) {
    //   console.log("Redirection vers la page profile");
    //   this.router.navigate(['/signup/profile']);
    // }
  }

  private _initAdresseForm() {
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: [
        '',
        [
          Validators.required,
          Validators.pattern(`^([A-Za-z][0-9][A-Za-z]\\s[0-9][A-Za-z][0-9]|[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9])`),
          Validators.minLength(6),
        ],
      ],
      state: ['', Validators.required],
      apartement: ['', Validators.required],
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

    console.log("Address get form", this.form.value);
    console.log("Address ticket", this.ticketSignUpInformation);

      // setter les informations du form dans PersonalInformation variable
    this.addressInformation = this.form.value as Address;

    if (
      this.ticketSignUpInformation.email &&
      this.ticketSignUpInformation.fname &&
      this.ticketSignUpInformation.lname &&
      this.ticketSignUpInformation.phone &&
      this.ticketSignUpInformation.dob &&
      this.ticketSignUpInformation.role
    ) {
    //   this.ticketSignUpInformation.address = this.addressInformation;

    this.ticketSignUpInformation.street = this.addressInformation.street;
    this.ticketSignUpInformation.city = this.addressInformation.city;
    this.ticketSignUpInformation.zip = this.addressInformation.zip;
    this.ticketSignUpInformation.state = this.addressInformation.state;
    this.ticketSignUpInformation.apartement = this.addressInformation.apartement;

    console.log("CREATE ADRESS", this.ticketSignUpInformation);

      this.signupService.setSignUpInformation(this.ticketSignUpInformation);
      this.signupService.complete();
      if (!this.isUpdate)
        this.createUser(this.ticketSignUpInformation);
      else {
        this.updateUser(this.ticketSignUpInformation);
      }
    }
  }

  /**
   * Créer un utilisateur depuis le formulaire
   * @param ticketSignUpInformation
   * @returns void
   */
  createUser(ticketSignUpInformation: SignUpDto) {
    // if (
    //   ticketSignUpInformation.personalInformation &&
    //   ticketSignUpInformation.objectif
    // ) {

    // const addressUser = {
    //   street: ticketSignUpInformation.street,
    //   city: ticketSignUpInformation.city,
    //   zip: ticketSignUpInformation.zip,
    //   state: ticketSignUpInformation.state,
    //   apartement: ticketSignUpInformation.apartement
    // }
      //
      // const user: UserDTO = {
      //   fname: ticketSignUpInformation.fname,
      //   lname: ticketSignUpInformation.lname,
      //   imageURL: ticketSignUpInformation.imageURL,
      //   email: ticketSignUpInformation.email,
      //   password: ticketSignUpInformation.password,
      //   dob: ticketSignUpInformation.dob,
      //   phone: ticketSignUpInformation.phone,
      //   address: addressUser
      // };

      // if(ticketSignUpInformation.objectif.isClient) user.role = COMPTE.CLIENT
      // else if(ticketSignUpInformation.objectif.isBarber) user.role = COMPTE.BARBER
      // else user.role = COMPTE.ADMIN

    console.log("CREATE USER", ticketSignUpInformation);

    // put all information of ticketSignUpInformation into new formData
    const formData = new FormData();
    formData.append('fname', ticketSignUpInformation.fname || '');
    formData.append('lname', ticketSignUpInformation.lname || '');
    formData.append('imageURL', ticketSignUpInformation.imageURL || '');
    formData.append('email', ticketSignUpInformation.email || '');
    formData.append('password', ticketSignUpInformation.password || '');
    formData.append('dob', ticketSignUpInformation.dob?.toDateString() || '');
    formData.append('phone', ticketSignUpInformation.phone || '');
    formData.append('street', ticketSignUpInformation.street || '');
    formData.append('city', ticketSignUpInformation.city || '');
    formData.append('zip', ticketSignUpInformation.zip || '');
    formData.append('state', ticketSignUpInformation.state || '');
    formData.append('apartement', ticketSignUpInformation.apartement || '');
    formData.append('role', ticketSignUpInformation.role || '');


    console.log("formData", formData);


      this.authUserService.createUser(formData).subscribe(user => {
        this.messageService.add({
          severity: 'success',
          summary: `Bienvenue ${user.fname}`,
          detail: 'Votre compte a été créé avec succès',
        });

        this.router.navigate(['/login']);
      });
    // }

  }

  /**
   * Fonction qui permet de retourner en arrière au click du button "Precedent"
   * @return void
   */
  prevPage() {
    // this.router.navigate(['/signup/profile']);
    if(this.isUpdate)
      this.router.navigate(['/signup/profile'],{queryParams: { update: this.idUser}});
    else
      this.router.navigate(['/signup/profile']);
  }


  private updateUser(ticketSignUpInformation: SignUpDto) {
    // if (
    //   ticketSignUpInformation.personalInformation &&
    //   ticketSignUpInformation.objectif
    // ) {
      this.authUserService.getUserConnected().subscribe((user) => {

        // put all information of ticketSignUpInformation into new formData
        const formData = new FormData();
        formData.append('id', user.id?.toString() || '');
        formData.append('fname', ticketSignUpInformation.fname || '');
        formData.append('lname', ticketSignUpInformation.lname || '');
        formData.append('imageURL', ticketSignUpInformation.imageURL || '');
        formData.append('phone', ticketSignUpInformation.phone || '');
        formData.append('street', ticketSignUpInformation.street || '');
        formData.append('city', ticketSignUpInformation.city || '');
        formData.append('zip', ticketSignUpInformation.zip || '');
        formData.append('state', ticketSignUpInformation.state || '');
        formData.append('apartement', ticketSignUpInformation.apartement || '');

        if (user.id) {
          this.authUserService.updateUser(user.id, formData).subscribe((userDTO: UserDTO) => {
            // notify other components that user has been updated
            this.authUserService.notifier(userDTO);

            // message (Toast)
            this.messageService.add({
              severity: 'success',
              summary: 'Utilisateur modifié',
              detail: 'Votre compte a été modifié avec succès',
            });

            this.router.navigate(['/profile']);
          });
        }
      });
    // }
  }

  private _checkEditMode() {
    // check if user is in edit mode
    this.route.queryParamMap.subscribe(params => {
      if(params.get("update")){
        this.isUpdate = true;
        this.idUser = params.get('update') ?? undefined;
        this.authUserService.getUserConnected().subscribe(user => {
          // this.form.patchValue(user);
          console.log("user", user);
          this.form.patchValue({
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            imageURL: user.imageURL,
            role: user.role,
            dob: user.dob,
            street: user.address?.street,
            city: user.address?.city,
            zip: user.address?.zip,
            state: user.address?.state,
            apartement: user.address?.apartement,
          });
          // this.adresseForm['fname'].setValue(user.fname);
          // this.adresseForm['lname'].setValue(user.lname);
          // this.adresseForm['email'].setValue(user.email);
          // this.adresseForm['phone'].setValue(user.phone);
          // this.adresseForm['dob'].setValue(user.dob);
          // this.adresseForm['imageURL'].setValue(user.imageURL);
          // this.adresseForm['role'].setValue(user.role);
          // this.adresseForm['street'].setValue(user.address?.street);
          // this.adresseForm['city'].setValue(user.address?.city);
          // this.adresseForm['zip'].setValue(user.address?.zip);
          // this.adresseForm['state'].setValue(user.address?.state);
          // this.adresseForm['apartement'].setValue(user.address?.apartement);
        });
      }
    })
  }
}
