import { Component, OnDestroy, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';
import { Reservation } from '../../models/Reservation';
import { ReservationService } from '../../services/reservation.service';
import { AuthUserService } from '../../services/auth-user.service';
import { GoogleMapService } from 'src/app/services/google-map.service';

class Position {
  latitude : number;
  longitude : number;
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  haircuts: Haircut[] = [];
  reservations: Reservation[] = [];

  isBarber?: boolean = false;
  barberPosition : any;
  clientPosition: any;
  options: any;
  overlays!: any[];
  locationSubscription: any;
  location$: any;

  constructor(
    private dataImService: DataImService,
    private reservationService: ReservationService,
    private authUserService: AuthUserService,
    private googleMapService: GoogleMapService
  ) {
    this.options = {
      center: { lat: 46.3470097, lng: -72.5753559 },
      zoom: 14,
    };

    // initialisation du service de localisation
    this.location$ = this.googleMapService.initializeLocation();

    // dans le cas d'un client, on récupère les coiffures
    this.haircuts = this.dataImService.getHaircuts();

    if (this.authUserService.getUserConnected()) {
      this.isBarber = this.authUserService.getUserConnected().isBarber;
    }

    // dans le cas d'un coiffeur, on récupère les réservations
    // dont le coiffeur n'existe pas encore
    this.reservations = this.reservationService
      .getReservations()
      .filter((rs) => !rs.barber);

    // l'utilisateur est un coiffeur
    if(this.isBarber){
      this.locationSubscription = this.location$.subscribe({
        next(position: any) {
          this.barberPosition = position;
          this.clientPosition = position;
        },
        error(msg: any) {
          console.log('Error getting Location', msg);
        },
      });

      // Récupération des markers pour l'affichage
      this.overlays = this.googleMapService.getOverlays();
    }

    this.location$.subscribe((location: any) => {
      this.clientPosition = location;

      // create a Marker of barber
      if(this.authUserService.getUserConnected().isBarber){
        this.googleMapService.addMarkerUser(
          location.coords.latitude as number,
          location.coords.longitude as number,
        );
      }
      else{
        const position : Position = new Position(
          this.clientPosition.coords.latitude,
          this.clientPosition.coords.longitude
        )

        // sauvergarder la position du client dans le localStorage
        localStorage.setItem('clientPosition', JSON.stringify(position));
      }
    });
  }

  ngOnInit(): void {
    // Marker test
    //this.googleMapService.addMarker(46.3470097, -72.5753559, 'test');
  }

  ngOnDestroy(): void {
    // // Unsubscribe from the location observable when the component is destroyed
    if(this.locationSubscription){
      this.locationSubscription.unsubscribe();
    }

  }
}
