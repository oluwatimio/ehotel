import {
  add_available_rooms_for_booking,
  add_dashboard_booking,
  add_dashboard_chain,
  add_dashboard_hotel,
  add_dashboard_room, add_hotels,
  add_user,
  login_user, logout
} from './action';
import {BehaviorSubject, Subject} from 'rxjs';
import {Accounts} from '../classes/Accounts';
import {User} from '../classes/User';
import {Employee} from '../classes/Employee';
import * as firebase from 'firebase';
import {HotelChain} from '../classes/HotelChain';
import {Hotel} from '../classes/Hotel';
import {Room} from '../classes/Room';

export interface AppState {
  user: any;
  hotelChainsDashboard: any[][];
  hotelDashboard: any[][];
  roomDashboard: any[][];
  bookingDashboard: any[][];
  loggedIn: boolean;
  lastUpdate: Date;
  signInToken: string;
  fireAuthObject: firebase.User;
  availableRoomsForBookingHotel: any[][];
  availableHotelsForBooking: any[][];
  userType: string;
}
export function rootReducer(state: AppState, action) { // Our root reducer describing what happens to state when
  // each action takes place. Returns new state object With new modifications
  switch (action.type) { // Switch between action types
    case add_user:
      return Object.assign({}, state, {
        loggedIn: true,
        user: createUserObject(action.userObj),
        lastUpdate: new Date(),
        signInToken: action.userObj.idToken,
        fireAuthObject: action.userObj.fireAuth,
        userType: action.userObj.userType
      });
    case login_user:
      return Object.assign({}, state, {
        loggedIn: true,
        user: createUserObject(action.userObj),
        lastUpdate: new Date(),
        signInToken: action.userObj.idToken,
        fireAuthObject: action.userObj.fireAuth,
        userType: action.userObj.userType
      });
    case add_dashboard_chain:
      return Object.assign({}, state, {
        user: addHotelChain(state, action),
        hotelChainsDashboard: state.hotelChainsDashboard
      });
    case add_dashboard_hotel:
      return Object.assign({}, state, {
        user: addHotel(state, action),
        hotelDashboard: state.hotelDashboard
      });
    case add_dashboard_room:
      return Object.assign({}, state, {
        user: addRoom(state, action),
        roomDashboard: state.roomDashboard
      });
    case add_dashboard_booking:
      return Object.assign({}, state, {
        user: addBooking(state, action),
        bookingDashboard: state.bookingDashboard
      });
    case add_available_rooms_for_booking:
      return Object.assign({}, state, {
        availableRoomsForBookingHotel: makeAvailableRoomsArray(action.availableRooms)
      });
    case add_hotels:
      return Object.assign({}, state, {
        availableHotelsForBooking: action.availableHotels
      });
    case logout:
      return Object.assign({}, state, {
        ...action.resetState
      });
  }
  return state;
}

function createUserObject(userObject: any) {
  return userObject.userType === Accounts.REGULAR ? new User(userObject.firstname, userObject.lastname, userObject.email, userObject.ssn) :
    new Employee(userObject.name, userObject.name, userObject.email, userObject.essn);
}

const addHotelChain = (state, action) => {
  if (action.chains.length > 1) {state.hotelChainsDashboard = []; }
    action.chains.forEach((chain) => {
      const chainData = [];
      chainData.push(chain.chainid);
      chainData.push(chain.name);
      chainData.push(chain.numhotels);
      const hotelChain = new HotelChain(chain.name, chain.numhotels, chain.chainid);
      state.user.addToHotelChains(hotelChain);
      state.hotelChainsDashboard.push(chainData);
    });
    return state.user;
};

const addHotel = (state, action) => {
  if (action.hotels.length > 1) {state.hotelDashboard = []; }
  action.hotels.forEach((hotel) => {
    const hotelData = [];
    hotelData.push(hotel.hotelid);
    hotelData.push(hotel.name);
    hotelData.push(hotel.numrooms);
    hotelData.push(hotel.address);
    hotelData.push(hotel.numbookings);
    const hotelObject = new Hotel(hotel.hotelid, hotel.name, hotel.numrooms, hotel.address,
      hotel.numbookings);
    state.user.addToHotels(hotelObject);
    state.hotelDashboard.push(hotelData);
  });
  return state.user;
};

const addRoom = (state, action) => {
  if (action.rooms.length > 1) {state.roomDashboard = []; }
  action.rooms.forEach((room) => {
    const roomData = [];
    roomData.push(room.roomid);
    roomData.push(room.roomnumber);
    roomData.push(room.hotelid);
    roomData.push(room.price);
    roomData.push(room.capacity);
    // roomData.push(room.booked);
    const roomObject = new Room(room.roomid, room.roomnumber, room.hotelid, room.price, room.capacity, room.booked);
    state.user.addToRooms(roomObject);
    state.roomDashboard.push(roomData);
  });
  return state.user;
};

const addBooking = (state, action) => {
  if (action.bookings.length > 1) {state.bookingDashboard = []; }
  action.bookings.forEach((booking) => {
    const bookingData = [];
    bookingData.push(booking.fullname);
    bookingData.push(booking.hotelid);
    bookingData.push(booking.roomid);
    bookingData.push(booking.bid);
    state.bookingDashboard.push(bookingData);
  });
  return state.user;
};

const makeAvailableRoomsArray = (rooms) => {
  const roomsArray = [];

  rooms.forEach((roomObject) => {
    const room = [];
    room.push(roomObject.roomid);
    room.push(roomObject.roomnumber);
    room.push(roomObject.ammenities);
    room.push(roomObject.capacity);
    room.push(roomObject.price);
    roomsArray.push(room);
  });
  return roomsArray;
};

export const INITIAL_STATE: AppState = {
  user: null,
  loggedIn: false,
  lastUpdate: null,
  signInToken: null,
  fireAuthObject: null,
  hotelChainsDashboard: [],
  hotelDashboard: [],
  roomDashboard: [],
  bookingDashboard: [],
  availableRoomsForBookingHotel: [],
  availableHotelsForBooking: [],
  userType: null
};
