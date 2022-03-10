import { Time } from '@angular/common';
import { UserDTO } from './UserDTO';
import { HaircutDTO } from './HaircutDTO';

interface Localisation {
  latitude: number;
  longitude: number;
}

export interface ReservationDTO {
  id?: string,
  reservationDate?: Date,
  reservationTime?: Time,
  haircut?: HaircutDTO,
  status?: string,
  client?: UserDTO,
  barber?: UserDTO,
  localisation: Localisation
}
