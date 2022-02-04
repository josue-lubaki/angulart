import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { TicketSignUpModel } from './models/TicketSignUp';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private users: User[] = [];

  // get users
  getUsers() {
    return this.users;
  }

  // create user into the array
  createUser(user: User) {
    this.users.push(user);
  }

  // update user into the array
  updateUser(user: User) {
    this.users.forEach((item, index) => {
      if (item.email === user.email) {
        this.users[index] = user;
      }
    });
  }

  // delete user into the array
  deleteUser(user: User) {
    this.users.forEach((item, index) => {
      if (item.email === user.email) {
        this.users.splice(index, 1);
      }
    });
  }

  // get user by email
  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
