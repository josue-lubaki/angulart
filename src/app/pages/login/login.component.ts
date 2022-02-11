import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { loginModel } from './models/loginModel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isDisabled = false;
  submitted: boolean;

  constructor(
    private authUserService: AuthUserService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
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
      email: [
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

    this.isDisabled = true;
    const user: loginModel = this.form.value;

    if (this.authUserService.login(user)) {
      this.messageService.add({
        severity: 'success',
        summary: 'Login',
        detail: `Bienvenue`,
      });
      this.router.navigate(['/']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Login',
        detail: 'Email ou mot de passe incorrect',
      });
      this.isDisabled = false;
    }
  }
}
