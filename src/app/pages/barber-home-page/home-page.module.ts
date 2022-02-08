import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberCardComponent } from './barber-card/barber-card.component';
import { ButtonModule } from 'primeng/button';

const primeng = [ButtonModule];

@NgModule({
  declarations: [BarberCardComponent],
  imports: [CommonModule, ...primeng],
  exports: [BarberCardComponent],
})
export class BarberHomePageModule {}
