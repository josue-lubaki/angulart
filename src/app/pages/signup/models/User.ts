
import { Address } from 'src/app/models/Address';
import { Reservation } from 'src/app/models/Reservation';

export class User {
  id!: string;
  fname?: string;
  lname?: string;
  image?: string;
  email?: string;
  password?: string;
  dob?: Date;
  phone?: string;
  address?: Address;
  reservations?: Reservation[];
  isClient?: boolean;
  isBarber?: boolean;
  isAdmin?: boolean;

  constructor(
    fname?: string,
    lname?: string,
    image?: string,
    email?: string,
    password?: string,
    dob?: Date,
    phone?: string,
    address?: Address,
    isClient?: boolean,
    isBarber?: boolean,
    isAdmin?: boolean
  ) {
    this.reservations = [];
    this.fname = fname;
    this.lname = lname;
    this.image = image;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.phone = phone;
    this.address = address;
    this.isClient = isClient;
    this.isBarber = isBarber;
    this.isAdmin = isAdmin;
  }
}
