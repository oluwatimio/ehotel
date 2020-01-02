import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-librarytable',
  templateUrl: './librarytable.component.html',
  styleUrls: ['./librarytable.component.css']
})
export class LibrarytableComponent implements OnInit {
  @Input() itemControlColor: string;
  @Input() btnAddColor: string;
  @Input() textColor: string;
  @Input() headerName: string;
  @Input() headerColor: string;
  @Input() headers: string[];
  @Input() addText: string;
  @Input() editAction: Function;
  @Input() deleteAction: Function;
  @Input() infoAction: Function;
  @Input() addAction: Function;
  @Input() tableData: any[];
  constructor() {}

  ngOnInit() {
  }

}
