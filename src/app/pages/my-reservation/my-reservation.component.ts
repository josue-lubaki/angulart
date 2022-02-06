import { Component, OnInit } from '@angular/core';
import {DataImService} from "../../services/data-im.service";

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {


  constructor(public data:DataImService) {

  }

  ngOnInit(): void {
  }

}
