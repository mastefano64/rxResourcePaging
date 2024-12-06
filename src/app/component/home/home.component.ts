import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ ]
})
export class HomeComponent implements OnInit {
  title = 'Home';
  user: User | undefined;

  constructor() { }

  ngOnInit(): void {

  }

}

