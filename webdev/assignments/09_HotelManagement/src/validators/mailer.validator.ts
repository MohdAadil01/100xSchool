export type NodemailerInputType = {
  guestName: string;
  confirmationNo: string;
  hotelName: string;
  hotelAddress: string;
  hotelPhone: string;
  hotelEmail: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  roomType: string;
  ratePlan: string;
  pricePerNight: number;
  totalAmount: number;
  specialRequests?: string;
};
