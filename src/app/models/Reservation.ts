import { Time } from '@angular/common';
import { Client } from './Client';
import { Barber } from './Barber';
import { STATUS } from './constantes/Status';

export class Reservation {
  date?: Date;
  time?: Time;
  description?: string;
  price?: number;
  duration?: number;
  imageURL?: string;
  haircut?: string;
  status?: string;
  client?: Client;
  barber?: Barber;

  constructor(
    description?: string,
    price?: number,
    duration?: number,
    imageURL?: string,
    haircut?: string,
    client?: Client,
    barber?: Barber
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
