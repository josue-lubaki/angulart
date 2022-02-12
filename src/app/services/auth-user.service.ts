import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { loginModel } from '../pages/login/models/loginModel';
import { User } from '../models/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private users: User[] = [];
  userConnected!: User;
  private userConnectedSuccefully = new Subject<unknown>();
  userConnected$ =
    this.userConnectedSuccefully.asObservable() as Observable<User>;

  constructor(private localStorage: LocalStorageService) {
    // créer un tableau d'utilisateurs
    this.createUsers(
      {
        fname: 'Ismael',
        lname: 'Coulibaly',
        email: 'ismaelcoulibal@gmail.com',
        imageURL:
          'https://static.wikia.nocookie.net/marvel-cinematic/images/3/32/Steve_Rogers_2.jpg',
        password: 'Ismael2022',
        dob: new Date('June 13 1981'),
        address: {
          street: '1010 Rue Saint-Patrick',
          apartment: '3',
          zip: 'G8Z 1P4',
          city: 'Trois-Rivières',
          state: 'Québec',
        },
        phone: '+1 873 873 8738',
        isAdmin: false,
        isClient: false,
        isBarber: true,
      },
      {
        fname: 'Josue',
        lname: 'Lubaki',
        imageURL:
          'https://assets-prd.ignimgs.com/2020/08/06/john-wick-button-1596757524663.jpg',
        email: 'josuelubaki@gmail.com',
        password: 'Josue2022',
        dob: new Date('Sept 2 1964'),
        address: {
          street: '1010 Rue Richard',
          apartment: '13C',
          zip: 'G8Z 1V5',
          city: 'Trois-Rivières',
          state: 'Québec',
        },
        phone: '+1 873 873 8738',
        isAdmin: false,
        isClient: true,
        isBarber: false,
      },
      {
        fname: 'Jonathan',
        lname: 'Kanyinda',
        email: 'jonathankanyinda@gmail.com',
        imageURL:
          'https://static.wikia.nocookie.net/marvelcentral/images/4/4a/Tony-Stark-iron-man-11234572-1485-2061.jpg',
        password: 'Jonathan2022',
        dob: new Date('April 04 1965'),
        address: {
          street: '1011 Rue Charles',
          apartment: '12B',
          zip: 'G8Z 1V4',
          city: 'Trois-Rivières',
          state: 'Québec',
        },
        phone: '+1 873 873 8738',
        isAdmin: false,
        isClient: true,
        isBarber: false,
      }
    );

    console.log('Services : Users List', this.users);

    // get user from local storage, if exist
    const email = this.localStorage.getVariable('email');
    if (email) {
      const userConnectedStorage = this.getUserByEmail(email) as User;

      if (userConnectedStorage) {
        // informer les autres services que l'utilisateur est connecté
        this.userConnectedSuccefully.next(userConnectedStorage);

        // set userConnected, conserver l'information
        // pour une utilisation ultérieure par la Fonction getCurrentUser()
        this.userConnected = userConnectedStorage;
      }
    }
  }

  /**
   * Get information of the user connected
   * @returns User
   */
  getUserConnected(): User {
    return this.userConnected;
  }

  // get users
  getUsers(): User[] {
    return this.users;
  }

  getUserById(idUser: string | number) {
    return this.users.find((user) => user.id === idUser);
  }

  /**
   * create user into the array
   * @param user User to create
   */
  createUser(user: User) {
    user = this.configIdUser(user);
    this.users.push(user);
  }

  /**
   * method to check if the user has an ID assigned, if not then assign one
   * @param user User to verify
   * @returns User
   */
  configIdUser(user: User): User {
    if (!user.id) {
      // Si l'utilisateur n'a pas d'ID, on le créer
      user.id = this._generateId();
      this.updateUser(user.id, user);
    }
    return user;
  }

  /**
   * generate random id UUID
   * @returns string
   */
  private _generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // create users into the array
  createUsers(...users: User[]) {
    users.forEach((user) => this.createUser(user));
  }

  /**
   * Method to login user by email and password
   * @param user User to login
   * @returns boolean
   */
  login(user: loginModel): boolean {
    // Chercher l'utilisateur dans la liste
    const userFound = this.getUserByEmail(user.email);

    if (userFound) {
      // Vérifier le mot de passe
      if (userFound.password === user.password) {
        // setter l'ID de l'utilisateur connecté dans le localStorage
        this.localStorage.setUserCurrent(userFound.id);
        // setter l'email de l'utilisateur
        this.localStorage.setVariable('email', userFound.email);

        // informer les observateurs que l'utilisateur est connecté
        this.userConnectedSuccefully.next(userFound);
        this.userConnected = userFound;

        return true;
      }
    }

    console.log('User not found');
    return false;
  }

  // update user into the array
  updateUser(id: string, userUpdated: User) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users[index] = userUpdated;
      }
    });
  }

  // delete user with this id into the array
  deleteUser(id: string) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users.splice(index, 1);
      }
    });
  }

  // get user by email
  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  /**
   * Method to logout user, delete the userId and email from the localStorage
   */
  logoutUser() {
    this.localStorage.removeVariable('email');
    this.localStorage.removeUserCurrent();
    this.localStorage.removeToken();

    // informer les observateurs que l'utilisateur est déconnecté
    this.userConnectedSuccefully.next(null);
  }


}
