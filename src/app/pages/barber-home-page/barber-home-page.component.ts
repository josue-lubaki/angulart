import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-barber-home-page',
  templateUrl: './barber-home-page.component.html',
  styleUrls: ['./barber-home-page.component.scss']
})
export class BarberHomePageComponent implements OnInit {
  reservations: Reservation []=[];

  constructor(private reservationService: ReservationService){
    this.reservations = this.reservationService.reservations;
  }

  ngOnInit() {
    // ngOnInit Method
  }

}
