import { Component, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  haircuts: Haircut[] = [];

  constructor(private dataImService: DataImService) {
    this.haircuts = this.dataImService.getHaircuts();
  }

  ngOnInit(): void {}
}
