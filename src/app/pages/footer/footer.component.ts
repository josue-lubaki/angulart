import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import {UserDTO} from "../../models/UserDTO";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isVisible = false;

  constructor(private authUserService : AuthUserService) {}

  ngOnInit(): void {
    // verifier si l'utilisateur est connecté
    this.authUserService.userConnected$.subscribe(
      ((user: UserDTO) => {
        this.isVisible = !!user;
      })
    );
  }
}
