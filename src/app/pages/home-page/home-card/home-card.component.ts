import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HaircutDTO } from 'src/app/models/HaircutDTO';
import { ReservationDTO } from 'src/app/models/ReservationDTO';
import { AuthUserService } from 'src/app/services/auth-user.service';
import {Subject, takeUntil} from "rxjs";
import {LocalStorageService} from "../../../services/local-storage.service";
import {COMPTE} from "../../../models/constantes/compte";
import {UserDTO} from "../../../models/UserDTO";

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input()
  haircut!: HaircutDTO;

  @Input()
  reservation!: ReservationDTO;

  isBarber?: boolean = false;
  endSubs$: Subject<any> = new Subject();
  user?: UserDTO;

  constructor(private router: Router, private authUserService: AuthUserService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {

    // // Retrieve id of logged user from local storage
    // const idUserConnected = this.localStorageService.getUserCurrent();
    // console.log("idUser", idUserConnected);
    //
    // // get actual user connected
    // if (idUserConnected){
    //   this.authUserService.getUserById(idUserConnected).subscribe((user) => {
    //     this.user = user;
    //     console.log("user", this.user);
    //   });
    // }

    this.authUserService
      .getUserConnected()
      .pipe(takeUntil(this.endSubs$))
      .subscribe(user => {
        this.user = user;
      })

    // Type de compte de l'utilisateur courant
    if(this.user){
      this.isBarber = this.user.role === COMPTE.BARBER;
    }
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
