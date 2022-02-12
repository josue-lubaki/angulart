import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { Position } from "../pages/home-page/model/position";

const pinSVGFilled =
  'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z';
const labelOriginFilled = new google.maps.Point(12, 9);

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  overlays: google.maps.Marker[] = [];
  private location$: any;

  constructor() {}

  /**
   * Fonction qui permet de récupèrer les markers
   * */
  getOverlays() : Observable<google.maps.Marker[]>{
    return new Observable<google.maps.Marker[]>(observer => {
        observer.next(this.overlays);
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
          message: 'Pas de geoloc ici',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 1,
          TIMEOUT: 1,
        });
      }

      // unsubscribe from the location observable when the component is destroyed
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }));
  }

  /**
   * Fonction qui permet d'ajouter le marker
   * */
  addMarker(
    latitude: number,
    longitude: number,
    title?: string,
    label?: string
  ) {
    this.overlays.push(
      new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        label: label,
        title: title,
        animation: google.maps.Animation.DROP,
      })
    );
  }

  /**
   * Function qui permet d'ajouter le marker de l'utilisateur sur la carte
   * @param latitude la latitude
   * @param longitude la longitude
   * */
  addMarkerUser(latitude: number, longitude: number) {
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
  addMarkerReservations(reservations: Reservation[]) : Observable<Reservation[]>  {
    return new Observable<Reservation[]>(observer => {
      reservations.forEach((rs) => {
        // éviter les doublons
        if (!this.overlays.find((mk: google.maps.Marker) =>
          mk.getPosition()?.lat() === rs.localisation.latitude &&
          mk.getPosition()?.lng() === rs.localisation.longitude
        )) {
          this.addMarkerReservation(rs);
        }
      });
      observer.next(reservations)
    })
  }

  /**
   * Function qui permet d'ajouter un marker sur la carte
   * @param reservation la reservation dont on souhait répresentée sur la carte
   * @return void
   * */
  addMarkerReservation(reservation: Reservation) {
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
  removeMarker(localisation: Position) : Observable<google.maps.Marker> {
    return new Observable<google.maps.Marker>(observer => {
      const marker = this.overlays.find((mk : google.maps.Marker) =>
        mk.getPosition()?.lat() === localisation.latitude &&
        mk.getPosition()?.lng() === localisation.longitude
      )

      marker?.setPosition(null)
      observer.next(marker)
    })
  }
}