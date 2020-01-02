import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-customernamedialog',
  templateUrl: './customernamedialog.component.html',
  styleUrls: ['./customernamedialog.component.css']
})
export class CustomernamedialogComponent implements OnInit {
  @Input() theme: string;
  @Input() addBooking: Function;
  constructor() { }

  ngOnInit() {
  }

}
