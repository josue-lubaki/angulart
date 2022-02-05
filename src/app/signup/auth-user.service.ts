import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { loginModel } from '../login/models/loginModel';
import { Address } from '../models/Address';
import { TicketSignUpModel } from './models/TicketSignUp';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private users: User[] = [];

  constructor() {
    // Créer les utilisateurs
    const usersRandom: User[] = [
      new User(
        'Josue', // firstname
        'Lubaki', // lastname
        'https://assets-prd.ignimgs.com/2020/08/06/john-wick-button-1596757524663.jpg' as string, // image
        'josuelubaki@gmail.com', // email
        'Josue2022', // password
        new Date(), // Dob
        '+1 873 873 8738', // phone
        new Address(
          '1010 Rue Richard',
          'app 09',
          'G8Z 1V5',
          'Trois-Rivières',
          'Québec'
        ), // address
        true, // isClient
        false, // isAdmin
        false // isAdmin
      ),
      new User(
        'Jonathan', // firstname
        'Kanyinda', // lastname
        'https://static.wikia.nocookie.net/marvelcentral/images/4/4a/Tony-Stark-iron-man-11234572-1485-2061.jpg/revision/latest?cb=20110219055106' as string, // image
        'jonathankanyinda@gmail.com', // email
        'Jonathan2022', // password
        new Date(), // Dob
        '+1 873 873 8738', // phone
        new Address(
          '1011 Rue Charles',
          'app 12B',
          'G8Z 1V4',
          'Trois-Rivières',
          'Québec'
        ), // address
        false, // isClient
        true, // isAdmin
        false // isAdmin
      ),
      new User(
        'Ismael', // firstname
        'Coulibaly', // lastname
        'https://static.wikia.nocookie.net/marvel-cinematic/images/3/32/Steve_Rogers_2.jpg/revision/latest?cb=20131025030358' as string, // image
        'ismaelcoulibal@gmail.com', // email
        'ismael2022', // password
        new Date(), // Dob
        '+1 873 873 8738', // phone
        new Address(
          '1010 Rue Saint-Patrick',
          'app 3',
          'G8Z 1P4',
          'Trois-Rivières',
          'Québec'
        ), // address
        true, // isClient
        false, // isAdmin
        true // isAdmin
      ),
    ];

    this.createUsers(...usersRandom);
    console.log('Services : Users List', this.users);
  }

  // get users
  getUsers() {
    return this.users;
  }

  // create user into the array
  createUser(user: User) {
    this.users.push(user);
  }

  // create users into the array
  createUsers(...users: User[]) {
    users.forEach((user) => this.createUser(user));
  }

  login(user: loginModel): boolean {
    // Chercher l'utilisateur dans la liste
    const userFound = this.getUserByEmail(user.email);
    if (userFound) {
      // Vérifier le mot de passe
      if (userFound.password === user.password) {
        console.log('Information User connected', userFound);
        return true;
      }
    }

    console.log('User not found');
    return false;
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
