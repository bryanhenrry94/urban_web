import { PropertyAPI } from "./property";

export interface User {
  email: string;
  name: string;
  role: string;
  status: string;
  propertyId?: yup.Maybe<PropertyAPI | undefined>;
}

export interface UserProfile {
  name: string;
}

export interface APIUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  propertyId?: yup.Maybe<PropertyAPI | undefined>;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
