import {User} from './User';
import {HotelChain} from './HotelChain';
import {Hotel} from './Hotel';
import {Booking} from './Booking';
import {Room} from './Room';

export class Employee extends User {
  private _hotelChains: HotelChain[] = [];
  private _rooms: Room[] = [];
  private _hotels: Hotel[] = [];
  private hotelIdName: Map<string, string> = new Map();
  private roomIdNum: Map<string, number> = new Map();
  private _bookings: Booking[] = [];
  constructor(firstName: string, lastName: string, email: string, essn: string) {
    super(firstName, lastName, email, essn);
  }

  public addToHotelChains(chain: HotelChain) {
    this._hotelChains.push(chain);
  }
  public addToRooms(room: Room) {
    this._rooms.push(room);
    this.roomIdNum.set(room.roomId, room.roomNumber);
  }
  public addToHotels(hotel: Hotel) {
    this._hotels.push(hotel);
    this.hotelIdName.set(hotel.hotelId, hotel.hotelName);
  }
  public addToBookings(booking: Booking) {
    this._bookings.push(booking);
  }
  public getHotelNameFromId(hotelId: string): string {
    return this.hotelIdName.get(hotelId);
  }
  public getRoomNumFromId(roomId: string): number {
    return this.roomIdNum.get(roomId);
  }
}
