import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  image?: string;
  img =
    'https://image.freepik.com/vecteurs-libre/logo-salon-coiffure-retro_23-2148420012.jpg';

  constructor(
    private authUserService: AuthUserService,
    private localStorage: LocalStorageService
  ) {
    // Récupération de l'utilisateur connecté
    let emailUser: string | null = this.localStorage.getVariable('email');

    let avatar;
    if (emailUser) {
      avatar = this.authUserService.getUserByEmail(emailUser)?.image;
    }

    if (avatar) {
      this.image = avatar;
      console.log('image', avatar);
    } else {
      this.image = this.img;
      console.log('image', this.image);
    }
  }

  ngOnInit(): void {}
}
