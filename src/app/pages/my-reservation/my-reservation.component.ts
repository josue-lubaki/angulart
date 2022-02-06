import { Component, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from '../../services/data-im.service';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss'],
})
export class MyReservationComponent implements OnInit {
  haircuts: Haircut[] = [];

  constructor(public data: DataImService) {
    this.haircuts = this.data.getHaircuts();
  }

  ngOnInit(): void {}
}
