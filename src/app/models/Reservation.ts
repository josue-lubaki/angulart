import { Time } from '@angular/common';
import { Client } from './Client';
import { Barber } from './Barber';
import { STATUS } from './constantes/Status';
import { User } from '../pages/signup/models/User';
import { Haircut } from './Haircut';

export class Reservation {
  reservationDate?: Date;
  reservationTime?: string;
  haircut?: Haircut;
  status?: string;
  client?: User;
  barber?: User;

  constructor(
    haircut?: Haircut,
    client?: User,
    barber?: User,
    reservationDate?: Date,
    reservationTime?: string

  ) {
   
    this.haircut = haircut;
    this.status = STATUS.PENDING;
    this.client = client;
    this.barber = barber;
    this.reservationDate =reservationDate;
    this.reservationTime =reservationTime;
  }
}
