import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haircut } from 'src/app/models/Haircut';

@Component({
  selector: 'app-haircut-card',
  templateUrl: './haircut-card.component.html',
  styleUrls: ['./haircut-card.component.scss'],
})
export class HaircutCardComponent implements OnInit {
  @Input()
  haircut!: Haircut;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Method to getting the information of the haircut when the user click on the card
   * @param id the id of the card
   */
  haircutSelected(id: string): void {
    this.router.navigate(['/details', id]);
  }
}
