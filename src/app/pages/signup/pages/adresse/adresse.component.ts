import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/Address';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { TicketSignUpModel } from '../../models/TicketSignUp';
import { SignUpService } from '../../signup.service';
import { User } from '../../../../models/User';
import { MessageService } from 'primeng/api';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignUpService,
    private authUserService: AuthUserService,
    private messageService: MessageService
  ) {
    this.form = this._initAdresseForm();
    this.ticketSignUpInformation = this.signupService.getSignUpInformation();
  }

  private _initAdresseForm() {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: [
        '',
        [
          Validators.required,
          Validators.pattern(`^[A-Za-z][0-9][A-Za-z]\\s[0-9][A-Za-z][0-9]`),
          Validators.minLength(6),
        ],
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
      console.log("Address ecrit", this.addressInformation)
      console.log("update", this.isUpdate)

    if (
      this.ticketSignUpInformation.objectif &&
      this.ticketSignUpInformation.personalInformation
    ) {
      this.ticketSignUpInformation.address = this.addressInformation;
      this.signupService.setSignUpInformation(this.ticketSignUpInformation);
      this.signupService.complete();
      if (!this.isUpdate)
        this.createUser(this.ticketSignUpInformation);
      else
        this.updateUser(this.ticketSignUpInformation);
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
      const user: User = {
        fname: ticketSignUpInformation.personalInformation.fname,
        lname: ticketSignUpInformation.personalInformation.lname,
        imageURL: ticketSignUpInformation.personalInformation.image,
        email: ticketSignUpInformation.personalInformation.email,
        password: ticketSignUpInformation.personalInformation.password,
        dob: ticketSignUpInformation.personalInformation.dob,
        phone: ticketSignUpInformation.personalInformation.phone,
        address: ticketSignUpInformation.address,
        isClient: ticketSignUpInformation.objectif.isClient,
        isBarber: ticketSignUpInformation.objectif.isBarber,
        isAdmin: false,
      };
      this.authUserService.createUser(user);

      this.messageService.add({
        severity: 'success',
        summary: 'Utilisateur créé',
        detail: 'Votre compte a été créé avec succès',
      });

      this.router.navigate(['/login']);
    }
  }

  /**
   * Fonction qui permet de retourner en arrière au click du button "Precedent"
   * @return void
   */
  prevPage() {
    this.router.navigate(['/signup/profile']);
  }

  ngOnInit(): void {
    // Pré-remplir les données du formulaire
    if (this.ticketSignUpInformation.address) {
      this.isUpdate = true;
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
        const newUser: User = {
          // type User
          id: user.id,
          fname: ticketSignUpInformation.personalInformation.fname,
          lname: ticketSignUpInformation.personalInformation.lname,
          imageURL: ticketSignUpInformation.personalInformation.image,
          email: ticketSignUpInformation.personalInformation.email,
          password: ticketSignUpInformation.personalInformation.password,
          dob: ticketSignUpInformation.personalInformation.dob,
          phone: ticketSignUpInformation.personalInformation.phone,
          address: ticketSignUpInformation.address,
          isClient: ticketSignUpInformation.objectif.isClient,
          isBarber: ticketSignUpInformation.objectif.isBarber,
          isAdmin: false,
        };

        if (user.id) {
          this.authUserService.updateUser(user.id, newUser).subscribe(() => {
            this.router.navigate(['/profile']);
          });
        }

        // message (Toast)
        this.messageService.add({
          severity: 'success',
          summary: 'Utilisateur modifié',
          detail: 'Votre compte a été modifié avec succès',
        });
      });
    }
  }
}
