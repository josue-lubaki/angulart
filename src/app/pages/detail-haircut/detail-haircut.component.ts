import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataImService } from 'src/app/services/data-im.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { MessageService } from 'primeng/api';
import { STATUS } from '../../models/constantes/Status';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-detail-haircut',
  templateUrl: './detail-haircut.component.html',
  styleUrls: ['./detail-haircut.component.scss'],
})
export class DetailHaircutComponent implements OnInit {
  haircut?: Haircut;
  value: Date;
  form: FormGroup;
  invalidDates: Array<Date>;

  constructor(
    public dataImService: DataImService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private reservationService: ReservationService,
    private router: Router,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {
    this.value = new Date();
    this.form = this.fb.group({
      reservationDate: [''],
    });

    // invalider toutes les dates avant today + 1 jour
    this.invalidDates = [];
    const today = new Date();
    for (let i = 0; i < 25600; i++) {
      const date = new Date(today.setDate(today.getDate()));
      this.invalidDates.push(date);
    }
  }

  ngOnInit(): void {
    // Retrieve the ID of the hairstyle then find its information
    this.route.paramMap.subscribe((params) => {
      this.haircut = this.dataImService
        .getHaircuts()
        .find((haircut) => haircut.id === params.get('id'));
    });
  }

  createReservation() {
    const timeString = this.form.controls['reservationDate'].value as Date;

    this.route.queryParamMap.subscribe((params) => {
      // Modification de la réservation
      if (params.get('modifyreservation')) {
        const idReservation = params.get('modifyreservation');
        this.reservationService.modifyReservation(idReservation, timeString);
        this.messageService.add({
          severity: 'success',
          summary: 'Modification Réservation',
          detail: 'Votre réservation a bien été modifiée',
        });
        this.router.navigate(['/reservations', idReservation]);
      } else {
        // Création de la réservation
        const hour = new Date(timeString).getHours() as number;
        const minutes = new Date(timeString).getMinutes() as number;
        const reservationTime: Time = {
          hours: hour,
          minutes: minutes,
        } as Time;

        if (this.authUserService.getUserConnected().id) {
          // Récupérer la position du client dans le localStorage
          const clientPosition = this.localStorageService.getVariable('clientPosition');
          const position = JSON.parse(clientPosition as string);

          if (clientPosition) {
            // construire l'objet Reservation
            const MyReservation: Reservation = {
              haircut: this.haircut,
              client: this.authUserService.getUserConnected(),
              status: STATUS.PENDING,
              reservationDate: timeString,
              reservationTime: reservationTime,
              localisation: {
                latitude: position.latitude,
                longitude: position.longitude,
              },
            };

            console.log('MyReservation: ', MyReservation);

            this.reservationService.createReservation(MyReservation);
            this.messageService.add({
              severity: 'success',
              summary: 'Réservation',
              detail: 'Réservation enregistrée',
            });

            this.router.navigate(['/home']);
          }
          else{
            this.messageService.add({
              severity: 'warn',
              summary: 'Réservation',
              detail: "Désolé, Veuillez activer votre localisation",
            });
            this.router.navigate(['/home']);
          }
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Réservation',
            detail: "Désolé, Vous n'êtes pas connecté,",
          });
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
