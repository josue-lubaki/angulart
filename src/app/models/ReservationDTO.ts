import { Time } from '@angular/common';
import { UserDTO } from './UserDTO';
import { HaircutDTO } from './HaircutDTO';

interface Location {
  latitude: number;
  longitude: number;
}

export interface ReservationTimeDTO {
  hours: number;
  minutes: number;
}

export interface ReservationDTO {
  id?: number | string;
  reservationDate?: Date;
  reservationTime?: Time;
  haircut?: HaircutDTO;
  status?: string;
  client?: UserDTO;
  barber?: UserDTO | null;
  location: Location;
}
