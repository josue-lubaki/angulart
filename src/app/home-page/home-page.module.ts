import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HaircutCardComponent } from './haircut-card/haircut-card.component';



@NgModule({
  declarations: [HaircutCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HaircutCardComponent
  ]
})
export class HomePageModule { }
