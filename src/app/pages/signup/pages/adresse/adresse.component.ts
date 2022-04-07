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

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss'],
})
export class AdresseComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  addressInformation?: Address;
  ticketSignUpInformation: TicketSignUpModel;
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
    this.form = this._initAdresseForm();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();

    route.queryParamMap.subscribe(params => {
      if(params.get("update")){
        this.isUpdate = true;
        this.idUser = params.get('update') ?? undefined;
        this.form = this._initAdresseFormUpdated();
      }
    })
  }

  private _initAdresseForm() {
    return this.fb.group({
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

  private _initAdresseFormUpdated() {
    return this.fb.group({
      street: [''],
      city: [''],
      zip: [''],
      state: [''],
      apartement: [''],
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
  createUser(ticketSignUpInformation: TicketSignUpModel) {
    if (
      ticketSignUpInformation.personalInformation &&
      ticketSignUpInformation.objectif
    ) {

      const user: UserDTO = {
        fname: ticketSignUpInformation.personalInformation.fname,
        lname: ticketSignUpInformation.personalInformation.lname,
        imageURL: ticketSignUpInformation.personalInformation.imageURL,
        email: ticketSignUpInformation.personalInformation.email,
        password: ticketSignUpInformation.personalInformation.password,
        dob: ticketSignUpInformation.personalInformation.dob,
        phone: ticketSignUpInformation.personalInformation.phone,
        address: ticketSignUpInformation.address
      };

      if(ticketSignUpInformation.objectif.isClient) user.role = COMPTE.CLIENT
      else if(ticketSignUpInformation.objectif.isBarber) user.role = COMPTE.BARBER
      else user.role = COMPTE.ADMIN

      this.authUserService.createUser(user).subscribe(user => {
        this.messageService.add({
          severity: 'success',
          summary: `Bienvenue <b>${user.fname}</b>`,
          detail: 'Votre compte a été créé avec succès',
        });

        this.router.navigate(['/login']);
      });
    }

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

  ngOnInit(): void {
    // Pré-remplir les données du formulaire
    if (this.ticketSignUpInformation.address) {
      // this.isUpdate = true;
      this.form.patchValue(this.ticketSignUpInformation.address);
    }

    // Si l'utilisateur n'a aucun objectif, on le redirige vers la page d'objectif
    // sinon si une information personnelle est manquante, on le redirige vers la page d'information personnelle
    if (
      this.ticketSignUpInformation.objectif?.isClient == false &&
      this.ticketSignUpInformation.objectif?.isBarber == false
    ) {
      this.router.navigate(['/signup/objectif']);
    } else if (
      this.ticketSignUpInformation.personalInformation?.fname == undefined ||
      this.ticketSignUpInformation.personalInformation?.lname == undefined ||
      this.ticketSignUpInformation.personalInformation?.email == undefined ||
      this.ticketSignUpInformation.personalInformation?.password == undefined ||
      this.ticketSignUpInformation.personalInformation?.phone == undefined
    ) {
      this.router.navigate(['/signup/profile']);
    }
  }

  private updateUser(ticketSignUpInformation: TicketSignUpModel) {
    if (
      ticketSignUpInformation.personalInformation &&
      ticketSignUpInformation.objectif
    ) {
      this.authUserService.getUserConnected().subscribe((user) => {
        const newUser: UserDTO = {
          // type User
          id: user.id,
          fname: ticketSignUpInformation.personalInformation.fname,
          lname: ticketSignUpInformation.personalInformation.lname,
          imageURL: ticketSignUpInformation.personalInformation.imageURL,
          email: ticketSignUpInformation.personalInformation.email,
          password: ticketSignUpInformation.personalInformation.password,
          dob: ticketSignUpInformation.personalInformation.dob,
          phone: ticketSignUpInformation.personalInformation.phone,
          address: ticketSignUpInformation.address,
          role: user.role,
          created : user.created
        };

        // copy newUser into formGroup
        this.form.patchValue(newUser);

        // remove imageURL
        delete newUser.imageURL;

        if (user.id) {
          this.authUserService.updateUser(user.id, newUser).subscribe(() => {
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
    }
  }
}
