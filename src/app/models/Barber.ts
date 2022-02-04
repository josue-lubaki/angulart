import { Address } from './Address';
import { Reservation } from './Reservation';
export class Barber {
  fname: string;
  lname: string;
  imgURL: string;
  email: string;
  password: string;
  dob: Date;
  address: Address;
  requests: Reservation[];

  constructor(
    fname: string,
    lname: string,
    imgURL: string,
    email: string,
    password: string,
    dob: Date,
    address: Address
  ) {
    this.requests = [];
    this.fname = fname;
    this.lname = lname;
    this.imgURL = imgURL;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.address = address;
  }
}
