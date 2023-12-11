export interface IFeatures {
  name: string;
  surcharge: boolean;
}

export interface IAmenities {
  _id: string;
  name: string;
  features: IFeatures[];
  createdAt: string;
  updatedAt: string;
}
