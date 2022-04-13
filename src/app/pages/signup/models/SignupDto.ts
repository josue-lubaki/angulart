
export interface SignUpDto{
  // Objectif
  role? : string;

  // personal information
  fname? : string;
  lname? : string;
  imageURL?: any;
  email?: string;
  password?: string;
  dob?: Date;
  phone?: string;

  // address information
  street? : string;
  apartment?: string;
  zip? : string;
  city? : string;
  state? : string;
}
