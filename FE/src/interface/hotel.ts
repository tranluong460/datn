export interface IImage {
  url: string;
}

export interface IHotel {
  _id: string;
  name: string;
  images: IImage[];
  address: string;
  phone: string;
  status: string;
  email: string;
  description: string;
  city: string;
  id_amenities: string[];
  id_room: string[];
  id_review: string[];
  createdAt: string;
  updatedAt: string;
}
