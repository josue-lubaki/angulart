import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {AvatarGroupModule} from "primeng/avatargroup";
import {ToastModule} from "primeng/toast";
import {NavigationComponent} from "./navigation.component";
import {RouterModule} from "@angular/router";

const primengModules = [
  ButtonModule,
  CardModule,
  AvatarModule,
  AvatarGroupModule,
  ToastModule,
];

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    ...primengModules,
    RouterModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
