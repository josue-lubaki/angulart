import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import {MyReservationComponent} from "./my-reservation/my-reservation.component";
import {DetailReservationComponent} from "./detail-reservation/detail-reservation.component";
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, NavigationComponent, MyReservationComponent, DetailReservationComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
