import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [HomeCardComponent],
  providers: [GoogleMapsModule],
  imports: [
    CommonModule,GoogleMapsModule
  ],
  exports: [
    HomeCardComponent
  ]
})
export class HomePageModule { }
