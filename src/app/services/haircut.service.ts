import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { HaircutDTO } from '../models/HaircutDTO';

@Injectable({
  providedIn: 'root',
})
export class HaircutService {
  haircuts: HaircutDTO[] = [
    {
      id: '1',
      imageURL:
        'https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/11732/original/David-Beckham.jpg',
      price: 120,
      title: 'Coupe Beckham',
      estimatingTime: '10 min',
      description:
        "Ce chic 'do conserve une finition soignée sur les bords, tandis que la longueur plus longue à travers le haut est ramenée vers l'arrière pour un look et une sensation classiques",
    },
    {
      id: '2',
      imageURL:
        'https://www.menshairstyletrends.com/wp-content/uploads/2020/12/Taper-Fade-with-Waves-braidsmasterdorian.jpg',
      price: 100,
      title: '360 Waves',
      estimatingTime: '50 min',
      description:
        "La coupe de cheveux des vagues est une coupe à la mode. Pour des vagues complètes à 360 °, obtenez un fondu effilé qui ne coupe que les favoris et le décolleté",
    },
    {
      id: '3',
      imageURL:
        'https://haircutinspiration.com/wp-content/uploads/Jins-Messy-Curtain-Hair-e1535448501869.jpg',
      price: 60,
      title: 'Jin\'s Messy',
      estimatingTime: '20 min',
      description:
        "Même si le membre du BTS peut être connu pour ses teintures capillaires colorées, nous le voyons ici avec un look plus naturel et réservé qui favorise ses traits.",
    },
    {
      id: '4',
      imageURL:
        'https://i0.wp.com/therighthairstyles.com/wp-content/uploads/2015/10/1-mens-undercut-with-dreadlocks.jpg?zoom=1.25&resize=500%2C500&ssl=1',
      price: 80,
      title: 'dread locks',
      estimatingTime: '45 min',
      description: "Assez souvent, les gars trouvent qu'il est beaucoup plus facile de gérer les dreads courtes que les longues. Dread lock est un beau style qui nécessite peu d'entretien"
    },
    {
      id: '5',
      imageURL:
        'https://www.menshairstylesnow.com/wp-content/uploads/2020/06/Odell-Beckham-Jr-Haircut.jpg',
      price: 35,
      title: 'Mohawk Burst Fade',
      estimatingTime: '25 min',
      description:
        "Après tout, le fondu mohawk éclaté est une coupe de cheveux élégante et flatteuse lorsqu'il est fait correctement. Le burst fade mohawk, également connu sous le nom de fondu du sud de la France",
    },
    {
      id: '6',
      imageURL:
        'https://i.pinimg.com/564x/17/bb/8d/17bb8d423273c7ee8ea3849d94c6692e.jpg',
      price: 45,
      title: 'la coupe à la new-yorkaise',
      estimatingTime: '35 min',
      description:
        "La coupe de cheveux homme mi long la plus répandue ces derniers temps est la coupe Undercut, similaire de la coupe pompadour. Cette coupe de cheveux est tendance.",
    },
    {
      id: '7',
      imageURL:
        'https://archzine.fr/wp-content/uploads/2017/10/coiffure-ame%CC%81ricaine-de%CC%81grade%CC%81-coupe-de-cheveux-homme-court-sur-les-cote%CC%81s-long-dessus.jpg',
      price: 50,
      title: 'Coupe Undercut',
      estimatingTime: '20 min',
      description:
        "Cette coupe représente une coupe carrée, mais un peu plus longue que le modèle classique. cette coiffure est travaillée sur deux longueurs, révélant des côtés courts et une nuque dégagée ainsi qu'une masse capillaire",
    },
    {
      id: '8',
      imageURL:
        'https://guidelook.fr/wp-content/uploads/2020/06/degrade-homme-curly.jpg',
      price: 75,
      title: 'Coupe Dégradé',
      estimatingTime: '45 min',
      description:
        "N’oubliez pas de demander des contours pour une coupe bien nette, ou avec des contours plus approximatifs pour un effet plus naturel sur votre coupe de cheveux.",
    },
  ] as Array<HaircutDTO>;

  /**
   * Method to get all haircuts
   * @returns HaircutDTO[]
   */
  getHaircuts(): Observable<HaircutDTO[]> {
    return new Observable<HaircutDTO[]>((observer) => {
      observer.next(this.haircuts);
    }).pipe(
      retry(3),
      catchError((error) => {
      console.log(error);
      return throwError(error);
    }));
  }

  /**
   * Fonction qui permet de récuperer le model de coiffure grâce à l'ID
   * @param id ID de la coiffure
   * @return HaircutDTO
   * */
  getHaircut(id: string): Observable<HaircutDTO> {
    return new Observable<HaircutDTO>((observer) => {
        this.getHaircuts().subscribe((haircuts: HaircutDTO[]) => {
          const hr = haircuts.find(haircut => haircut.id === id)
          observer.next(hr);
        })
      }
    ).pipe(
      retry(3),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }
}
