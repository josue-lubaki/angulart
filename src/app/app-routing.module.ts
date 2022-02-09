import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Path of signup component
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
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

// Primeng - Module
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BarberHomePageComponent } from './pages/barber-home-page/barber-home-page.component';
import { GMapModule } from 'primeng/gmap';
import { CalendarModule } from 'primeng/calendar';
import { BarberHomePageModule } from './pages/barber-home-page/home-page.module';
import { BarberDetailsPageComponent } from './pages/barber-details-page/barber-details-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details/:id', component: DetailHaircutComponent },
  { path: 'reservations/:id', component: BarberDetailsPageComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'barber', component: BarberHomePageComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: '', redirectTo: 'objectif', pathMatch: 'full' },
      { path: 'objectif', component: ObjectifComponent },
      { path: 'profile', component: ProfilComponent },
      { path: 'address', component: AdresseComponent },
    ],
  },
  { path: 'content', component: ContentComponent },
  { path: '**', redirectTo: 'home' },
];

const primengModules = [
  StepsModule,
  ButtonModule,
  CardModule,
  ToolbarModule,
  DividerModule,
  FieldsetModule,
  AvatarModule,
  AvatarGroupModule,
  GMapModule,
  CalendarModule,
];

@NgModule({
  declarations: [
    SignupComponent,
    HomePageComponent,
    ContentComponent,
    LoginComponent,
    BarberHomePageComponent,
    BarberDetailsPageComponent,
  ],
  providers: [FormBuilder, ...primengModules],
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ...primengModules,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    SignUpModule,
    HomePageModule,
    BarberHomePageModule,
    GMapModule,
  ],
  exports: [RouterModule, ...primengModules],
})
export class AppRoutingModule {}
