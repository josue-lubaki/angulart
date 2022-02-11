import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ObjectifComponent } from './pages/objectif/objectif.component';
import { ProfilComponent } from './pages/profil/profil.component';

// Primeng - Module
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

// service
import { SignUpService } from './signup.service';
import { AdresseComponent } from './pages/adresse/adresse.component';
import {SignupComponent} from "./signup.component";
import {StepsModule} from "primeng/steps";

const primengModules = [
  ButtonModule,
  CardModule,
  ToolbarModule,
  InputSwitchModule,
  PasswordModule,
  DropdownModule,
  InputTextModule,
  CalendarModule,
  StepsModule,
];

@NgModule({
  declarations: [SignupComponent, AdresseComponent, ObjectifComponent, ProfilComponent],
  providers: [FormsModule, SignUpService],
  imports: [
    ...primengModules,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [RouterModule, primengModules],
})
export class SignUpModule {}
