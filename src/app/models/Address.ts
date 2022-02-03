export class Address {
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  state?: string;

  constructor(
    street?: string,
    apartment?: string,
    zip?: string,
    city?: string,
    state?: string
  ) {
    this.street = street;
    this.apartment = apartment;
    this.zip = zip;
    this.city = city;
    this.state = state;
  }
}
