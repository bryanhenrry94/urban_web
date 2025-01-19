import { UrbanizationAPI } from "./urbanization";
import { ResidentAPI } from "./resident";

export type Property = {
  urbanizationId: string;
  unitType: string;
  unitNumber: string;
  residents?: { residentId: string }[] | undefined;
};

export interface PropertyAPI {
  _id: string;
  urbanizationId: UrbanizationAPI;
  unitType: string;
  unitNumber: string;
  residents: ResidentAPI[];
  createdAt: string;
  updatedAt: string;
}
