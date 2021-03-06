import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {loginModel} from "./models/loginModel";
import {UserDTO} from "../../models/UserDTO";
import {LoginResponse} from "./models/LoginResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isDisabled = false;
  submitted: boolean;
  location$: any;
  locationSubscription: any;

  constructor(
    private authUserService: AuthUserService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ) {
    this.submitted = false;
    this.form = this._initLoginForm();
  }

  ngOnInit(): void {
    this.form = this._initLoginForm();
  }

  /**
   * Method to initialize the login formulaire and add validators
   * @returns void
   */
  private _initLoginForm() {
    return this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Getter du formulaire
   * @returns FormGroup
   */
  get loginForm() {
    return this.form.controls;
  }

  /**
   * Method to submit information to the server and check if the user is valid
   * if the user is valid, the user is logged in and the user is redirected to the home page
   * @returns void
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    // verifier si la connexion internet est disponible
    if (!window.navigator.onLine) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'V??rifier votre connexion internet',
      });
      this.isDisabled = false;
    }

    this.isDisabled = true;
    const user: loginModel = {
      username: this.form.value.username,
      password: this.form.value.password,
    };
    this.authUserService.login(user).subscribe((response : LoginResponse) => {

      // si mauvais identifiant
      if (response.email !== user.username || response.status == 'error') {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Identifiant ou mot de passe incorrect',
        });
        this.isDisabled = false;
        return;
      }

      // Verifier si la response contient "email" et "token"
      if(response.email === user.username && response.token) {
        // save to LocalStorage
        this.localStorage.setToken(response.token)
        this.localStorage.setUserCurrent(response.id)
        this.localStorage.setVariable("email", response.email)

        this.authUserService.getUserById(response.id).subscribe((user : UserDTO) => {

          // notifie les autres composants
          this.authUserService.notifier(user);

          this.authUserService.getUserConnected().subscribe(userConnected => {
              if(userConnected){
                this.messageService.add({
                  severity: 'success',
                  summary: 'Login',
                  detail: `Bienvenue`,
                });
                this.router.navigate(['/']);
              }
              else{
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Login',
                  detail: 'Email ou mot de passe incorrect',
                });
                this.isDisabled = false;
              }
            }
          )
        })
      }
    })
  }

  /**
   * Methode qui permet de consuire l'utilisateur vers la page signup
   * */
  goToLogin() {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
