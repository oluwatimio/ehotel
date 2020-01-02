import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../utils/redux/store';
import {add_user} from '../../utils/redux/action';
import {Router} from '@angular/router';
import {PostgreService} from '../../utils/services/postgre.service';
import {GuidService} from '../../utils/backend/guidgen/guid.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hotels: any[] = [];
  hotelClicked: any;
  availableRoomsForHotel: any[][] = [];
  roomClickedForBooking: any[];
  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>, private postgreService: PostgreService,
              private guidService: GuidService) {
  }

  ngOnInit() {
    this.ngRedux.select('loggedIn').subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.getHotels();
        this.watchAvailableRooms();
      }
    });
  }

  getHotels() {
    this.ngRedux.select('availableHotelsForBooking').subscribe((availableHotels: any[]) => {
      this.hotels = availableHotels;
      console.log(availableHotels);
    });
    this.postgreService.getAllHotelsForBooking();
  }

  watchAvailableRooms() {
    this.ngRedux.select('availableRoomsForBookingHotel').subscribe((availableRooms: any[]) => {
      this.availableRoomsForHotel = availableRooms;
    });
  }

  viewHotelInfo(hotel: any) {
    this.hotelClicked = hotel;
    console.log(hotel);
    this.postgreService.getAvailableRoomsForHotelBooking(hotel.hotelid);
    $('#hotelInfoModal').modal({show: true, backdrop: true, keyboard: true});
  }

  startBooking = (data: any) => {
    this.roomClickedForBooking = data;
    $('#addBookingCustomer').modal({show: true, backdrop: true, keyboard: true});
  }

  addBooking = (customerName: string) => {
    this.guidService.generateUniqueId().then((bid: string) => {
      this.postgreService.addBooking(this.roomClickedForBooking[0], this.hotelClicked.hotelid, customerName,
        this.ngRedux.getState().fireAuthObject.uid, bid);
      $('#addBookingCustomer').modal('hide');
      $('#hotelInfoModal').modal('hide');
    });
  }
}
