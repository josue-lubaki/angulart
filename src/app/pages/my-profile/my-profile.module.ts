import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyProfileComponent} from "./my-profile.component";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {AvatarModule} from "primeng/avatar";
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
