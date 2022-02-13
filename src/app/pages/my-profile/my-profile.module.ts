import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyProfileComponent} from "./my-profile.component";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {AvatarModule} from "primeng/avatar";
import {AgePipe} from "../../age.pipe";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

const primengModules = [
  ButtonModule,
  DividerModule,
  FieldsetModule,
  AvatarModule,
  ConfirmDialogModule
];

@NgModule({
  declarations: [MyProfileComponent, AgePipe],
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    ...primengModules
  ]
})
export class MyProfileModule { }
