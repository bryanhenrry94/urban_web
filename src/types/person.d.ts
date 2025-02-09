export interface IPerson {
  name?: string;
  surname?: string;
  companyName?: string;
  phone?: string;
  address?: string;
  roles?: string[];
  type: string;
  numberId: string;
  email: string;
}

export interface IPersonAPI {
  _id: string;
  tenant: string;
  name?: string;
  surname?: string;
  companyName?: string;
  phone?: string;
  address?: string;
  roles?: string[];
  type: string;
  numberId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonTableProps {
  rows: IPersonAPI[];
  refresh: () => void;
}