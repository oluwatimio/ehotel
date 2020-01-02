import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../utils/redux/store';
import {PostgreService} from '../../utils/services/postgre.service';
import {HttpClient} from '@angular/common/http';
import {GuidService} from '../../utils/backend/guidgen/guid.service';
import {Results} from '../../utils/classes/Results';
declare var $: any;

@Component({
  selector: 'app-hdashboard',
  templateUrl: './hdashboard.component.html',
  styleUrls: ['./hdashboard.component.css']
})
export class HdashboardComponent implements OnInit {
  hotelChains: any[][] = [];
  hotels: any[][] = [];
  rooms: any[][] = [];
  bookings: any[][] = [];
  roomHotelIDPrice: Map<string, number> = new Map();
  totalAmountEarned = 0;
  averagePricePerBooking = 0;
  constructor( private ngRedux: NgRedux<AppState>, private postgreService: PostgreService, private guidService: GuidService) {}
  ngOnInit() {
    this.ngRedux.select('loggedIn').subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.getDashboardHotels();
        this.getDashboardRoomsAndBookings();
      }
    });
  }
  getDashboardHotels() {
    this.ngRedux.select('hotelChainsDashboard').subscribe((dashboardChains: any[][]) => {
      this.hotelChains = dashboardChains;
    });
    this.loadHotelChains();

    this.ngRedux.select('hotelDashboard').subscribe((dashboardHotels: any[][]) => {
      this.hotels = dashboardHotels;
    });
    this.loadHotels();
  }

  async getDashboardRoomsAndBookings() {
    this.ngRedux.select('roomDashboard').subscribe((dashboardRooms: any[][]) => {
      this.rooms = dashboardRooms;
    });
    await this.loadRooms();
    this.ngRedux.select('bookingDashboard').subscribe((dashboardBooking: any[][]) => {
      this.bookings = dashboardBooking;
    });
    await this.loadBookings();
    this.caluclateTotalAmountEarned();
  }

  loadHotelChains() {
    if (this.ngRedux.getState().fireAuthObject) {
      this.postgreService.getAllHotelChainsForDashboard(this.ngRedux.getState().fireAuthObject.uid);
    }
  }
  loadHotels() {
    if (this.ngRedux.getState().fireAuthObject) {
      this.postgreService.getAllHotelsForDashboard(this.ngRedux.getState().fireAuthObject.uid);
    }
  }
  async loadRooms() {
    if (this.ngRedux.getState().fireAuthObject) {
      await this.postgreService.getAllRoomsForDashboard(this.ngRedux.getState().fireAuthObject.uid);
    }
  }
  async loadBookings() {
    if (this.ngRedux.getState().fireAuthObject) {
      await this.postgreService.getAllBookingsForDashboard(this.ngRedux.getState().fireAuthObject.uid);
    }
  }
  functioncall() {
    alert('Clicked Chart');
  }
  addHotelChainModal() {
    $('#addChainModal').modal({show: true, backdrop: true, keyboard: true});
  }
  addHotelModal() {
    $('#addHotelModal').modal({show: true, backdrop: true, keyboard: true});
  }
  addRoomModal() {
    $('#addRoomModal').modal({show: true, backdrop: true, keyboard: true});
  }
  addBookingModal() {
    $('#addBookingModal').modal({show: true, backdrop: true, keyboard: true});
  }

  addChain = (chainName: string) => {
    this.guidService.generateUniqueId().then((chainId: string) => {
      this.postgreService.addChain(chainId, chainName, 0, this.ngRedux.getState().fireAuthObject.uid);
      $('#addChainModal').modal('hide');
    });
  }

  addHotel = (chainid: string, name: string, email: string, phoneNumber: number, rating: number, address: string) => {
    this.guidService.generateUniqueId().then((hotelId: string) => {
      this.postgreService.addHotel(chainid, hotelId, name, email, phoneNumber, rating, address,
        this.ngRedux.getState().fireAuthObject.uid);
      $('#addHotelModal').modal('hide');
    });
  }

  addRoom = (hotelId: string, ammenities: string, view: string, price: number, capacity: number, extension: boolean,
             roomnumber: number) => {
    this.guidService.generateUniqueId().then(roomId => {
      this.postgreService.addRoom(hotelId, ammenities, view, price, capacity, false,
        this.ngRedux.getState().fireAuthObject.uid, roomnumber, roomId);
      $('#addRoomModal').modal('hide');
    });
  }

  addBooking = (roomNumber: number, hotelID: number, customerName: string, ssn: string) => {
    this.guidService.generateUniqueId().then((bid: string) => {
      this.postgreService.addBooking(roomNumber, hotelID, customerName, ssn, bid);
      $('#addBookingModal').modal('hide');
    });
  }

  caluclateTotalAmountEarned = () => {
    this.totalAmountEarned = 0;
    this.averagePricePerBooking = 0;
    this.rooms.forEach((room) => {
      this.roomHotelIDPrice.set(room[0] + room[2], parseFloat(room[3]));
    });

    this.bookings.forEach((booking) => {
      console.log(booking[2] + booking[1]);
      const key = booking[2] + booking[1];
      if (this.roomHotelIDPrice.has(key)) {
        this.totalAmountEarned += this.roomHotelIDPrice.get(key);
      }
    });
    this.averagePricePerBooking = this.totalAmountEarned / this.bookings.length;
  }
}
