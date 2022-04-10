import { Injectable } from '@angular/core';
import {catchError, map, Observable, retry, Subject, throwError} from 'rxjs';
import { UserDTO } from '../models/UserDTO';
import { LocalStorageService } from './local-storage.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {loginModel} from "../pages/login/models/loginModel";
import {SignUpDto} from "../pages/signup/models/SignupDto";

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  users: UserDTO[] = [];
  userConnected?: UserDTO;
  private userConnectedSuccefully = new Subject<any>();
  userConnected$ =
    this.userConnectedSuccefully.asObservable() as Observable<UserDTO>;
  private url = environment.urlAPI + '/users';
  private urlBase = environment.urlBase;

  constructor(private localStorage: LocalStorageService, private http: HttpClient) {
    // this.getUsers().subscribe(users => {
    //   this.users = users;
    //   console.log('Services : Users List', this.users);
    // });
      // get user from local storage, if exist
      const id = this.localStorage.getUserCurrent();
      if (id) {
        this.getUserById(id).subscribe(user => {
          this.notifier(user)
        });
      }
  }

  /**
   * Methode qui permet de notifier les autres composants que les données ont changé
   * @return void
   * */
  public notifier(user: UserDTO){
    this.userConnected = user;
    this.userConnectedSuccefully.next(user);
  }

  /**
   * Get information of the user connected
   * @returns UserDTO
   */
  getUserConnected(): Observable<UserDTO> {
    return new Observable<UserDTO>(observer => {
      observer.next(this.userConnected)
    })
  }

  /**
   * get all users
   * @path https://api.mocki.io/v2/28339143/users/
   * @returns Observable<UserDTO[]>
   * */
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.url).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * get user by ID
   * @param idUser id of the user
   * @path https://api.mocki.io/v2/28339143/users/{idUser}
   * @returns Observable<UserDTO>
   * */
  getUserById(idUser: string | number) : Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.url}/${idUser}`).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * create user into the array
   * @path https://api.mocki.io/v2/28339143/users/
   * @param user User to create
   */
  createUser(user: FormData) : Observable<UserDTO> {
    return this.http.post<SignUpDto>(`${this.urlBase}/auth/register`, user).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * Method to login user by email and password
   * @param user User to login
   * @returns boolean
   */
  login(user: loginModel) : Observable<any>{
    return this.http.post<any>(`${environment.urlBase}/auth/login`, user).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  // update user into the array
  updateUser(id: string, userUpdated: UserDTO) : Observable<UserDTO>{
    return this.http.put<UserDTO>(`${this.url}/${id}`, userUpdated).pipe(
      retry(3),
      map((user: UserDTO) => {
        this.userConnected = user;
        return user;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }

  /**
   * delete user with this id into the array
   * @param id ID du compte à supprimer
   */
  deleteUser(id: string) : Observable<UserDTO> {
    return this.http.delete<UserDTO>(`${this.url}/${id}`).pipe(
      retry(3),
      map((user: UserDTO) => {
        this.userConnected = undefined;
        return user;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
    // return new Observable<UserDTO>(observer => {
    //   this.users.forEach((user, index) => {
    //     if (user.id === id) {
    //       this.users.splice(index, 1);
    //       this.userConnected = undefined
    //       observer.next(user)
    //     }
    //   });
    // })
  }

  /**
   * Method to logout user, delete the userId and email from the localStorage
   */
  logoutUser() {
    this.localStorage.removeVariable('email');
    this.localStorage.removeUserCurrent();
    this.localStorage.removeToken();
    this.userConnected = undefined;

    // informer les observateurs que l'utilisateur est déconnecté
    this.userConnectedSuccefully.next(null);
  }

}
