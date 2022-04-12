import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserDTO } from '../../models/UserDTO';
import { MessageService } from 'primeng/api';
import {Subject, takeUntil} from "rxjs";

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function linkAction(): void;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  image?: string =
    'https://image.freepik.com/vecteurs-libre/logo-salon-coiffure-retro_23-2148420012.jpg';
  avatarBuffer?: string | ArrayBuffer | null | undefined;
  avatar?: string;
  user?: UserDTO;
  private endSubs$: Subject<any> = new Subject();

  constructor(
    private authUserService: AuthUserService,
    private router: Router,
    private localStorage: LocalStorageService,
    private messageService: MessageService
  ) {
    // enregistrer variable user comme observer de userConnected$ du service authUserService
    // Dès qu'il y a une modification sur userConnected$, il sera notifier
    this.authUserService.userConnected$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user: UserDTO) => {
      this.user = user;

      // vérifier si user.imageURL est un objet Blob ou ArrayBuffer
      // si oui, on le set dans avatarBuffer, sinon dans avatar
      if (this.user?.imageURL instanceof ArrayBuffer || this.user?.imageURL instanceof Blob) {
        const file = user?.imageURL as unknown as Blob;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          this.avatarBuffer = fileReader.result as string;
        };
      } else {
        this.avatar = this.user?.imageURL;
      }

    });
  }

  ngOnInit(): void {
    // Pendant la navigation si jamais on perdait les infos de l'utilisateur connecté
    // On récupère les infos de l'utilisateur connecté via la Fonction getUserConnected()

    this.authUserService
      .getUserConnected()
      .pipe(takeUntil(this.endSubs$))
      .subscribe(user => {
        this.user = user;
        if(this.user){
          if(this.user.imageURL instanceof ArrayBuffer || this.user.imageURL instanceof Blob) {
            const file = this.user?.imageURL as unknown as Blob;
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              this.avatarBuffer = fileReader.result as string;
            };
          }
          else {
            this.avatar = this.user.imageURL;
          }
        }
        else{
          this.router.navigate(['/']);
        }
    });
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logoutUser() {
    this.authUserService.logoutUser();
    this.closeMenuBar();
    this.messageService.add({
      severity: 'info',
      summary: 'Déconnexion',
      detail: 'Déconnexion réussi',
    });
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null)
    this.endSubs$.complete();
  }

  /**
   * Cette Fonction appelle la fonction showMenuBar() qui est declarée dans le fichier header.js
   * Elle permet d'afficher la barre de menu
   */
  openMenuBar() {
    linkAction();
  }

  /**
   * Cette Fonction appelle la fonction linkAction() qui est declarée dans le fichier header.js
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
   * Fonction qui permet de conduire l'utilisateur vers la page profile
   * @return void
   */
  goToProfile() {
    this.closeMenuBar();
    this.router.navigate(['/profile']);
  }
}
