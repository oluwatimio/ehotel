export class Room {
  roomId: string
  roomNumber: number;
  hotelId: string;
  price: number;
  capacity: number;
  booked: boolean;

  constructor(roomId: string, roomNumber: number, hotelId: string, price: number, capacity: number, booked: boolean) {
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.hotelId = hotelId;
    this.price = price;
    this.capacity = capacity;
    this.booked = booked;
  }
}
