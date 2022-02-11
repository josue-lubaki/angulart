import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { GoogleMapsModule } from '@angular/google-maps'
import {HomePageComponent} from "./home-page.component";
import {ButtonModule} from "primeng/button";
import {GMapModule} from "primeng/gmap";
import {ToastModule} from "primeng/toast";

const primengModules = [
  ButtonModule,
  GMapModule,
  ToastModule,
];

@NgModule({
  declarations: [HomePageComponent, HomeCardComponent],
  providers: [GoogleMapsModule],
  imports: [
    CommonModule,
    GoogleMapsModule,
    ...primengModules
  ],
  exports: []
})
export class HomePageModule { }
