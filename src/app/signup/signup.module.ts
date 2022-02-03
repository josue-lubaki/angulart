import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdresseComponent } from './adresse/adresse.component';
import { ObjectifComponent } from './objectif/objectif.component';
import { ProfilComponent } from './profil/profil.component';

// Primeng - Module
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

// service
import { SignUpService } from './signup.service';

const primengModules = [ButtonModule, CardModule, ToolbarModule];

const routes: Routes = [
  { path: 'profil', component: ProfilComponent },
  { path: 'adresse', component: AdresseComponent },
  { path: 'objectif', component: ObjectifComponent },
];

@NgModule({
  declarations: [AdresseComponent, ObjectifComponent, ProfilComponent],
  providers: [FormBuilder, SignUpService],
  imports: [RouterModule.forChild(routes), ...primengModules],
  exports: [RouterModule, primengModules],
})
export class SignUpModule {}
