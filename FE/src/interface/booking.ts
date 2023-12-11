export interface IBooking {
  _id: string;
  id_user: string;
  check_in: string;
  check_out: string;
  total_price: number;
  payment_method: string;
  list_room: IRoomBooking[];
  status: string;
  createdAt: string;
  updatedAt: string;
  id_payment: string;
}

export interface IRoomBooking {
  idRoom: string;
  quantity: number;
}
