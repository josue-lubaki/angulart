import { Component, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';
import { Reservation } from '../../models/Reservation';
import { ReservationService } from '../../services/reservation.service';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  haircuts: Haircut[] = [];
  reservations: Reservation[] = [];

  isBarber?: boolean = false;
  options: any;
  overlays!: any[];

  constructor(
    private dataImService: DataImService,
    private reservationService: ReservationService,
    private authUserService: AuthUserService
  ) {
    this.options = {
      center: { lat: 46.3470097, lng: -72.5753559 },
      zoom: 14,
    };

    // dans le cas d'un client, on récupère les coiffures
    this.haircuts = this.dataImService.getHaircuts();

    if (this.authUserService.getUserConnected()) {
      this.isBarber = this.authUserService.getUserConnected().isBarber;
    }

    // dans le cas d'un coiffeur, on récupère les réservations
    this.reservations = this.reservationService
      .getReservations()
      .filter((rs) => !rs.barber);

    // Récupération des markers
    this.overlays = this.reservationService.getOverlays();
  }

  ngOnInit(): void {
    // Marker test 
    this.reservationService.addMarker(46.3470097, -72.5753559, 'test');
  }
}
