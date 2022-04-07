import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationDTO } from 'src/app/models/ReservationDTO';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { COMPTE } from '../../models/constantes/compte';
import { Subject, takeUntil } from 'rxjs';
import { STATUS } from '../../models/constantes/Status';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GoogleMapService } from 'src/app/services/google-map.service';
import {UserDTO} from "../../models/UserDTO";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  user?: UserDTO;
  avatarBuffer?: string | ArrayBuffer | null | undefined;
  avatar?: string;
  reservations: ReservationDTO[] = [];
  typeCompte?: string;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private localStorage: LocalStorageService,
    private authUserService: AuthUserService,
    private router: Router,
    private reservationService: ReservationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private googleMapService: GoogleMapService
  ) {}

  ngOnInit(): void {
    this.authUserService
      .getUserConnected()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        this.user = user;
        if (user) {
          if (user.role === COMPTE.CLIENT) {
            this.typeCompte = COMPTE.CLIENT;
          } else {
            this.typeCompte = COMPTE.BARBER;
          }
        } else {
          this.router.navigate(['/login']);
        }
      });

    // Ne récuperer que les réservations qui ont été fait par le User actuellement connecté
    // dans le cas d'un client; sinon les réservations dont il a accepté la mission
    // dans le cas d'un coiffeur
    if (this.typeCompte == COMPTE.CLIENT) {
      // retourner la reservation qui appartient au client actuel
      this.reservationService
        .getReservations()
        .pipe(takeUntil(this.endSubs$))
        .subscribe((reservations: ReservationDTO[]) => {
          this.reservations = reservations.filter(
            (rs) => rs.client?.id === this.user?.id
          );
        });
    } else if (this.typeCompte == COMPTE.BARBER) {
      this.reservationService
        .getReservations()
        .pipe(takeUntil(this.endSubs$))
        .subscribe((reservations: ReservationDTO[]) => {
          this.reservations = reservations.filter(
            (reservation: ReservationDTO) =>
              reservation.barber?.id === this.user?.id
          );
        });
    }

    // si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    if(this.user?.id){
      this.authUserService.getUserById(this.user?.id).subscribe((user) => {
        // vérifier si user.imageURL est un objet Blob ou ArrayBuffer
        if (user.imageURL instanceof ArrayBuffer || user.imageURL instanceof Blob) {
          const file = user.imageURL as unknown as Blob;
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            this.avatarBuffer = fileReader.result as string;
          };
        } else {
          this.avatar = user.imageURL;
        }
      });
    }
    else{
      this.router.navigate(['/login']);
    }

  }

  /**
   * Fonction qui permet de se rédiriger vers la description de la reservation
   *
   * @param id ID de la réservation à consulter
   * @return void
   */
  viewDetails(id: any) {
    this.router.navigate(['/reservations', id]);
  }

  /**
   * Function qui permet à l'utilisateur de désister de sa mission
   * @id ID de la réservation à abandonner
   * @return void
   * */
  dropOut(id: any) {
    // if user exist
    if (this.user) {
      // Get reservation current
      this.reservationService
        .getReservationById(id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe((reservation) => {
          if (this.user && reservation) {
            // remove barber in Reservation et changer le status de la reservation
            reservation.barber = undefined;
            reservation.status = STATUS.PENDING;

            // update reservation
            this.reservationService
              .updateReservation(id, reservation)
              .pipe(takeUntil(this.endSubs$))
              .subscribe(() => {
                // update page profile
                this.ngOnInit();
                // Message (Toast)
                this.messageService.add({
                  severity: 'success',
                  summary: 'Abandon de Mission',
                  detail: 'Vous avez abandonné votre mission',
                });
              });
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Fonction qui permet à l'utilisateur de supprimer sa réservation
   * @param id ID de la réservation à supprimer
   * @return void
   * */
  deleteReservation(id: any) {
    if (this.user && this.user.role === COMPTE.CLIENT) {
      // Get reservation
      this.reservationService
        .getReservationById(id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe((res) => {
          if (res.client?.id === this.user?.id) {
              // Get confirmation
              this.confirmationService.confirm({
                message: 'Êtes-vous sûr de vouloir supprimer cette réservation',
                accept: () => {
                  // if accept, delete it
                  this.reservationService
                    .deleteReservation(id)
                    .pipe(takeUntil(this.endSubs$))
                    .subscribe((reservation) => {
                      // supprimer les overlays correspondant à la réservation
                      this.googleMapService
                        .removeMarker(reservation.location)
                        .subscribe();
                      // update page profile
                      this.ngOnInit();
                      // Message Toast
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Suppression Réservation',
                        detail: ' Votre réservation a été supprimée',
                      });
                    });
                },
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Suppression de la Reservation',
                detail: "Désolé, vous n'êtes pas l'auteur",
              });
            }
        });
    }
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  /**
   * Fonction qui permet de mettre à jour les informations de l'utilisateur
   * @return void
   * */
  updateInformationsUser() {
    this.router.navigate(['/signup/profile'], {
      queryParams: { update: this.user?.id },
    });
  }

  /**
   * Fonction permettant à l'utilisateur de supprimer son compte
   * @return void
   * */
  deleteCompteUser() {
    this.authUserService.getUserConnected().subscribe((user) => {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer votre compte',
        accept: () => {
          if (user.id) {
            this.authUserService.deleteUser(user.id).subscribe(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Suppression de votre compte',
                detail: 'Votre compte a été supprimé',
              });
              // logout user and redirect to login page
              this.authUserService.logoutUser();
              this.router.navigate(['/login']);
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Suppression de votre compte',
              detail: "Désolé, vous n'êtes pas connecté",
            });
          }
        },
      });
    });
  }
}
