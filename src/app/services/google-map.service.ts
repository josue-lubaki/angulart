import { Injectable } from '@angular/core';
import { ReservationDTO } from '../models/ReservationDTO';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { Position } from '../pages/home-page/model/position';

const pinSVGFilled =
  'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  overlays: google.maps.Marker[] = [];
  private location$: any;

  /**
   * Fonction qui permet de récupèrer les markers
   * @return google.maps.Marker[]
   * */
  getOverlays(): Observable<google.maps.Marker[]> {
    return new Observable<google.maps.Marker[]>((observer) => {
      observer.next(this.overlays);
    }).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  clearMarkers() {
    this.overlays.forEach((marker) => {
      marker.setMap(null);
    });
  }

  /**
   * Initialize the location service
   * Function to get the current location if user is barber
   * Create a marker for the current location
   * @returns void
   */
  initializeLocation() {
    // Observer pour la localisation
    return (this.location$ = new Observable((observer) => {
      const onSuccess: PositionCallback = (pos: any) => {
        observer.next(pos);
      };
      const onError: PositionErrorCallback = (error) => {
        observer.error(error);
      };

      let watchId: number;
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(onSuccess, onError);
      } else {
        onError({
          code: 100,
          message: 'Permission denied for geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 1,
          TIMEOUT: 1,
        });
      }

      // unsubscribe from the location observable when the component is destroyed
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    })).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Function qui permet d'ajouter le marker de l'utilisateur sur la carte
   * @param latitude la latitude
   * @param longitude la longitude
   * */
  addMarkerUser(latitude: number, longitude: number) {
    const labelOriginFilled = new google.maps.Point(12, 9);
    const markerImage = {
      path: pinSVGFilled,
      anchor: new google.maps.Point(7, 12),
      fillOpacity: 1,
      fillColor: '#276cbd',
      strokeWeight: 2,
      strokeColor: 'black',
      scale: 2,
      labelOrigin: labelOriginFilled,
    };

    this.overlays.push(
      new google.maps.Marker({
        position: {
          lat: parseFloat(String(latitude)),
          lng: parseFloat(String(longitude)),
        },
        label: {
          text: 'Me',
          color: 'white',
          fontWeight: 'bold',
        },
        icon: markerImage,
      })
    );
  }

  /**
   * Fonction qui permet d'ajouter les markers sur la carte
   * @param reservations liste des réservations à marquer sur la carte
   * @return void
   * */
  addMarkerReservations(
    reservations: ReservationDTO[]
  ): Observable<google.maps.Marker[]> {
    return new Observable<google.maps.Marker[]>((observer) => {
      reservations.forEach((rs) => {
        // éviter les doublons
        if (
          !this.overlays.find(
            (mk: google.maps.Marker) =>
              mk.getPosition()?.lat() === rs.localisation.latitude &&
              mk.getPosition()?.lng() === rs.localisation.longitude
          )
        ) {
          if (rs) this.addMarkerReservation(rs);
        }
      });
      observer.next(this.overlays);
    }).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Function qui permet d'ajouter un marker sur la carte
   * @param reservation la reservation dont on souhait répresentée sur la carte
   * @return void
   * */
  addMarkerReservation(reservation: ReservationDTO) {
    const labelOriginFilled = new google.maps.Point(12, 9);
    const markerImage = {
      path: pinSVGFilled,
      anchor: new google.maps.Point(12, 17),
      fillOpacity: 1,
      fillColor: '#ef3131',
      strokeWeight: 2,
      strokeColor: 'black',
      scale: 2,
      labelOrigin: labelOriginFilled,
    };

    this.overlays.push(
      new google.maps.Marker({
        position: {
          lat: reservation.localisation.latitude as number,
          lng: reservation.localisation.longitude as number,
        },
        label: reservation.haircut?.title[0] ?? 'R',
        title: reservation.haircut?.title ?? 'coupe',
        icon: markerImage,
        animation: google.maps.Animation.DROP,
      })
    );
  }

  /***
   * Fonction qui permet de supprimer le marker sur laa carte
   * @param localisation model localisation de Reservation
   * @return void
   */
  removeMarker(localisation: Position): Observable<google.maps.Marker[]> {
    return new Observable<google.maps.Marker[]>((observer) => {
      const marker = this.overlays.find(
        (mk: google.maps.Marker) =>
          mk.getPosition()?.lat() === localisation.latitude &&
          mk.getPosition()?.lng() === localisation.longitude
      );
      if (marker) {
        marker.setMap(null);
        this.overlays = this.overlays.filter(
          (mk: google.maps.Marker) =>
            mk.getPosition()?.lat() !== localisation.latitude &&
            mk.getPosition()?.lng() !== localisation.longitude
        );
      }
      observer.next(this.overlays);
    }).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Fonction qui permet de récupérer la localisation de l'utilisateur à partir de son zip code
   * @param zip le code postal de l'adresse [Optional]
   * @param address l'adresse de l'utilisateur
   * @return Observable<Position>
   * */
  getLatitudeLongitude(address: string, zip?: string): Observable<Position> {
    return new Observable((observer) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address ?? zip }, (results, status) => {
        if (status === 'OK' && results) {
            const position = new Position(
              results[0].geometry.location.lat(),
              results[0].geometry.location.lng());
            observer.next(position);
        } else {
          observer.error(status);
        }
      });
    });
  }
}
