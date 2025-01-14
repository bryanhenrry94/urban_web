export interface Company {
  ruc: string;
  name: string;
  address?: string;
  phone?: string;
  email: string;
}

export interface APICompany {
  _id: string;
  name: string;
  ruc: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  apiKey: string;
  createdAt: string;
}
