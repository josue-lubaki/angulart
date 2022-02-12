import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';

const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
const labelOriginFilled =  new google.maps.Point(12,9);

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  overlays: google.maps.Marker[] = [];

  constructor() {}

  /**
   * Fonction qui permet de récupèrer les markers
   * */
  getOverlays() {
    return this.overlays;
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
      this.overlays.push(
        new google.maps.Marker({
          position: {
            lat: rs.localisation!.latitude,
            lng: rs.localisation!.longitude,
          },
          label: rs.haircut!.title[0],
          title: rs.haircut!.title,
          icon: markerImage,
          animation: google.maps.Animation.DROP,
        })
      );
    });
  }
}
