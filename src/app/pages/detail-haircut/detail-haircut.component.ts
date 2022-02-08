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
      reservationDate: ['']
    })
  }

  ngOnInit(): void {
    // Retrieve the ID of the hairstyle then find its information
    this.route.paramMap.subscribe((params) => {
      this.haircut = this.dataImService
        .getHaircuts()
        .find((haircut) => haircut.id === params.get('id'));
    });
  }

  createReservation(){
    const timeString = this.form.controls['reservationDate'].value;
    const hour = new Date(timeString).getHours();
    const mn = new Date(timeString).getMinutes();
    const time: string = hour + ':' + mn; 
    console.log('time', time);

    console.log('user', this.authUserService.getCurrentUser());
    if(this.authUserService.getCurrentUser().id){
      const reservation = new Reservation(
        this.haircut,
        this.authUserService.getCurrentUser(),
        new User(),
        timeString,
        time)

        this.reservationService.addReservation(reservation);
        console.log('reservation', this.reservationService.reservations);
    }

    else{
      this.router.navigate(['/login'])
    }
  }

}
