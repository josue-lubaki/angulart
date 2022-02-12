import { Component, OnDestroy, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';
import { Reservation } from '../../models/Reservation';
import { ReservationService } from '../../services/reservation.service';
import { AuthUserService } from '../../services/auth-user.service';
import { Observable } from 'rxjs';
import { GoogleMapService } from 'src/app/services/google-map.service';

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

    // dans le cas d'un client, on récupère les coiffures
    this.haircuts = this.dataImService.getHaircuts();

    if (this.authUserService.getUserConnected()) {
      this.isBarber = this.authUserService.getUserConnected().isBarber;
    }

    // dans le cas d'un coiffeur, on récupère les réservations
    this.reservations = this.reservationService
      .getReservations()
      .filter((rs) => !rs.barber);

    // l'utilisateur est un coiffeur
    if(this.isBarber){
      // initialisation du service de localisation
      this.initializeLocation();

      this.location$.subscribe((location: any)=>{
        // create a Marker of barber
        this.googleMapService.addMarkerUser(
          location.coords.latitude as number,
          location.coords.longitude as number,
        );
      });

      // Récupération des markers
      this.overlays = this.googleMapService.getOverlays();
    }

  }

  /**
   * Initialize the location service
   * Function to get the current location if user is barber
   * Create a marker for the current location
   * @returns void
   */
  initializeLocation() {
    // Observer pour la localisation
    this.location$ = new Observable((observer) => {
      const onSuccess: PositionCallback = (pos: any) => {
        observer.next(pos);
      };
      const onError: PositionErrorCallback = (error) => {
        observer.error(error);
      };

      let watchId: number;
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(onSuccess, onError);
      } else {
        onError({
          code: 100,
          message: 'Pas de geoloc ici',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 1,
          TIMEOUT: 1,
        });
      }

      // unsubscribe from the location observable when the component is destroyed
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    });

    if (this.authUserService.getUserConnected().isBarber) {
      this.locationSubscription = this.location$.subscribe({
        next(position: any) {
          this.barberPosition = position;
          console.log('latitude', this.barberPosition.coords.latitude);
          console.log('longitude', this.barberPosition.coords.longitude);
        },
        error(msg: any) {
          console.log('Error getting Location', msg);
        },
      });
    }
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
