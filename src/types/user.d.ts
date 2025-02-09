import { PropertyAPI } from "./units";

export interface IUserForm {
  name: string;
  email: string;
  role: "resident" | "guard" | "admin";
  status: "active" | "inactive";
}

export interface IUserProfile {
  name: string;
}

export interface IUserAPI {
  _id: string;
  tenant: string;
  name: string;
  email: string;
  role: string;
  status: string;
  subscription: string;
  codeOTP: string;
  units?: { unit: string }[];
  profile?: {
    name: string;
    surname: string;
    country: string;
    phone: string;
    avatarUrl: string;
    documentId: string; // Número de identificación
    birthdate: Date;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserTableProps {
  rows: IUserAPI[];
}
