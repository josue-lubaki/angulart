import { Address } from './Address';
import { Reservation } from './Reservation';

export class Client {
  fname: string;
  lname: string;
  imageURL: string;
  email: string;
  password: string;
  dob: Date;
  address: Address;
  reservations: Reservation[];

  constructor(
    fname: string,
    lname: string,
    imageURL: string,
    email: string,
    password: string,
    dob: Date,
    address: Address
  ) {
    this.reservations = [];
    this.fname = fname;
    this.lname = lname;
    this.imageURL = imageURL;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.address = address;
  }
}
