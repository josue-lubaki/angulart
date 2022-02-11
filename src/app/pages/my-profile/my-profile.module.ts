import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyProfileComponent} from "./my-profile.component";
import {StepsModule} from "primeng/steps";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {AvatarModule} from "primeng/avatar";
import {AvatarGroupModule} from "primeng/avatargroup";
import {GMapModule} from "primeng/gmap";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {AgePipe} from "../../age.pipe";

const primengModules = [
  ButtonModule,
  DividerModule,
  FieldsetModule,
  AvatarModule,
];

@NgModule({
  declarations: [MyProfileComponent, AgePipe],
  imports: [
    CommonModule,
    ...primengModules
  ]
})
export class MyProfileModule { }
