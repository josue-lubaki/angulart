import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataImService } from 'src/app/services/data-im.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from '../signup/models/User';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  user!: User;
  idUserCurrent: any;
  emailUserCurrent: any;
  haircuts: Haircut[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private authUserService: AuthUserService,
    private router: Router,
    public data: DataImService
  ) {
    // Recupèrer l'email de l'utilisateur connecté (se trouvant dans le localStorage)
    // puis tenter de récupérer l'utilisateur correspondant à cet email
    this.emailUserCurrent = this.localStorage.getVariable('email');
    this.idUserCurrent = this.authUserService.getUserByEmail(
      this.emailUserCurrent
    )?.id;
    this.haircuts = this.data.getHaircuts();
  }

  ngOnInit(): void {
    // si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    if (this.idUserCurrent) {
      this.authUserService.getUsers().find((user) => {
        if (user.id === this.idUserCurrent) {
          this.user = user;
          console.log('user', this.user);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
