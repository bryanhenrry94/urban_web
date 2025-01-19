export interface Urbanization {
  name: string;
  address?: yup.Maybe<string | undefined>;
  services?: yup.Maybe<
    | {
        name: string;
        frequency: string;
        rate: number;
      }[]
    | undefined
  >;
}

export interface UrbanizationAPI {
  _id: string;
  name: string;
  address?: string;
  services?: {
    name: string;
    frequency: string;
    rate: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
