import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  array: number[] = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.array.push(i);
    }
  }

}
