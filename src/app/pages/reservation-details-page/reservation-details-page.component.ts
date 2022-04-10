import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationDTO } from 'src/app/models/ReservationDTO';
import { ReservationService } from 'src/app/services/reservation.service';
import { MessageService } from 'primeng/api';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { STATUS } from '../../models/constantes/Status';
import { GoogleMapService } from 'src/app/services/google-map.service';
import {Subject, takeUntil} from "rxjs";
import {COMPTE} from "../../models/constantes/compte";
import {UserDTO} from "../../models/UserDTO";

@Component({
  selector: 'app-reservation-details-page',
  templateUrl: './reservation-details-page.component.html',
  styleUrls: ['./reservation-details-page.component.scss'],
})
export class ReservationDetailsPageComponent implements OnInit, OnDestroy {
  reservation?: ReservationDTO;
  client? : UserDTO;
  canAcceptReservation?: boolean = true;
  STATUS = STATUS;
  user?: UserDTO;
  hide = false;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private messageService: MessageService,
    private authUserService: AuthUserService,
    private router: Router,
    private googleMapService: GoogleMapService
  ) {}

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

    const isBarber = this.user?.role === COMPTE.BARBER;


    if (isBarber && this.reservation) {

      this.reservationService
        .acceptMission(this.reservation.id as number, this.reservation)
        .pipe(takeUntil(this.endSubs$))
        .subscribe((reservationDTO : ReservationDTO)=> {
          if(reservationDTO){
            this.canAcceptReservation = false;
            this.hide = true;

            // supprimer le marker de la map pour la réservation acceptée
            // on passe la localisation du marker sur la carte
            this.googleMapService
              .removeMarker(reservationDTO.location)
              .pipe(takeUntil(this.endSubs$))
              .subscribe();

            // si code 200
            this.messageService.add({
              severity: 'success',
              summary: `Requêtes de ${reservationDTO.client?.fname}`,
              detail: 'Mission Acceptée',
            });
            this.router.navigate(['/']);
          }
        });
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
    this.route.params.subscribe((params) => {
      const idReservation: string = params['id'];

      if (idReservation) {
        this.reservationService
          .getReservationById(idReservation)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((reservation : ReservationDTO) => {
            this.reservation = reservation

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
          })
      }
    });
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
