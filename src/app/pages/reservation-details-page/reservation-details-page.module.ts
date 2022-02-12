import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {ReservationDetailsPageComponent} from "./reservation-details-page.component";


const primengModules = [
  ButtonModule,
];

@NgModule({
  declarations: [ReservationDetailsPageComponent],
  imports: [
    CommonModule,
    ...primengModules
  ]
})
export class ReservationDetailsPageModule { }
