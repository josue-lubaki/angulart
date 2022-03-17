import { Injectable } from '@angular/core';
import { ReservationDTO } from '../models/ReservationDTO';
import {catchError, Observable, retry, Subscriber, throwError} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private url = environment.urlAPI + '/reservations';
  reservations: ReservationDTO[] = [];

  constructor(private http: HttpClient) {
    // see all reservations
    this.getReservations().subscribe((reservations) => {
      this.reservations = reservations;
      console.log('Reservations', this.reservations);
    });
  }

  /**
   * Get All Reservations
   * @returns Observable<ReservationDTO[]>
   */
  getReservations(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.url).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Remplacer la nouvelle reservation assignée à un barber
   * @param reservation reservation accepter par le barber
   */
  acceptMission(reservation: ReservationDTO): Observable<ReservationDTO> {
    return new Observable<ReservationDTO>((observer) => {
      if (reservation) {
        const index = this.reservations.indexOf(reservation);
        this.reservations[index].barber = reservation.barber;
        observer.next(this.reservations[index]);
      }
    }).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Fonction qui permet au Coiffeur d'Accepter une demande de coiffure
   * @param id ID du coiffeur actuellement connecté
   * @param reservation nouvelle reservation avec changement effectué
   * @return void
   **/
  _acceptMission(id: string, reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.patch<ReservationDTO>(`${this.url}/${id}`, reservation).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Fonction qui permet de modifier une réservation
   * @param idReservation id de la réservation à modifier
   * @param reservation reservation à modifier
   * @return Observable<ReservationDTO>
   */
  updateReservation(
    idReservation: string,
    reservation: ReservationDTO
  ): Observable<ReservationDTO> {
    return this.http.put<ReservationDTO>(`${this.url}/${idReservation}`, reservation).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Get a reservation by id
   * @param idReservation id de la réservation à récupérer
   * @return Observable<ReservationDTO>
   */
  getReservationById(idReservation: any): Observable<ReservationDTO> {
    return this.http.get<ReservationDTO>(`${this.url}/${idReservation}`).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Fonction qui permet de créer une réservation
   * @param reservation reservation à créer
   * @returns Observable<ReservationDTO>
   */
  createReservation(reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.url, reservation).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
  * Fonction qui permet de générer un UUID
  * @deprecated
   * @return string
  */
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
   * @return Observable<ReservationDTO>
   * */
  deleteReservation(id: string) : Observable<ReservationDTO> {
    return this.http.delete<ReservationDTO>(`${this.url}/${id}`).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }
}
