import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataImService {
  coupe=[
    {"date" : new Date(),"heure":75,"price":57.5,"estimating":"2 h",
      "url":"https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      "description":"hsfvayvaev aeeiuvauv fiufhuvhfv fviuvhreuifer vvhrwrwkvvevih viherfrihfrif uriwuhf irhw",
      titre:"coupe"},
    {"date" : new Date(),"heure":40,"price":67.5,"estimating":"45h",
      "url":"https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      "description":"hsfvayvaev aeeiuvauv fiufhuvhfv fviuvhreuifer vvhrwrwkvvevih viherfrihfrif uriwuhf irhw",
      titre:"coupe2"},
    {"date" : new Date(),"heure":20,"price":77.5,"estimating":"6 h",
      "url":"https://images.unsplash.com/photo-1621605810691-86520f5b5262?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      "description":"hsfvayvaev aeeiuvauv fiufhuvhfv fviuvhreuifer vvhrwrwkvvevih viherfrihfrif uriwuhf irhw",
      titre:"coupe3"}
  ];

  constructor() {


  }

}
