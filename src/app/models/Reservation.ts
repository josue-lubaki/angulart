import { Time } from '@angular/common';
import { Client } from './Client';
import { Barber } from './Barber';
import { STATUS } from './constantes/Status';
import { User } from '../pages/signup/models/User';
import { Haircut } from './Haircut';

export class Reservation {
  date?: Date;
  time?: Time;
  description?: string;
  price?: number;
  duration?: number;
  imageURL?: string;
  haircut?: Haircut;
  status?: string;
  client?: User;
  barber?: User;

  constructor(
    description?: string,
    price?: number,
    duration?: number,
    imageURL?: string,
    haircut?: Haircut,
    client?: User,
    barber?: User
  ) {
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.imageURL = imageURL;
    this.haircut = haircut;
    this.status = STATUS.PENDING;
    this.client = client;
    this.barber = barber;
  }
}
