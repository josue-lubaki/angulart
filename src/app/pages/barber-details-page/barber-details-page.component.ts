import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-barber-details-page',
  templateUrl: './barber-details-page.component.html',
  styleUrls: ['./barber-details-page.component.scss'],
})
export class BarberDetailsPageComponent implements OnInit {
  reservation?: Reservation;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {
    this.route.params.subscribe((params) => {
      const idReservation: string = params['id'];

      if (idReservation) {
        this.reservation =
          this.reservationService.getReservation(idReservation);
      }
    });
  }

  ngOnInit(): void {}
}
