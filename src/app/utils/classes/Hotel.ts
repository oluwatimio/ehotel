export class Hotel {
  hotelId: string;
  hotelName: string;
  numRooms: number;
  address: string;
  numBookings: number;
  constructor(hotelId: string, hotelName: string, numRooms: number, address: string, numBookings: number) {
    this.hotelId = hotelId;
    this.hotelName = hotelName;
    this.numRooms = numRooms;
    this.address = address;
    this.numBookings = numBookings;
  }
}
