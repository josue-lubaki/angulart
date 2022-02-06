import { Component, Input, OnInit } from '@angular/core';
import { Haircut } from 'src/app/models/Haircut';

@Component({
  selector: 'app-haircut-card',
  templateUrl: './haircut-card.component.html',
  styleUrls: ['./haircut-card.component.scss']
})
export class HaircutCardComponent implements OnInit {
  
  @Input() 
  data!: Haircut;
  constructor() { }

  ngOnInit(): void {
  }

}
