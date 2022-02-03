import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Path of signup component
import { ObjectifComponent } from './signup/objectif/objectif.component';
import { ProfilComponent } from './signup/profil/profil.component';
import { AdresseComponent } from './signup/adresse/adresse.component';

// Primeng - Module
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { SignUpModule } from './signup/signup.module';

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

const primengModules = [StepsModule, ButtonModule, CardModule, ToolbarModule];

@NgModule({
  declarations: [
    SignupComponent,
    HomePageComponent,
    ContentComponent,
    LoginComponent,
  ],
  providers: [FormBuilder],
  imports: [RouterModule.forRoot(routes), ...primengModules, SignUpModule],
  exports: [RouterModule, ...primengModules],
})
export class AppRoutingModule {}
