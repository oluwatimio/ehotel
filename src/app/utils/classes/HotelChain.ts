export class HotelChain {
  private name: string;
  private numHotels: number;
  private ID: string;
  constructor(name: string, numHotels: number, ID: string) {
    this.name = name;
    this.numHotels = numHotels;
    this.ID = ID;
  }
  get id() {
    return this.ID;
  }
}
