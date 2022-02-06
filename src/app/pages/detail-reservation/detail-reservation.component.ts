import { Component, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss'],
})
export class DetailReservationComponent implements OnInit {
  haircut: Haircut;

  constructor(public dataImService: DataImService) {
    this.haircut = this.dataImService.getHaircuts()[0];
  }
  ngOnInit(): void {}
}
