import { Injectable } from '@angular/core';

const TOKEN = 'jwt-token-angulart';
const IDUSER = 'id-user-current-angulart';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  /**
   * Fonction qui permet de sauvergarder le token de l'utilisateur authentifié
   * @param data le token de l'Utilisateur reçu lors d'une success connexion
   * @return void
   */
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  /**
   * Fonction qui permet de récupérer le token de l'utilsateur current
   * @returns string
   */
  getToken() {
    return localStorage.getItem(TOKEN);
  }

  /**
   * Fonction qui permet de récupèrer l'Id de l'utilisateur courant
   */
  getUserCurrent() {
    return localStorage.getItem(IDUSER);
  }

  /**
   * Fonction qui permet de setter l'ID de l'utilisateur courant
   * @return void
   * @param userId
   */
  setUserCurrent(userId: any) {
    localStorage.setItem(IDUSER, userId);
  }

  /**
   * Fonction qui permet de sauvergarder un token dans le localStorage
   * @param key la clé de l'objet à sauvergarder
   * @param value la valeur de l'objet à sauvergarder
   */
  setVariable(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  /**
   * Fonction qui permet de récupérer un token dans le localStorage
   * @param key la clé de l'objet à récupérer
   */
  getVariable(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * Fonction qui permet de supprimer le token de l'utilisateur current
   */
  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  /**
   * Fonction qui permet de supprimer l'ID de l'utilisateur current
   */
  removeUserCurrent() {
    localStorage.removeItem(IDUSER);
  }

  removeVariable(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Fonction qui permet de supprimer tous les tokens dans le localStorage de l'utilisateur
   */
  clearToken() {
    localStorage.clear();
  }
}
