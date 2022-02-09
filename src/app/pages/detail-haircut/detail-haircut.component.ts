import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { Reservation } from 'src/app/models/Reservation';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataImService } from 'src/app/services/data-im.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from '../signup/models/User';

@Component({
  selector: 'app-detail-haircut',
  templateUrl: './detail-haircut.component.html',
  styleUrls: ['./detail-haircut.component.scss'],
})
export class DetailHaircutComponent implements OnInit {
  haircut?: Haircut;
  value: Date;
  form: FormGroup;
  constructor(
    public dataImService: DataImService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.value = new Date();
    this.form = this.fb.group({
      reservationDate: [''],
    });
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
    const hour = new Date(timeString).getHours() as number;
    const minutes = new Date(timeString).getMinutes() as number;
    const reservationTime: Time = {
      hours: hour,
      minutes: minutes,
    } as Time;

    if (this.authUserService.getUserConnected().id) {
      const reservation = new Reservation(
        this.haircut,
        this.authUserService.getUserConnected(),
        new User(),
        timeString,
        reservationTime
      );

      this.reservationService.createReservation(reservation);
      console.log('reservation', this.reservationService.reservations);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
