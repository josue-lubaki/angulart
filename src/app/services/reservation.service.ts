import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [
    {
      id: '93a9-55d2d7dc-44aa-9352ab4e5-0076a1c89ba9',
      reservationDate: new Date(),
      reservationTime: {
        hours: 18,
        minutes: 30,
      },
      haircut: {
        id: '6',
        imageURL:
          'https://i.pinimg.com/564x/17/bb/8d/17bb8d423273c7ee8ea3849d94c6692e.jpg',
        price: 45,
        title: 'la coupe à la new-yorkaise',
        estimatingTime: '35 min',
        description:
          "La coupe de cheveux homme mi long la plus répandue ces derniers temps est la coupe Undercut, similaire de la coupe pompadour.",
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
        latitude: 46.348906,
        longitude: -72.568547,
      },
    },
    {
      id: 'eb3e-7e5baa8d-4ea9-b494b05b4-6315a8aaa99b',
      reservationDate: new Date(),
      reservationTime: {
        hours: 18,
        minutes: 30,
      },
      haircut: {
        id: '2',
        imageURL:
          'https://www.menshairstyletrends.com/wp-content/uploads/2020/12/Taper-Fade-with-Waves-braidsmasterdorian.jpg',
        price: 100,
        title: '360 Waves',
        estimatingTime: '50 min',
        description:
          "La coupe de cheveux des vagues est une coupe à la mode. Pour des vagues complètes à 360°, obtenez un fondu effilé qui ne coupe que les favoris et le décolleté",
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
        latitude: 46.350016,
        longitude: -72.585497,
      },
    },
  ];

  constructor() {
    // see all reservations
    console.log('Reservations', this.reservations);
  }

  /**
   * Get All Reservations
   * @returns Reservation[]
   */
  getReservations(): Observable<Reservation[]> {
    return new Observable((observer) => {
      observer.next(this.reservations);
    });
  }

  /**
   * Remplacer la nouvelle reservation assignée à un barber
   * @param reservation reservation accepter par le barber
   */
  acceptMission(reservation: Reservation): Observable<Reservation> {
    return new Observable<Reservation>((observer) => {
      if (reservation) {
        const index = this.reservations.indexOf(reservation);
        this.reservations[index].barber = reservation.barber;
        observer.next(this.reservations[index]);
      }
    });
  }

  /**
   * Fonction qui permet de modifier une réservation
   * @param idReservation id de la réservation à modifier
   * @param reservation
   */
  updateReservation(
    idReservation: string,
    reservation: Reservation
  ): Observable<Reservation> {
    return new Observable((observer) => {
      this.getReservation(idReservation).subscribe(
        (rs: Reservation) => {
          if (rs) {
            const index = this.reservations.indexOf(rs);
            this.reservations[index] = reservation;
            observer.next(this.reservations[index]);
          }
        }
      );
    });
  }

  /**
   * Get an reservation by id
   * @param idReservation id de la réservation à récupérer
   * @return Reservation
   */
  getReservation(idReservation: any): Observable<Reservation> {
    return new Observable<Reservation>((observer) => {
      const reservation = this.reservations.find(
        (rs) => rs.id === idReservation
      );
      observer.next(reservation);
    });
  }

  /**
   * Fonction qui permet de créer une réservation
   * @param reservation reservation à créer
   */
  createReservation(reservation: Reservation): Observable<Reservation[]> {
    return new Observable<Reservation[]>((observer) => {
      reservation.id = this._generateUUID();
      this.reservations.push(reservation);
      observer.next(this.reservations);
    });
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
   * Fonction permettant de supprimer une réservation
   * @param id ID de la réservation à supprimer
   * @return void
   * */
  deleteReservation(id: string) : Observable<Reservation> {
    return new Observable<Reservation>(observer => {
      this.getReservation(id).subscribe(reservation => {
        if (reservation) {
          const index = this.reservations.indexOf(reservation);
          this.reservations.splice(index, 1);
          observer.next(reservation);
        }
      })
    })
  }
}
