import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { Reservation } from 'src/app/models/Reservation';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataImService } from 'src/app/services/data-im.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from '../../models/User';
import { COMPTE } from '../../models/constantes/compte';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  user!: User;
  idUserCurrent?: string;
  reservations: Reservation[] = [];
  typeCompte? : string;

  constructor(
    private localStorage: LocalStorageService,
    private authUserService: AuthUserService,
    private router: Router,
    public data: DataImService,
    private reservationService: ReservationService
  ) {
    // Recupèrer l'email de l'utilisateur connecté (se trouvant dans le localStorage)
    // puis tenter de récupérer l'utilisateur correspondant à cet email
    let emailUserCurrent = this.localStorage.getVariable('email');

    // si email trouvé
    if(emailUserCurrent){
      this.idUserCurrent = this.authUserService.getUserByEmail(
        emailUserCurrent
      )?.id as string;

      // vérifier le type de compte de l'utilisateur actuel
      if(this.authUserService.getUserById(this.idUserCurrent)?.isClient){
        this.typeCompte = COMPTE.CLIENT;
      }else{
        this.typeCompte = COMPTE.BARBER;
      }

      // Ne récupèrer que les réservations qui ont été fait par le User actuellement connecté
      // dans le cas où il est client; sinon les réservations dont il a accepté la mission
      // dans le cas d'un coiffeur
      if(this.typeCompte == COMPTE.CLIENT){
       this.reservations = this.reservationService
         .getReservations()
         .filter((reservation: Reservation) => {
           return reservation.client?.id === this.idUserCurrent
         });
      }
      else if(this.typeCompte == COMPTE.BARBER){
        this.reservations = this.reservationService
          .getReservations()
          .filter((reservation: Reservation) => {
            return reservation.barber?.id === this.idUserCurrent
          });
      }
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  /**
   * Méthode qui permet de se rédiriger vers la description de la reservation
   *
   * @param id ID de la réservation à consulter
   * @return void
   */
  viewDetails(id : string){
    this.router.navigate(['/reservations', id])
  }

  ngOnInit(): void {
    // si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    if (this.idUserCurrent) {
      this.authUserService.getUsers().find((user) => {
        if (user.id === this.idUserCurrent) {
          this.user = user;
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
