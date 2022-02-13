import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Haircut } from '../models/Haircut';

@Injectable({
  providedIn: 'root',
})
export class HaircutService {
  haircuts: Haircut[] = [
    {
      id: '1',
      imageURL:
        'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      price: 20,
      title: 'degrade',
      estimatingTime: '30 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '2',
      imageURL:
        'https://images.unsplash.com/photo-1568339434343-2a640a1a9946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
      price: 40,
      title: 'degrade',
      estimatingTime: '50 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '3',
      imageURL:
        'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 60,
      title: 'coupe réguliere',
      estimatingTime: '1h',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '4',
      imageURL:
        'https://images.unsplash.com/photo-1606333259737-6da197890fa2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      price: 80,
      title: 'dread locks',
      estimatingTime: '45 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '5',
      imageURL:
        'https://images.unsplash.com/photo-1627100232173-acf3733f02bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80',
      price: 15,
      title: 'courts',
      estimatingTime: '20 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '6',
      imageURL:
        'https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80',
      price: 40,
      title: 'degrade',
      estimatingTime: '30 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '7',
      imageURL:
        'https://images.unsplash.com/photo-1590769639599-2c056eef52b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      price: 40,
      title: 'degrade',
      estimatingTime: '20 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: '8',
      imageURL:
        'https://images.unsplash.com/photo-1598547461182-45d03f6661e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 40,
      title: 'degrade',
      estimatingTime: '25 min',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ] as Array<Haircut>;

  /**
   * Method to get all haircuts
   * @returns Haircut[]
   */
  getHaircuts(): Observable<Haircut[]> {
    return new Observable<Haircut[]>((observer) => {
      observer.next(this.haircuts);
    });
  }

  /**
   * Fonction qui permet de récuperer le model de coiffure grâce à l'ID
   * @param id ID de la coiffure
   * @return Haircut
   * */
  getHaircut(id: string): Observable<Haircut> {
    return new Observable<Haircut>((observer) => {
        this.getHaircuts().subscribe((haircuts: Haircut[]) => {
          const hr = haircuts.find(haircut => haircut.id === id)
          observer.next(hr);
        })
      }
    )
  }
}
