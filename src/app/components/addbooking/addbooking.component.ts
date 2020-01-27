import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {
  @Input() theme: string;
  @Input() addBooking: Function;
  constructor() { }

  ngOnInit() {
  }
  // checkBookingIsValid(roomNumber: number, hotelId: string,
  // cname: string, ssn: string) {
  //   if (roomNumber.strip)
  // }

}
