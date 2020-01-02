import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrls: ['./infocard.component.css']
})
export class InfocardComponent implements OnInit {
  @Input() headerName: string;
  @Input() statValue: string;
  @Input() statDescription: string;
  @Input() buttonAction: Function;
  @Input() backgroundColor: string;
  @Input() buttonString: string;
  constructor() { }

  ngOnInit() {

  }

}
