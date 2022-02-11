import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberCardComponent } from './barber-card/barber-card.component';
import { ButtonModule } from 'primeng/button';
import {BarberHomePageComponent} from "./barber-home-page.component";

const primeng = [
  ButtonModule
];

@NgModule({
  providers: [],
  declarations: [BarberHomePageComponent, BarberCardComponent],
  imports: [CommonModule, ...primeng],
  exports: [BarberCardComponent],
})
export class BarberHomePageModule {}
