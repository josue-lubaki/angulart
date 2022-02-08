import { Injectable } from '@angular/core';
import { Barber } from '../models/Barber';
import { Reservation } from '../models/Reservation';
import { User } from '../pages/signup/models/User';
import { Haircut } from '../models/Haircut';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  haircut: Haircut = {
    title: 'degrade',
    imageURL:
      'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    estimatingTime: '20 mn',
    description: 'fade',
    price: 20,
    id: '1',
  };

  reservations: Reservation[] = [];
  constructor() {
    console.log('Haircut', this.haircut);

    this.reservations = [
      new Reservation(this.haircut, new User(), new User()),

      new Reservation(this.haircut, new User(), new User()),
    ];
  }

  createReservation(reservation: Reservation) {
    reservation.id = this._generateUUID();
    this.reservations.push(reservation);
  }

  // methode qui permet de générer un UUID
  private _generateUUID(): string {
    return 'xxxx-xxxxxxxx-4xyx-yxxxyxxxx-xxxxxxxxyyyy'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
