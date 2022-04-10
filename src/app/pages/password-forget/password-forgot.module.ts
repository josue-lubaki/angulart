import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {PasswordForgotComponent} from "./password-forgot.component";
import {RouterModule} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const primengModules = [
  ButtonModule,
  InputTextModule
];

@NgModule({
  declarations: [PasswordForgotComponent],
  imports: [
    CommonModule,
    ...primengModules,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [PasswordForgotComponent]
})
export class PasswordForgotModule { }
