import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: 'objectif', component: ObjectifComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'adresse', component: AdresseComponent },
    ],
  },
  { path: 'content', component: ContentComponent },
  { path: '**', redirectTo: 'home' },
];

// Primeng - Module
import { StepsModule } from 'primeng/steps';
import { ObjectifComponent } from './signup/objectif/objectif.component';
import { ProfilComponent } from './signup/profil/profil.component';
import { AdresseComponent } from './signup/adresse/adresse.component';

const primengModules = [StepsModule];

@NgModule({
  declarations: [
    SignupComponent,
    HomePageComponent,
    ContentComponent,
    LoginComponent,
  ],
  providers: [FormBuilder],
  imports: [RouterModule.forRoot(routes), primengModules],
  exports: [RouterModule],
})
export class AppRoutingModule {}
