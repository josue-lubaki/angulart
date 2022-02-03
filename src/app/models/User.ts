import { Address } from './Address';
import { Reservation } from './Reservation';

export class User {
  fname: string;
  lname: string;
  imageURL: string;
  email: string;
  password: string;
  dob: number;
  address: Address;
  reservations: Reservation[];
  isClient: boolean;

  constructor(
    fname: string,
    lname: string,
    imageURL: string,
    email: string,
    password: string,
    dob: number,
    address: Address,
    isClient: boolean
  ) {
    this.reservations = [];
    this.fname = fname;
    this.lname = lname;
    this.imageURL = imageURL;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.address = address;
    this.isClient = isClient;
  }
}
