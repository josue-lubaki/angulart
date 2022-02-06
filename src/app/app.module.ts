import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailReservationComponent } from './pages/detail-reservation/detail-reservation.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MyReservationComponent } from './pages/my-reservation/my-reservation.component';
import { NavigationComponent } from './pages/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    MyReservationComponent,
    DetailReservationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
