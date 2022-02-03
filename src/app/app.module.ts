import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ObjectifComponent } from './signup/objectif/objectif.component';
import { ProfilComponent } from './signup/profil/profil.component';
import { AdresseComponent } from './signup/adresse/adresse.component';
import { SignUpService } from './signup/signup.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    ObjectifComponent,
    ProfilComponent,
    AdresseComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [SignUpService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
