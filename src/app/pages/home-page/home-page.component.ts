import { Component, OnDestroy, OnInit } from '@angular/core';
import { HaircutDTO } from 'src/app/models/HaircutDTO';
import { ReservationDTO } from '../../models/ReservationDTO';
import { ReservationService } from '../../services/reservation.service';
import { AuthUserService } from '../../services/auth-user.service';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { Position } from './model/position';
import { Subject, takeUntil } from 'rxjs';
import {HaircutService} from "../../services/haircut.service";
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {Router} from "@angular/router";
import { COMPTE } from 'src/app/models/constantes/compte';
import {UserDTO} from "../../models/UserDTO";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  haircuts: HaircutDTO[] = [];
  reservations: ReservationDTO[] = [];

  isBarber?: boolean = false;
  barberPosition: any;
  clientPosition: any;
  options: google.maps.MapOptions;
  overlays: google.maps.Marker[] = [];
  locationSubscription: any;
  location$: any;
  endSubs$: Subject<any> = new Subject();
  user?: UserDTO;

  constructor(
    private haircutService: HaircutService,
    private reservationService: ReservationService,
    private authUserService: AuthUserService,
    private googleMapService: GoogleMapService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    // init map
    this.options = {
      center: { lat: 46.3470097, lng: -72.5753559 },
      zoom: 14,
    };

    this.authUserService.getUserConnected().subscribe(user => {
      this.user = user;
      if (this.user){
        this.authUserService.notifier(this.user)
        if (user && user.role === COMPTE.BARBER) {
          this.isBarber = true;
          this.getReservationWithoutBarber();
          this.location$ = this.googleMapService
            .getOverlays()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((markers) => {
              this.overlays = markers;
              this.googleMapService.clearMarkers()
            });
        }
      }
      else{
        // Retrieve id of logged user from local storage
        const idUser = this.localStorageService.getUserCurrent();

        // get actual user connected
        if (idUser){
          this.authUserService.getUserById(idUser).subscribe((user) => {
            if (user && user.role === COMPTE.BARBER) {
              this.authUserService.notifier(user)
              this.isBarber = true;
              this.getReservationWithoutBarber();
              this.location$ = this.googleMapService
                .getOverlays()
                .pipe(takeUntil(this.endSubs$))
                .subscribe((markers) => {
                  this.overlays = markers;
                  this.googleMapService.clearMarkers()
                });
            }
          });
        }
        else{
          // go to login page
          this.router.navigate(['/']);
        }
      }
    })


    // Retrieve id of logged user from local storage
    const idUser = this.localStorageService.getUserCurrent();
    if(!idUser){
      // go to login page
      this.router.navigate(['/login']);
    }

    // get actual user connected
    if (idUser){
      this.authUserService.getUserById(idUser).subscribe((user) => {
        this.user = user;
        this.authUserService.notifier(user)
        if (user && user.role === COMPTE.BARBER) {
          this.isBarber = true;
          this.location$ = this.googleMapService
            .getOverlays()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((markers) => {
              this.overlays = markers;
              this.googleMapService.clearMarkers()
            });
        }
      });
    }else{
      // go to login page
      this.router.navigate(['/login']);
    }

    // initialisation du service de localisation
    this.location$ = this.googleMapService.initializeLocation();

    // in the case of a client, we recover the hairstyles
    this.haircutService
      .getAllHaircuts()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((haircuts: HaircutDTO[]) => {
        this.haircuts = haircuts;
      });

    // Get location
    this.settingsLocation();
  }

  ngOnInit(): void {
    this.options = {
      center: { lat: 46.3470097, lng: -72.5753559 },
      zoom: 14,
    };

    // on récupère les réservations dont le coiffeur n'existe pas encore
    //this.getReservationWithoutBarber();

    // l'utilisateur est un coiffeur
    if (this.user?.role === COMPTE.BARBER) {
      this.isBarber = true;
      this.listenLocationObservable();

      // Récupération des markers pour l'affichage
      this.googleMapService
        .getOverlays()
        .pipe(takeUntil(this.endSubs$))
        .subscribe((markers) => {
          this.overlays = markers;
          this.googleMapService.clearMarkers()
        });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the location observable when the component is destroyed
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }

    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  /**
   * Fonction qui permet de récupèrer toutes les réservations qui n'ont pas encore de coiffeur
   * @return void
   * */
  private getReservationWithoutBarber() {
    this.reservationService
      .getReservations()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((reservations: ReservationDTO[]) => {
        this.reservations = reservations.filter((rs) => !rs.barber);

        this.googleMapService.clearMarkers()
        this.googleMapService
          .addMarkerReservations(this.reservations)
          .pipe(takeUntil(this.endSubs$))
          .subscribe();
      });
  }

  /**
   * Function that keeps listening to the user's location
   * @return void
   * */
  private listenLocationObservable() {
    this.locationSubscription = this.location$.subscribe({
      next(position: any) {
        this.barberPosition = position;
        this.clientPosition = position;
      },
      error(msg: any) {
        console.log('Error getting Location', msg);
      },
    });
  }

  /**
   * Fonction qui permet d'obtenir la réponse de la localisation
   * Fonction qui permet d'ajouter le marker de l'utilisateur courant sur la carte
   * Sauvegarde la position de l'utilisateur dans le LocalStorage
   * @return void
   * */
  private settingsLocation() {
    this.location$.subscribe((location: any) => {
      this.clientPosition = location;

      // create a Marker of barber
      if (this.user?.role === COMPTE.BARBER) {
        this.googleMapService.addMarkerUser(
          location.coords.latitude as number,
          location.coords.longitude as number
        );
      }
      // si client, on récupère juste l'information
      else {
        const position: Position = new Position(
          this.clientPosition.coords.latitude as number,
          this.clientPosition.coords.longitude as number
        );

        // sauvergarder la position du client dans le localStorage
        localStorage.setItem('clientPosition', JSON.stringify(position));
      }
    });
  }
}
