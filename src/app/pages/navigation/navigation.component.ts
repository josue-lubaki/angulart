import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from '../../models/User';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function showMenuBar(): void;
declare function linkAction(): void;

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

  constructor(
    private authUserService: AuthUserService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    // enregistrer variable user comme observer de userConnected$ du service authUserService
    // Dès qu'il y a une modification sur userConnected$, il sera notifier
    this.authUserService.userConnected$.subscribe((user: User) => {
      this.user = user;
      this.avatar = user?.imageURL;
    });
  }

  ngOnInit(): void {
    // Pendant la navigation si jamais on perdait les infos de l'utilisateur connecté
    // On récupère les infos de l'utilisateur connecté via la methode getUserConnected()
    if (!this.user && this.authUserService.getUserConnected()) {
      this.user = this.authUserService.getUserConnected();
      this.avatar = this.user.imageURL;
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logoutUser() {
    this.authUserService.logoutUser();
    this.closeMenuBar();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {}

  /**
   * Cette Methode appelle la fonction showMenuBar() qui est declarée dans le fichier header.js
   * Elle permet d'afficher la barre de menu
   */
  openMenuBar() {
    showMenuBar();
  }

  /**
   * Cette Methode appelle la fonction linkAction() qui est declarée dans le fichier header.js
   * Elle permet de fermer la barre de menu
   */
  closeMenuBar() {
    linkAction();
  }

  closeMenuBarAndDeconnexion() {
    this.closeMenuBar();
    this.localStorage.removeToken();
    this.localStorage.removeUserCurrent();
    this.router.navigate(['/']);
  }

  /**
   * Methode qui permet de conduire l'utilisateur vers la page profile
   * @return void
   */
  goToProfile() {
    this.closeMenuBar()
    this.router.navigate(['/profile']);
  }
}
