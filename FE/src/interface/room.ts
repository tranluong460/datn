import { IImage } from ".";

export interface IRoom {
  _id: string;
  images: IImage[];
  quantity: number;
  price: number;
  status: string;
  description: string;
  id_amenities: string[];
  id_hotel: string;
  id_roomType: string;
  createdAt: string;
  updatedAt: string;
}
