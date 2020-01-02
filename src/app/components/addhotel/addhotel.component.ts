import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  styleUrls: ['./addhotel.component.css']
})
export class AddhotelComponent implements OnInit {
  @Input() theme: string;
  @Input() addHotel: Function;
  constructor() { }

  ngOnInit() {
  }

}
