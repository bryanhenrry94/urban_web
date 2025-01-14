export interface User {
  email: string;
  name: string;
  role: string;
  status: string;
}

export interface APIUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  companyId: {
    _id: string;
    name: string;
    ruc: string;
    address?: string;
    phone?: string;
    email?: string;
    logo?: string;
    apiKey: string;
    createdAt: string;
  };
  createdAt: string;
}
