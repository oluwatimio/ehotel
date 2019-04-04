import { Component, OnInit } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  array: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.http.get('http://localhost:8080/hotels').subscribe( result => {
      const g: any = result;
      for (let i = 0; i < g.length;  i++) {
        this.array.push(g[i]);
      }
      console.log(this.array);
    });
  }
  done() {

  }
}
