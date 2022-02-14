import { Time } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { HaircutService } from 'src/app/services/haircut.service';
import { ReservationService } from 'src/app/services/reservation.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { STATUS } from '../../models/constantes/Status';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Reservation } from '../../models/Reservation';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/User';
import { Position } from '../home-page/model/position';
import { PrimeNGConfig } from 'primeng/api';
import { GoogleMapService } from 'src/app/services/google-map.service';

@Component({
  selector: 'app-detail-haircut',
  templateUrl: './detail-haircut.component.html',
  styleUrls: ['./detail-haircut.component.scss'],
})
export class DetailHaircutComponent implements OnInit, OnDestroy {
  haircut?: Haircut;
  value: Date;
  endSubs$: Subject<any> = new Subject();
  user?: User;
  minDate: Date;

  constructor(
    public dataImService: HaircutService,
    private route: ActivatedRoute,
    private authUserService: AuthUserService,
    private reservationService: ReservationService,
    private router: Router,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private googleMapService: GoogleMapService,
    private ngZone: NgZone
  ) {
    this.value = new Date();

    // Minimun date range
    this.minDate = new Date();
  }

  ngOnInit(): void {
    // setting translate date to french
    this.settingTranslateDate();

    // Retrieve the ID of the hairstyle then find its information
    this.route.paramMap.subscribe((params) => {
      this.dataImService.getHaircuts().subscribe((haircuts) => {
        this.haircut = haircuts.find((it) => it.id === params.get('id'));
      });
    });

    this.authUserService
      .getUserConnected()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        this.user = user;
      });

    // Tenter de récuperer la recente date
    this.route.queryParamMap.subscribe((params) => {
      this.reservationService.getReservations().subscribe((reservations) => {
        const reservation = reservations.find(
          (it) => it.id === params.get('modifyreservation')
        );
        if (reservation) {
          this.value = reservation?.reservationDate as Date;
        } else {
          this.value = new Date();
        }
      });
    });
  }

  /**
   * Fonction qui permet la création et la mise à jour d'une réservation
   * @return void
   * */
  createAndUpdateReservation() {
    const timeString = this.value as Date;
    this.route.queryParamMap.subscribe((params) => {
      // Modification de la réservation
      this.updateDateReservation(params, timeString);

      // creation de la reservation
      this.createReservation(params, timeString);
    });
  }

  /**
   * Fonction qui permet de mettre à jour les données de la réservation
   * adresse du path contenant "modifyreservation"
   * exemple -> http://localhost:4200/details/3?modifyreservation=cae5-e5a
   * @param params le paramMap sur lequel vérifier le mot "modifyreservation"
   * @param timeString la date choisie par l'utilisateur
   * @return void
   * */
  updateDateReservation(params: ParamMap, timeString: Date) {
    if (params.get('modifyreservation')) {
      const idReservation = params.get('modifyreservation') as string;

      this.reservationService.getReservation(idReservation).subscribe(res =>{
        res.reservationDate = timeString;
        this.reservationService
          .updateReservation(idReservation, res)
          .pipe(takeUntil(this.endSubs$))
          .subscribe();
      })

      // Toast
      this.messageService.add({
        severity: 'success',
        summary: 'Modification Réservation',
        detail: 'Votre réservation a bien été modifiée',
      });

      // Redirection
      this.router.navigate(['/reservations', idReservation]);
    }
  }

  /**
   * Function qui permet de créer une réservation
   * @param params paramètre permettant de vérifier le chemin d'adresse
   * @param timeString la date de la réservation
   * @return void
   * */
  private createReservation(params : ParamMap, timeString: Date) {
    if (!params.get('modifyreservation')) {
      const reservationTime = DetailHaircutComponent._initTime(timeString) as Time;

      if (this.user?.id) {
        // Récupérer la position du client dans le localStorage
        const position = this.getClientLocationFromLocalStorage() as Position;

        this.confirmationService.confirm({
          message:
            "<b>Localisez-moi</b> : votre réservation aura votre localisation actuelle<br> " +
            "<b>Utilisez mon domicile</b> : votre réservation aura l'adresse de votre domicile",
          accept: () => {
            // Si l'utilisateur souhait être localiser
            if (position) {
              const MyReservation = this.initReservationModel(
                timeString,
                reservationTime,
                position
              ) as Reservation;
              this.createMyReservation(MyReservation);
            }
            else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Réservation',
                detail: 'Désolé, Veuillez activer votre localisation et actualisez la page',
              });
              this.router.navigate(['/home']);
            }
          },
          reject: () => {
            // consulter l'API de google pour récupérer la latitude et longitude à partir d'une adresse
            const address = this.user?.address?.street + " " +
            this.user?.address?.zip + " " + this.user?.address?.city + " " + this.user?.address?.state
            const zip = this.user?.address?.zip
            this.googleMapService.getLatitudeLongitude(address, zip).subscribe((position) => {
              this.ngZone.run(() => {
                const MyReservation = this.initReservationModel(
                  timeString,
                  reservationTime,
                  position
                ) as Reservation;
                this.createMyReservation(MyReservation);
              })
            });
          }
        });
      }
      else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Réservation',
          detail: "Désolé, Vous n'êtes pas connecté,",
        });
        this.router.navigate(['/login']);
      }
    }
  }

  /**
   * Fonction qui permet d'initialiser le format de l'heure pour le model Reservation
   * @param timeString la date à formater
   * @return Time
   * */
  private static _initTime(timeString: Date) {
    const hour = new Date(timeString).getHours() as number;
    const minutes = new Date(timeString).getMinutes() as number;

    return {
      hours: hour,
      minutes: minutes,
    } as Time;
  }

  /**
   * Fonction qui permet d'obtenir la location de l'utilisateur courant,
   * information se trouvant dans le LocalStorage
   * @return Position
   * */
  private getClientLocationFromLocalStorage(): Position {
    const clientPosition =
      this.localStorageService.getVariable('clientPosition');
    return JSON.parse(clientPosition as string);
  }

  /**
   * Fonction permettant d'initialiser le model Reservation avec les valeurs prêtes à être insérer
   * @param timeString la date choisie par l'utilisateur
   * @param reservationTime l'heure prévue de la réservation
   * @param position la localisation actuelle de l'utilisateur
   * @return Reservation
   * */
  private initReservationModel(
    timeString: Date,
    reservationTime: Time,
    position: Position
  ): Reservation {
    return {
      haircut: this.haircut,
      client: this.user,
      status: STATUS.PENDING,
      reservationDate: timeString,
      reservationTime: reservationTime,
      localisation: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    };
  }

  /**
   * Fonction qui permet de créer la réservation duement completé
   * @param myReservation le model Reservation à sauvegarder
   * @return void
   * */
  private createMyReservation(myReservation: Reservation) {
    this.reservationService
      .createReservation(myReservation)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Réservation',
          detail: 'Réservation enregistrée',
        });

        this.router.navigate(['/home']);
      });
  }

  settingTranslateDate() {
    this.primeNGConfig.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      //translations
      dayNames: [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
      ],
      monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }


}
