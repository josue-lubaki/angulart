import { Address } from 'src/app/models/Address';
import { ReservationDTO } from 'src/app/models/ReservationDTO';

export interface UserDTO {
  id?: string;
  fname?: string;
  lname?: string;
  imageURL?: any;
  email?: string;
  password?: string;
  dob?: Date;
  phone?: string;
  address?: Address;
  reservations?: ReservationDTO[];
  isClient?: boolean;
  isBarber?: boolean;
  isAdmin?: boolean;
}
