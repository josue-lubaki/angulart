import { Time } from '@angular/common';
import { STATUS } from './constantes/Status';
import { User } from './User';
import { Haircut } from './Haircut';

export interface Reservation {
  id: string | null,
  reservationDate?: Date,
  reservationTime?: Time,
  haircut?: Haircut,
  status?: string,
  client?: User,
  barber?: User,

  // constructor(
  //   haircut?: Haircut,
  //   client?: User,
  //   barber?: User,
  //   reservationDate?: Date,
  //   reservationTime?: Time
  // ) {
  //   this.haircut = haircut;
  //   this.status = STATUS.PENDING;
  //   this.client = client;
  //   this.barber = barber;
  //   this.reservationDate = reservationDate;
  //   this.reservationTime = reservationTime;
  // }
}
