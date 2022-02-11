import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [
    {
      id: '1',
      reservationDate: new Date(),
      reservationTime: {
        hours: 18,
        minutes: 30,
      },
      haircut: {
        id: '1',
        imageURL:
          'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        price: 20,
        title: 'degrade',
        estimatingTime: '30 min',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      },
      status: 'En Attente',
      client: {
        fname: 'Josue',
        lname: 'Lubaki',
        imageURL:
          'https://assets-prd.ignimgs.com/2020/08/06/john-wick-button-1596757524663.jpg',
        email: 'josuelubaki@gmail.com',
        password: 'Josue2022',
        dob: new Date('Sept 2 1964'),
        address: {
          street: '1010 Rue Richard',
          apartment: '13C',
          zip: 'G8Z 1V5',
          city: 'Trois-Rivières',
          state: 'Québec',
        },
      },
      localisation: {
        latitude: 46.346328,
        longitude: -72.572652,
      },
    },
    {
      id: '2',
      reservationDate: new Date(),
      reservationTime: {
        hours: 18,
        minutes: 30,
      },
      haircut: {
        id: '1',
        imageURL:
          'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        price: 20,
        title: 'degrade',
        estimatingTime: '30 min',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      },
      status: 'En Attente',
      client: {
        fname: 'Josue',
        lname: 'Lubaki',
        imageURL:
          'https://assets-prd.ignimgs.com/2020/08/06/john-wick-button-1596757524663.jpg',
        email: 'josuelubaki@gmail.com',
        password: 'Josue2022',
        dob: new Date('Sept 2 1964'),
        address: {
          street: '1010 Rue Richard',
          apartment: '13C',
          zip: 'G8Z 1V5',
          city: 'Trois-Rivières',
          state: 'Québec',
        },
      },
      localisation: {
        latitude: 46.35249,
        longitude: -72.56879,
      },
    },
  ];

  overlays: google.maps.Marker[] = [
    new google.maps.Marker({
      position: {
        lat: this.reservations[0].localisation!.latitude,
        lng: this.reservations[0].localisation!.longitude,
      },
      title: this.reservations[0].haircut!.title,
    }),
    new google.maps.Marker({
      position: {
        lat: this.reservations[1].localisation!.latitude,
        lng: this.reservations[1].localisation!.longitude,
      },
      title: this.reservations[1].haircut!.title,
      draggable: true,
    }),
  ];

  constructor() {
    //this.reservations = [];

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
   * Fonction qui permet de modifier une réservation
   * @param idReservation id de la réservation à modifier
   * @param timeString heure de la réservation
   */
  modifyReservation(idReservation: any, timeString: Date) {
    const reservation = this.getReservation(idReservation);
    if (reservation) {
      reservation.reservationDate = timeString;
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
   * Fonction qui permet de créer une réservation
   * @param reservation reservation à créer
   */
  createReservation(reservation: Reservation) {
    reservation.id = this._generateUUID();
    this.reservations.push(reservation);
  }

  // Fonction qui permet de générer un UUID
  private _generateUUID(): string {
    return 'xxxx-xxxxxxxx-4xyx-yxxxyxxxx-xxxxxxxxyyyy'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Fonction qui permet de récupèrer les markers
   * */
  getOverlays() {
    return this.overlays;
  }

  addMarker(latitude: number, longitude : number, title:string, label?:string) {
    this.overlays.push(
      new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        title: title,
        label: label,
      })
    );
  }
}
