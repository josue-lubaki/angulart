import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const primengModules = [
  ButtonModule,
  PasswordModule,
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ...primengModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class LoginModule { }
