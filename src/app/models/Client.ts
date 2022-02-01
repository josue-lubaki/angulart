import { Address } from './Address';
import { Reservation } from './Reservation';

export class Client {
  fname?: string;
  lname?: string;
  imgURL?: string;
  dob?: Date;
  address?: Address;
  reservations?: Reservation[];

  constructor(
    fname: string,
    lname: string,
    imgURL: string,
    dob: Date,
    address: Address
  ) {
    this.reservations = [];
    this.fname = fname;
    this.lname = lname;
    this.imgURL = imgURL;
    this.dob = dob;
    this.address = address;
  }
}
