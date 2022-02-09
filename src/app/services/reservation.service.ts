import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [];
  constructor() {
    this.reservations = [];

    // see all reservations
    console.log('Reservations', this.reservations);
  }

  /**
   * Get All Reservations
   * @returns Reservation[]
   */
  getReservations(): Reservation[] {
    return this.reservations;
  }

  /**
   * Remplacer la nouvelle reservation assignée à un barber
   * @param reservation reservation accepter par le barber
   */
  acceptMission(reservation: Reservation) {
    if (reservation) {
      const index = this.reservations.indexOf(reservation);
      this.reservations[index].barber = reservation.barber;
    }
  }

  /**
   * Get an reservation by id
   * @param idReservation id de la réservation à récupérer
   * @return Reservation
   */
  getReservation(idReservation: string) {
    return this.reservations.find(
      (reservation) => reservation.id === idReservation
    );
  }

  /**
   * Methode qui permet de créer une réservation
   * @param reservation reservation à créer
   */
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
