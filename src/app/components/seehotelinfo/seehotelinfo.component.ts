import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-seehotelinfo',
  templateUrl: './seehotelinfo.component.html',
  styleUrls: ['./seehotelinfo.component.css']
})
export class SeehotelinfoComponent implements OnInit {
  @Input() hotel: any;
  @Input() tableData: any[][];
  @Input() addAction: Function;
  constructor() {}
  ngOnInit() {}
  startBooking = (data: any) => {
    this.addAction(data);
  }
}
