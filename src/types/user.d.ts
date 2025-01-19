import { UrbanizationAPI } from "./urbanization";
import { ResidentAPI } from "./resident";

export interface User {
  urbanizationId?: yup.Maybe<string | undefined>;
  residentId?: yup.Maybe<string | undefined>;
  email: string;
  name: string;
  role: string;
  status: string;
}

export interface UserProfile {
  name: string;
}

export interface APIUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  urbanizationId: UrbanizationAPI;
  residentId: ResidentAPI;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
