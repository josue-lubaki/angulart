import { Component, OnInit } from '@angular/core';
import { DataImService } from 'src/app/services/data-im.service';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss']
})
export class DetailReservationComponent implements OnInit {

  constructor(public data:DataImService) { }
   public s=this.data.coupe[0];
  ngOnInit(): void {
  }

}
