import { Time } from '@angular/common';
import { User } from './User';
import { Haircut } from './Haircut';

interface Localisation {
  latitude: number;
  longitude: number;
}

export interface Reservation {
  id?: string,
  reservationDate?: Date,
  reservationTime?: Time,
  haircut?: Haircut,
  status?: string,
  client?: User,
  barber?: User,
  localisation?: Localisation
}
