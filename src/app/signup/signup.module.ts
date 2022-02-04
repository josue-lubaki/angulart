import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdresseComponent } from './pages/adresse/adresse.component';
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

// service
import { SignUpService } from './signup.service';

const primengModules = [
  ButtonModule,
  CardModule,
  ToolbarModule,
  InputSwitchModule,
  PasswordModule,
  DropdownModule,
  InputTextModule,
];

const routes: Routes = [
  { path: '', redirectTo: 'objectif', pathMatch: 'full' },
  { path: 'objectif', component: ObjectifComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'address', component: AdresseComponent },
];

@NgModule({
  declarations: [AdresseComponent, ObjectifComponent, ProfilComponent],
  providers: [FormsModule, SignUpService],
  imports: [
    RouterModule.forChild(routes),
    ...primengModules,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [RouterModule, primengModules],
})
export class SignUpModule {}
