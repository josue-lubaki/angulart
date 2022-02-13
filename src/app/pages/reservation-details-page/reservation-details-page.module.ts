import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {ReservationDetailsPageComponent} from "./reservation-details-page.component";
import {RippleModule} from "primeng/ripple";


const primengModules = [
  ButtonModule,RippleModule
];

@NgModule({
  declarations: [ReservationDetailsPageComponent],
    imports: [
        CommonModule,
        ...primengModules,
    ]
})
export class ReservationDetailsPageModule { }
