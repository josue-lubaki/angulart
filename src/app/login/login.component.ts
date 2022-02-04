import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../signup/auth-user.service';
import { User } from '../signup/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[];
  imageURL: string | ArrayBuffer | null | undefined;
  constructor(private authUserService: AuthUserService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.users = this.authUserService.getUsers();
    console.log('users saved', this.users[0]);
    console.log('users image', this.users[0].image);

    let file = this.users[0].image as unknown as Blob;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.imageURL = fileReader.result as string;
    };
  }
}
