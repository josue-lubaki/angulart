import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // variables
  form: FormGroup;
  isSubmitted: boolean;
  items: MenuItem[];

  activeIndex = 0;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    this.isSubmitted = false;
    this.items = [];
    this.form = this._initFormulaire();
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Objectif',
        routerLink: 'objectif',
        command: () => {
          this.activeIndex = 0;
        },
      },
      {
        label: 'Profil',
        routerLink: 'profil',
        command: () => {
          this.activeIndex = 1;
        },
      },
      {
        label: 'Adresse',
        routerLink: 'address',
        command: () => {
          this.activeIndex = 2;
        },
      },
    ];
  }

  /**
   * Initializes the form with the default values
   * @returns FormGroup
   */
  private _initFormulaire() {
    return (this.form = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
      imageURL: ['./assets/user.png', Validators.required],
      dob: ['', Validators.required],
      address: this.formBuilder.group({
        // nested form group (address)
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        apartment: [''],
      }),
    }));
  }

  /**
   * getter for the form
   * @returns FormGroup
   */
  get signupForm() {
    return this.form;
  }

  /**
   * Method to callback the user to the previous page
   * @returns void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method to Submit the form and save the user
   * @returns void
   */
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
  }

  ngOnDestroy() {

  }
}
