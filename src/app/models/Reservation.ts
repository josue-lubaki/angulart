import { Time } from '@angular/common';
import { User } from './User';
import { Haircut } from './Haircut';

export interface Reservation {
  id?: string,
  reservationDate?: Date,
  reservationTime?: Time,
  haircut?: Haircut,
  status?: string,
  client?: User,
  barber?: User
}
