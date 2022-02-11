import { Component, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';
import {Reservation} from "../../models/Reservation";
import {ReservationService} from "../../services/reservation.service";
import {AuthUserService} from "../../services/auth-user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  haircuts: Haircut[] = [];
  reservations : Reservation[] = [];
  isBarber?: boolean = false;
  options: any;

  constructor(
    private dataImService: DataImService,
    private reservationService: ReservationService,
    private authUserService: AuthUserService,
  ) {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };

    // dans le cas d'un client, on récupère les coiffures
    this.haircuts = this.dataImService.getHaircuts();

    if(this.authUserService.getUserConnected()){
      this.isBarber = this.authUserService.getUserConnected().isBarber;
    }


    // dans le cas d'un coiffeur, on récupère les réservations
    this.reservations = this.reservationService.getReservations().filter(rs => !rs.barber);
  }

  ngOnInit(): void {
    // ngOnInit Method
  }
}
