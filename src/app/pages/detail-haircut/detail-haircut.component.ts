import { Time } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HaircutDTO } from 'src/app/models/HaircutDTO';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { HaircutService } from 'src/app/services/haircut.service';
import { ReservationService } from 'src/app/services/reservation.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { STATUS } from '../../models/constantes/Status';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {ReservationDTO, ReservationTimeDTO} from '../../models/ReservationDTO';
import { Subject, takeUntil } from 'rxjs';
import { Position } from '../home-page/model/position';
import { PrimeNGConfig } from 'primeng/api';
import { GoogleMapService } from 'src/app/services/google-map.service';
import {UserDTO} from "../../models/UserDTO";

@Component({
  selector: 'app-detail-haircut',
  templateUrl: './detail-haircut.component.html',
  styleUrls: ['./detail-haircut.component.scss'],
})
export class DetailHaircutComponent implements OnInit, OnDestroy {
  haircut?: HaircutDTO;
  value: Date;
  endSubs$: Subject<any> = new Subject();
  user?: UserDTO;
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
      const id = params.get('id');
      if (id) {
        this.dataImService.getHaircut(id).subscribe((haircut) => {
          this.haircut = haircut
        });
      }
    });

    this.authUserService
      .getUserConnected()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        this.user = user;
      });

    // Tenter de r??cuperer la recente date
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
   * Fonction qui permet la cr??ation et la mise ?? jour d'une r??servation
   * @return void
   * */
  createAndUpdateReservation() {
    const timeString = this.value as Date;
    this.route.queryParamMap.subscribe((params) => {
      // Modification de la r??servation
      this.updateDateReservation(params, timeString);

      // creation de la reservation
      this.createReservation(params, timeString);
    });
  }

  /**
   * Fonction qui permet de mettre ?? jour les donn??es de la r??servation
   * adresse du path contenant "modifyreservation"
   * exemple -> http://localhost:4200/details/3?modifyreservation=cae5-e5a
   * @param params le paramMap sur lequel v??rifier le mot "modifyreservation"
   * @param timeString la date choisie par l'utilisateur
   * @return void
   * */
  updateDateReservation(params: ParamMap, timeString: Date) {
    if (params.get('modifyreservation')) {
      const idReservation = params.get('modifyreservation') as string;

      this.reservationService.getReservationById(idReservation).subscribe(res =>{
        // create ReservationTimeDTO object
        const reservationTimeDTO : ReservationTimeDTO = {
          // get hours and minutes from timeString
          hours: this.value.getHours(),
          minutes: this.value.getMinutes()
        };

        res.reservationDate = timeString;
        res.reservationTime = reservationTimeDTO;
        this.reservationService
          .updateReservation(idReservation, res)
          .pipe(takeUntil(this.endSubs$))
          .subscribe(reservation => {
            if(reservation){
              // Toast
              this.messageService.add({
                severity: 'success',
                summary: 'Modification R??servation',
                detail: 'Votre r??servation a bien ??t?? modifi??e',
              });
              // Redirection
              this.router.navigate(['/reservations', idReservation]);
            }
            else{
              // Toast
              this.messageService.add({
                severity: 'warn',
                summary: 'Modification R??servation',
                detail: 'Une erreur est survenue',
              });
            }
          });
      })
    }
  }

  /**
   * Function qui permet de cr??er une r??servation
   * @param params param??tre permettant de v??rifier le chemin d'adresse
   * @param timeString la date de la r??servation
   * @return void
   * */
  private createReservation(params : ParamMap, timeString: Date) {
    if (!params.get('modifyreservation')) {
      const reservationTime = DetailHaircutComponent._initTime(timeString) as Time;

      if (this.user?.id) {
        // R??cup??rer la position du client dans le localStorage
        const position = this.getClientLocationFromLocalStorage() as Position;

        this.confirmationService.confirm({
          message:
            "<b>Localisez-moi</b> : votre r??servation aura votre localisation actuelle<br> " +
            "<b>Utilisez mon domicile</b> : votre r??servation aura l'adresse de votre domicile",
          accept: () => {
            // Si l'utilisateur souhait ??tre localiser
            if (position) {
              const MyReservation = this.initReservationModel(
                timeString,
                reservationTime,
                position
              ) as ReservationDTO;
              this.createMyReservation(MyReservation);
            }
            else {
              this.messageService.add({
                severity: 'warn',
                summary: 'R??servation',
                detail: 'D??sol??, Veuillez activer votre localisation et actualisez la page',
              });
              this.router.navigate(['/']);
            }
          },
          reject: () => {
            // consulter l'API de google pour r??cup??rer la latitude et longitude ?? partir d'une adresse
            const address = this.user?.address?.street + " " +
            this.user?.address?.zip + " " + this.user?.address?.city + " " + this.user?.address?.state
            const zip = this.user?.address?.zip
            this.googleMapService.getLatitudeLongitude(address, zip).subscribe((position) => {
              this.ngZone.run(() => {
                const MyReservation = this.initReservationModel(
                  timeString,
                  reservationTime,
                  position
                ) as ReservationDTO;
                this.createMyReservation(MyReservation);
              })
            });
          }
        });
      }
      else {
        this.messageService.add({
          severity: 'warn',
          summary: 'R??servation',
          detail: "D??sol??, Vous n'??tes pas connect??,",
        });
        this.router.navigate(['/login']);
      }
    }
  }

  /**
   * Fonction qui permet d'initialiser le format de l'heure pour le model Reservation
   * @param timeString la date ?? formater
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
   * Fonction permettant d'initialiser le model Reservation avec les valeurs pr??tes ?? ??tre ins??rer
   * @param timeString la date choisie par l'utilisateur
   * @param reservationTime l'heure pr??vue de la r??servation
   * @param position la localisation actuelle de l'utilisateur
   * @return ReservationDTO
   * */
  private initReservationModel(
    timeString: Date,
    reservationTime: Time,
    position: Position
  ): ReservationDTO {
    return {
      haircut: this.haircut,
      client: this.user,
      status: STATUS.PENDING,
      reservationDate: timeString,
      reservationTime: reservationTime,
      location: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    };
  }

  /**
   * Fonction qui permet de cr??er la r??servation duement complet??
   * @param myReservation le model Reservation ?? sauvegarder
   * @return void
   * */
  private createMyReservation(myReservation: ReservationDTO) {
    this.reservationService
      .createReservation(myReservation)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'R??servation',
          detail: 'R??servation enregistr??e',
        });

        this.router.navigate(['/']);
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
        'F??vrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Ao??t',
        'Septembre',
        'Octobre',
        'Novembre',
        'D??cembre',
      ],
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }


}
