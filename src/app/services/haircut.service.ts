import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { HaircutDTO } from '../models/HaircutDTO';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root',
})
export class HaircutService {
  haircuts: HaircutDTO[] = [];
  private url = environment.urlAPI + '/haircuts';

  constructor(private http: HttpClient) { }

  /**
   * Method to get all haircuts
   * @returns Observable<HaircutDTO[]>
   */
  getHaircuts(): Observable<HaircutDTO[]> {
    return this.http.get<HaircutDTO[]>(this.url).pipe(
      retry(3),
      catchError((error) => {
      console.log(error);
      return throwError(error);
    }));
  }

  /**
   * Fonction qui permet de récuperer le model de coiffure grâce à l'ID
   * @param id ID de la coiffure
   * @return Observable<HaircutDTO>
   * */
  getHaircut(id: string): Observable<HaircutDTO> {
    return this.http.get<HaircutDTO>(`${this.url}/${id}`).pipe(
      retry(3),
      catchError((error) => {
      console.log(error);
      return throwError(error);
    }));
  }

  /**
   * Fonction qui permet de mettre à jour les informations d'une coiffure
   * @param id ID de la coiffure
   * @param data la nouvelle coiffure modifiée
   * @return Observable<HaircutDTO>
   * */
  updateHaircut(id: string, data: HaircutDTO) : Observable<HaircutDTO> {
    return this.http.put<HaircutDTO>(this.url, data).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
  }

  /**
   * Fonction qui permet de supprimer une coiffure
   * @param id ID de la coiffure
   * @return void
   * */
  deleteHaircut(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
  }
}
