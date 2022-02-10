import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { Reservation } from 'src/app/models/Reservation';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input()
  haircut!: Haircut;

  @Input()
  reservation!: Reservation;

  isBarber?: boolean = false;

  constructor(private router: Router, private authUserService: AuthUserService) {
    // Type de compte de l'utilisateur courant
    if(this.authUserService.getUserConnected()){
      this.isBarber = this.authUserService.getUserConnected().isBarber;
    }
  }

  ngOnInit(): void {
    // ngOnInit Method
  }

  /**
   * Method to getting the information of the haircut when the user click on the card
   * @param id the id of the card
   */
  haircutSelected(id: string): void {
    this.router.navigate(['/details', id]);
  }

  /**
   * Navigate from the barber card to the detail reservation haircut page
   * @param id id of the reservation
   */
  reservationSelected(id: any): void {
    this.router.navigate(['/reservations', id]);
  }
}
