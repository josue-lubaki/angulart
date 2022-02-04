import { Address } from 'src/app/models/Address';

export class TicketSignUpModel {
  objectif: ObjectifModel;
  personalInformation: PersonalInformationModel;
  address: Address;

  constructor() {
    this.objectif = new ObjectifModel();
    this.personalInformation = new PersonalInformationModel();
    this.address = new Address();
  }
}

export class ObjectifModel {
  isClient: boolean;
  isBarber: boolean;
  isAdmin: boolean;

  constructor() {
    this.isClient = false;
    this.isBarber = false;
    this.isAdmin = false;
  }
}

export class PersonalInformationModel {
  fname?: string;
  lname?: string;
  imageURL?: string;
  email?: string;
  password?: string;
  dob?: Date;
  phone?: string;

  constructor(
    fname?: string,
    lname?: string,
    imageURL?: string,
    email?: string,
    password?: string,
    dob?: Date,
    phone?: string
  ) {
    this.fname = fname;
    this.lname = lname;
    this.imageURL = imageURL;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.phone = phone;
  }
}
