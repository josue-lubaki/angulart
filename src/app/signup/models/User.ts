import { Address } from '../../models/Address';
import { Reservation } from '../../models/Reservation';

export class User {
  fname: string;
  lname: string;
  image: string;
  email: string;
  password: string;
  dob: number;
  address: Address;
  reservations: Reservation[];
  isClient: boolean;
  isAdmin: boolean;

  constructor(
    fname: string,
    lname: string,
    image: string,
    email: string,
    password: string,
    dob: number,
    address: Address,
    isClient: boolean,
    isAdmin: boolean
  ) {
    this.reservations = [];
    this.fname = fname;
    this.lname = lname;
    this.image = image;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.address = address;
    this.isClient = isClient;
    this.isAdmin = isAdmin;
  }
}
