import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headers: string[];
  @Input() tableData: string[][];
  @Input() btnActionColor: string;
  @Input() addAction: Function;
  @Input() addText: string;
  @Input() textColor: string;
  constructor() { }

  ngOnInit() {
  }

}
