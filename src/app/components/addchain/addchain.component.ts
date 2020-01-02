import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-addchain',
  templateUrl: './addchain.component.html',
  styleUrls: ['./addchain.component.css']
})
export class AddchainComponent implements OnInit {
  @Input() theme: string;
  @Input() addChain: Function;
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.ref.detectChanges();
  }

}
