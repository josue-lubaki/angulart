import { ReservationDTO } from 'src/app/models/ReservationDTO';
import {Address} from "./Address";

export interface UserDTO {
  id?: string;
  fname?: string;
  lname?: string;
  imageURL?: any;
  email?: string;
  password?: string; // à supprimer
  dob?: Date;
  phone?: string;
  address?: Address;
  created? : Date;
  updated? : Date;
  deleted? : boolean;
  fullName?: string;
  role?: string;
  // reservations?: ReservationDTO[];
  // isClient?: boolean;
  // isBarber?: boolean;
  // isAdmin?: boolean;
}
