import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';



@NgModule({
  declarations: [HomeCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HomeCardComponent
  ]
})
export class HomePageModule { }
