import { IRoom, IUser } from ".";

export interface IBooking {
  _id: string;
  id_user: IUser;
  check_in: string;
  check_out: string;
  total_price: number;
  payment_method: string;
  list_room: IRoomBooking[];
  status: string;
  createdAt: string;
  updatedAt: string;
  id_payment: IPaymentBooking;
}

export interface IRoomBooking {
  idRoom: IRoom;
  quantity: number;
}

export interface IPaymentBooking {
  _id: string;
  id_booking: string;
  amount: number;
  code: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
