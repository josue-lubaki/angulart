import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { User } from '../signup/models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  image?: string =
    'https://image.freepik.com/vecteurs-libre/logo-salon-coiffure-retro_23-2148420012.jpg';
  avatar?: string;
  user?: User;

  constructor(private authUserService: AuthUserService) {
    // enregistrer variable user comme observer de userConnected$ du service authUserService
    // Dès qu'il y a une modification sur userConnected$, il sera notifier
    this.authUserService.userConnected$.subscribe((user: User) => {
      this.user = user;
      this.avatar = user?.image;
    });

    console.log('The User is : ', this.user);
  }

  ngOnInit(): void {
    // Pendant la navigation si jamais on perdait les infos de l'utilisateur connecté
    // On récupère les infos de l'utilisateur connecté via la methode getUserConnected()
    if (!this.user && this.authUserService.getUserConnected()) {
      this.user = this.authUserService.getUserConnected();
      this.avatar = this.user.image;
    }
    console.log('The User is : ', this.user);
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logoutUser() {
    this.authUserService.logoutUser();
  }

  ngOnDestroy(): void {
    //this.authUserService.userConnected$.subscribe().unsubscribe();
  }

  openMenuBar() {

  }

  
}
