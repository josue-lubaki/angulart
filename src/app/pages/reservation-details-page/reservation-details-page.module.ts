import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {StepsModule} from "primeng/steps";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {FieldsetModule} from "primeng/fieldset";
import {AvatarModule} from "primeng/avatar";
import {AvatarGroupModule} from "primeng/avatargroup";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {GMapModule} from "primeng/gmap";
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
