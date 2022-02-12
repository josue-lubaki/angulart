import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import {Observable} from "rxjs";

const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
const labelOriginFilled =  new google.maps.Point(12,9);

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
  getOverlays() {
    return this.overlays;
  }

  /**
   * Initialize the location service
   * Function to get the current location if user is barber
   * Create a marker for the current location
   * @returns void
   */
  initializeLocation() {
    // Observer pour la localisation
    return this.location$ = new Observable((observer) => {
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
    });
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

  addMarkerUser(latitude: number, longitude: number) {
    const markerImage = {
      path: pinSVGFilled,
      anchor: new google.maps.Point(7,12),
      fillOpacity: 1,
      fillColor: "#276cbd",
      strokeWeight: 2,
      strokeColor: "black",
      scale: 2,
      labelOrigin: labelOriginFilled
    };

    this.overlays.push(
      new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        label: {
          text: 'Me',
          color: 'white',
          fontWeight: 'bold'
        },
        icon: markerImage,
        animation: google.maps.Animation.DROP,
      })
    );
  }

  addMarkerReservation(reservation: Reservation[]) {
    const markerImage = {
      path: pinSVGFilled,
      anchor: new google.maps.Point(12,17),
      fillOpacity: 1,
      fillColor: "#ef3131",
      strokeWeight: 2,
      strokeColor: "black",
      scale: 2,
      labelOrigin: labelOriginFilled
    };

    reservation.forEach((rs) => {
      if(rs){
        this.overlays.push(
          new google.maps.Marker({
            position: {
              lat: rs.localisation.latitude as number,
              lng: rs.localisation.longitude as number,
            },
            label: rs.haircut?.title[0] ?? "R",
            title: rs.haircut?.title ?? "coupe",
            icon: markerImage,
            animation: google.maps.Animation.DROP,
          })
        );
      }

    });
  }
}
