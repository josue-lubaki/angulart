import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';
import { DataImService } from 'src/app/services/data-im.service';

@Component({
  selector: 'app-detail-haircut',
  templateUrl: './detail-haircut.component.html',
  styleUrls: ['./detail-haircut.component.scss'],
})
export class DetailHaircutComponent implements OnInit {
  haircut?: Haircut;

  constructor(
    public dataImService: DataImService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the ID of the hairstyle then find its information
    this.route.paramMap.subscribe((params) => {
      this.haircut = this.dataImService
        .getHaircuts()
        .find((haircut) => haircut.id === params.get('id'));
    });
  }
}
