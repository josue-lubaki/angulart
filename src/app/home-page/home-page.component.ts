import { Component, OnInit } from '@angular/core';
import { Haircut } from '../models/Haircut';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  haircuts: Haircut[] = [
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      price: 20,
      title: 'degrade'
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1568339434343-2a640a1a9946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
      price: 40,
      title: 'degrade'
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 60,
      title: 'coupe réguliere'
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1606333259737-6da197890fa2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      price: 80,
      title: 'dread locks'
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1627100232173-acf3733f02bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80',
      price: 15,
      title: 'courts'
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80',
      price: 40,
      title: 'degrade'  
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80',
      price: 40,
      title: 'degrade'  
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1590769639599-2c056eef52b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      price: 40,
      title: 'degrade'  
    },
    {
      mainImageUrl: 'https://images.unsplash.com/photo-1598547461182-45d03f6661e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 40,
      title: 'degrade'  
    }
  ] as Array<Haircut>;

  constructor() { }

  ngOnInit(): void {
  }

}
