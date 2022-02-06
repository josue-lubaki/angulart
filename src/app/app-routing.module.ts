import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Path of signup component
// Primeng - Module
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { AdresseComponent } from './pages/signup/pages/adresse/adresse.component';
import { ObjectifComponent } from './pages/signup/pages/objectif/objectif.component';
import { ProfilComponent } from './pages/signup/pages/profil/profil.component';
import { ContentComponent } from './pages/content/content.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageModule } from './pages/home-page/home-page.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SignUpModule } from './pages/signup/signup.module';
import { DetailHaircutComponent } from './pages/detail-haircut/detail-haircut.component';
import { MyReservationComponent } from './pages/my-reservation/my-reservation.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details/:id', component: DetailHaircutComponent },
  { path: 'reservations', component: MyReservationComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: '', redirectTo: 'objectif', pathMatch: 'full' },
      { path: 'objectif', component: ObjectifComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'address', component: AdresseComponent },
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
  providers: [FormBuilder, ...primengModules],
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ...primengModules,
    ReactiveFormsModule,
    CommonModule,
    SignUpModule,
    HomePageModule,
  ],
  exports: [RouterModule, ...primengModules],
})
export class AppRoutingModule {}
