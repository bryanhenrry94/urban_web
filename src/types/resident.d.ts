import { PropertyAPI } from "./property";
import { UrbanizationAPI } from "./urbanization";
import { APIUser } from "./user";

export type Resident = {
  userId: string;
  urbanizationId: string;
  propertyId: string;
  email: string;
  phone: string;
};

export interface ResidentAPI {
  _id: string;
  userId: APIUser;
  urbanizationId: UrbanizationAPI;
  propertyId: PropertyAPI;
  email: string;
  phone: string;
  tenant: string;
  createdAt: string;
  updatedAt: string;
}
