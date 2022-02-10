import { Address } from 'src/app/models/Address';
import { Reservation } from 'src/app/models/Reservation';

export interface User {
  id?: string;
  fname?: string;
  lname?: string;
  imageURL?: string;
  email?: string;
  password?: string;
  dob?: Date;
  phone?: string;
  address?: Address;
  reservations?: Reservation[];
  isClient?: boolean;
  isBarber?: boolean;
  isAdmin?: boolean;
}
