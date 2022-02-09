import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { MessageService } from 'primeng/api';
import { AuthUserService } from 'src/app/services/auth-user.service';
import {STATUS} from "../../models/constantes/Status";
import {User} from "../../models/User";

@Component({
  selector: 'app-barber-details-page',
  templateUrl: './barber-details-page.component.html',
  styleUrls: ['./barber-details-page.component.scss'],
})
export class BarberDetailsPageComponent implements OnInit {
  reservation?: Reservation;
  canAcceptReservation?: boolean = true;
  STATUS = STATUS
  user? : User;
  hide : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private messageService: MessageService,
    private authUserService: AuthUserService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const idReservation: string = params['id'];

      if (idReservation) {
        this.reservation =
          this.reservationService.getReservation(idReservation);
        console.log("reservation: " + this.reservation)
        if(this.reservation) {
          this.user = this.authUserService.getUserConnected();
          if(this.user.id == this.reservation.client?.id){
            this.canAcceptReservation = false;
          }
        }
        else{
          this.hide = true;
        }
      }
    });
  }

  /***
   * Methode qui permet au coiffeur d'accepter une requête (mission)
   */
  acceptMission() {
    let isBarber = this.authUserService.getUserConnected().isBarber;

    // vérifier si l'utilisateur est un coiffeur et si la réservation existe
    if (isBarber && this.reservation) {

      // setter l'utilisateur courant étant que le Barber de la réservation
        this.reservation.barber = this.authUserService.getUserConnected();
        this.reservationService.acceptMission(this.reservation);

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

  ngOnInit(): void {}

  /**
   * Méthode qui permettra à un utilisateur de modifier la date de sa réservation
   *
   * */
  modifyReservation() {
    console.log("yeah, je peux modifier ma réservation");
  }
}
