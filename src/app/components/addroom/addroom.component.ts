import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {
  @Input() theme: string;
  @Input() addRoom: Function;
  constructor() { }

  ngOnInit() {
  }

}
