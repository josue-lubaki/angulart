import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { MessageService } from 'primeng/api';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { STATUS } from '../../models/constantes/Status';
import { User } from '../../models/User';
import { GoogleMapService } from 'src/app/services/google-map.service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-reservation-details-page',
  templateUrl: './reservation-details-page.component.html',
  styleUrls: ['./reservation-details-page.component.scss'],
})
export class ReservationDetailsPageComponent implements OnInit, OnDestroy {
  reservation?: Reservation;
  canAcceptReservation?: boolean = true;
  STATUS = STATUS;
  user?: User;
  hide = false;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private messageService: MessageService,
    private authUserService: AuthUserService,
    private router: Router,
    private googleMapService: GoogleMapService
  ) {
    this.route.params.subscribe((params) => {
      const idReservation: string = params['id'];

      if (idReservation) {
          this.reservationService
            .getReservation(idReservation)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((reservation : Reservation) => {
              this.reservation = reservation
          })

        if (this.reservation) {
          this.authUserService
            .getUserConnected()
            .pipe(takeUntil(this.endSubs$))
            .subscribe(user => {
              this.user = user;
          })

          if (this.user?.id == this.reservation.client?.id) {
            this.canAcceptReservation = false;
          }
        }
        else {
          this.hide = true;
        }
      }
    });
  }

  /***
   * Fonction qui permet au coiffeur d'accepter une requête (mission)
   */
  acceptMission() {
    this.authUserService
      .getUserConnected()
      .pipe(takeUntil(this.endSubs$))
      .subscribe(user => {
      this.user = user;
    })

    const isBarber = this.user?.isBarber;

    if (isBarber && this.reservation) {
      // setter l'utilisateur courant étant que le Barber de la réservation
      this.reservation.barber = this.user

      // changer le status de la réservation
      this.reservation.status = STATUS.ACCEPTED;
      this.reservationService
        .acceptMission(this.reservation)
        .pipe(takeUntil(this.endSubs$))
        .subscribe();

      this.canAcceptReservation = false;
      this.hide = true;

      // supprimer le marker de la map pour la réservation acceptée
      // on passe la localisation du marker sur la carte
      this.googleMapService
        .removeMarker(this.reservation.localisation)
        .pipe(takeUntil(this.endSubs$))
        .subscribe();

      // si code 200
      this.messageService.add({
        severity: 'success',
        summary: `Requêtes de ${this.reservation.client?.fname}`,
        detail: 'Mission Acceptée',
      });
      this.router.navigate(['/home']);
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Requêtes',
        detail: 'Erreur Survenue',
      });
    }
  }

  ngOnInit(): void {
    // ngOnInit Method
  }

  /**
   * Fonction qui permettra à un utilisateur de modifier la date de sa réservation
   *
   * */
  modifyReservation() {
    const idHaircut = this.reservation?.haircut?.id;
    this.router.navigate(['/details', idHaircut], {
      queryParams: { modifyreservation: this.reservation?.id },
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null)
    this.endSubs$.complete()
  }
}
