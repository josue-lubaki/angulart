import {Time} from "@angular/common";
import {Client} from "./Client";
import {Barber} from "./Barber";

export class Reservation{
  date?:Date;
  time?:Time;
  description?: string;
  price?:number;
  duration?: number;
  imgURL?:string;
  haircut?:string;
  status?:string;
  client?:Client;
  barber?:Barber;

}
