import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-barber-card',
  templateUrl: './barber-card.component.html',
  styleUrls: ['./barber-card.component.scss'],
})
export class BarberCardComponent implements OnInit {
  @Input()
  reservation!: Reservation;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigate from the barber card to the detail reservation haircut page
   * @param id id of the reservation
   */
  reservationSelected(id: any): void {
    this.router.navigate(['/reservations', id]);
  }
}
