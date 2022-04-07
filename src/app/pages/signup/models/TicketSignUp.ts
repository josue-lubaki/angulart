import {Address} from "../../../models/Address";

export class TicketSignUpModel {
  objectif: ObjectifModel;
  personalInformation: PersonalInformationModel;
  address?: Address;

  constructor() {
    this.objectif = new ObjectifModel();
    this.personalInformation = new PersonalInformationModel();
    // address interface initialisation
    this.address = {
      id : 0,
      street: '',
      city: '',
      zip: '',
      state: ''
    };
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
  image?: string;
  email?: string;
  password?: string;
  dob?: Date;
  phone?: string;

  constructor(
    fname?: string,
    lname?: string,
    image?: string,
    email?: string,
    password?: string,
    dob?: Date,
    phone?: string
  ) {
    this.fname = fname;
    this.lname = lname;
    this.image = image;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.phone = phone;
  }
}
