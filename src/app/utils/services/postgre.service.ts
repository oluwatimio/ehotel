import { Injectable, Component } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../redux/store';
import {Accounts} from '../classes/Accounts';
import {Results} from '../classes/Results';
import {
  add_available_rooms_for_booking,
  add_dashboard_booking,
  add_dashboard_chain,
  add_dashboard_hotel,
  add_dashboard_room, add_hotels
} from '../redux/action';
import {HotelChain} from '../classes/HotelChain';
import {Hotel} from '../classes/Hotel';
import {Room} from '../classes/Room';
import {API_BASE} from '../backend/api-v1/routes';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PostgreService {
  API_LINK = API_BASE();
  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>, private _snackBar: MatSnackBar) { }

  addChain(chainId: string, name: string, numHotels: number, uid: string) {
    const queryObject = {chainid: chainId, name: name, numhotels: numHotels, uid: uid, token: this.ngRedux.getState().signInToken};
    const queryString = this.API_LINK + '/chain/add';

    this.http.post(queryString, JSON.stringify(queryObject),
      {headers: {'Content-Type': 'application/json'}}).subscribe((response: any) => {
        if (response.result === Results.OK) {
          this.ngRedux.dispatch({type: add_dashboard_chain, chains: [response.payload], updateOperation: true});
          this._snackBar.open('Chain add successful' , 'Dismiss', {
            duration: 5000,
          });
        }
    });
  }

  addHotel(chainid: string, hotelid: string, name: string, email: string, phoneNumber: string, rating: number, address: string,
           uid: string, imageLink: string) {
    const queryObject = {
      name: name,
      chainid: chainid,
      hotelid: hotelid,
      email: email,
      phone: phoneNumber,
      rating: rating,
      address: address,
      uid: uid,
      imagelink: imageLink,
      token: this.ngRedux.getState().signInToken
    };

    const queryString = this.API_LINK + '/hotel/add';

    this.http.post(queryString, JSON.stringify(queryObject),
      {headers: {'Content-Type': 'application/json'}}).subscribe((response: any) => {
        if (response.result === Results.OK) {
          this.ngRedux.dispatch({type: add_dashboard_hotel, hotels: [response.payload], updateOperation: true});
          this._snackBar.open('Hotel add successful' , 'Dismiss', {
            duration: 5000,
          });
        }
    });
  }

  addRoom(hotelId: string, ammenities: string, view: string, price: number, capacity: number, extension: boolean, uid: string,
          roomnumber: number, roomid: string) {
    const queryObject = {
      roomid: roomid,
      roomnumber: roomnumber,
      hotelid: hotelId,
      ammenities: ammenities,
      damages: '',
      price: price,
      view: view,
      capacity: capacity,
      extension: extension,
      uid: uid,
      token: this.ngRedux.getState().signInToken
    };

    const queryString = this.API_LINK + '/room/add';
    this.http.post(queryString, JSON.stringify(queryObject), {headers: {'Content-Type': 'application/json'}})
      .subscribe((response: any) => {
        if (response.result === Results.OK) {
          this.ngRedux.dispatch({type: add_dashboard_room, rooms: [response.payload], updateOperation: true});
          this._snackBar.open('Room add successful' , 'Dismiss', {
            duration: 5000,
          });
        }
      });
  }
  addBooking(roomNumber: number, hotelID: number, customerName: string, ssn: string, bid: string) {
    const queryObject = {
      bid: bid,
      roomid: roomNumber,
      ssn: ssn,
      hotelid: hotelID,
      fullname: customerName,
      token: this.ngRedux.getState().signInToken
    };
    const queryString = this.API_LINK + '/room/book';

    this.http.post(queryString, JSON.stringify(queryObject), {headers: {'Content-Type': 'application/json'}})
      .subscribe((response: any) => {
        this._snackBar.open('Hotel Room ' + roomNumber + ' successfully booked' , 'Dismiss', {
          duration: 5000,
        });
        if (response.result === Results.OK && this.ngRedux.getState().userType === Accounts.EMPLOYEE) {
          this.ngRedux.dispatch({type: add_dashboard_booking, bookings: [response.payload], updateOperation: true});
        }
      });
  }

  getAllHotelChainsForDashboard(uid: string) {
    const params = new HttpParams().set('uid', uid);
    const queryString = this.API_LINK + '/chain/all';

    this.http.get(queryString, {headers: {'Content-Type': 'application/json'}, params: params}).subscribe((result: any) => {
      if (result.result === Results.OK) {
        this.ngRedux.dispatch({type: add_dashboard_chain, chains: result.payload, updateOperation: false});
      }
    });
  }

  getAllHotelsForDashboard(uid: string) {
    const params = new HttpParams().set('uid', uid);
    const queryString = this.API_LINK + '/hotel/dashboard/all';

    this.http.get(queryString, {headers: {'Content-Type': 'application/json'}, params: params}).subscribe((response: any) => {
      if (response.result === Results.OK) {
        this.ngRedux.dispatch({type: add_dashboard_hotel, hotels: response.payload, updateOperation: false});
      }
    });
  }

  getAllRoomsForDashboard(uid: string) {
    return new Promise(resolve => {
      const params = new HttpParams().set('uid', uid);
      const queryString = this.API_LINK + '/hotel/rooms/dashboard/all';

      this.http.get(queryString, {headers: {'Content-Type': 'application/json'}, params: params}).subscribe((response: any) => {
        if (response.result === Results.OK) {
          this.ngRedux.dispatch({type: add_dashboard_room, rooms: response.payload, updateOperation: false});
          resolve();
        }
      });
    });
  }

  getAllBookingsForDashboard(uid: string) {
    return new Promise(resolve => {
      const params = new HttpParams().set('uid', uid);
      const queryString = this.API_LINK + '/hotel/bookings';

      this.http.get(queryString, {headers: {'Content-Type': 'application/json'}, params: params}).subscribe((response: any) => {
        if (response.result === Results.OK) {
          this.ngRedux.dispatch({type: add_dashboard_booking, bookings: response.payload, updateOperation: false});
          resolve();
        }
      });
    });
  }

  getAvailableRoomsForHotelBooking(hotelid: string) {
    const queryString = this.API_LINK + '/room/available';
    const params = new HttpParams().set('hotelid', hotelid);
    this.http.get(queryString, {headers: {'Content-Type': 'application/json'}, params: params}).subscribe((response: any) => {
      if (response.result === Results.OK) {
        console.log(response);
        this.ngRedux.dispatch({type: add_available_rooms_for_booking, availableRooms: response.payload});
      }
    });
  }

  getAllHotelsForBooking() {
    const queryString = this.API_LINK + '/hotel/all';

    this.http.get(queryString, {headers: {'Content-Type': 'application/json'}}).subscribe((response: any) => {
      if (response.result === Results.OK) {
        this.ngRedux.dispatch({type: add_hotels, availableHotels: response.payload});
      }
    });
  }
}
