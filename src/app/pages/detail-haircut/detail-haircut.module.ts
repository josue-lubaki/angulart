import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {DetailHaircutComponent} from "./detail-haircut.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

const primengModules = [
  ButtonModule,
  CardModule,
  CalendarModule,
  ToastModule,
  ConfirmDialogModule
];

@NgModule({
  declarations: [DetailHaircutComponent],
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    ...primengModules,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DetailHaircutModule { }
