import { Injectable } from '@angular/core';
import { ReservationDTO } from '../models/ReservationDTO';
import {catchError, map, Observable, retry, throwError} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private url = environment.urlAPI + '/reservations';
  reservations: ReservationDTO[] = [];

  constructor(private http: HttpClient) {}

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
   * @param id id de la reservation
   * @param reservation reservation accepter par le barber
   */
  acceptMission(id : number, reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.patch<ReservationDTO>(`${this.url + '/accept/' + id}`, reservation).pipe(
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
  getReservationById(idReservation: string): Observable<ReservationDTO> {
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
   * Fonction permettant de supprimer une réservation
   * @param id ID de la réservation à supprimer
   * @return Observable<ReservationDTO>
   * */
  deleteReservation(id: string) : Observable<ReservationDTO> {
    return this.http.delete<ReservationDTO>(`${this.url}/${id}`).pipe(
      retry(3),
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }
}
