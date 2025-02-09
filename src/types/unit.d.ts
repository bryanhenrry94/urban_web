export interface Unit {
  type: string;
  name: string;
  // characteristics?: {
  //   bedrooms: number;
  //   bathrooms: number;
  //   area_m2: number;
  //   parking_spaces: number;
  //   pets_allowed: boolean;
  //   furnished: boolean;
  //   year_built: number;
  // };
  owner?: string | null;
  residents: { resident: string }[];
}

export interface UnitAPI {
  _id: string;
  tenand: string;
  type: string;
  name: string;
  owner: string | null | undefined;
  residents: { resident: string }[];
  createdAt: string;
  updatedAt: string;
}
