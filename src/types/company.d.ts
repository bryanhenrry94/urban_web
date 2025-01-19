export interface Company {
  identification: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  email: string;
}

export interface CompanyOnboarding {
  identification: string;
  name: string;
  email: string;
}

export interface APICompany {
  _id: string;
  name: string;
  identification: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  apiKey: string;
  createdAt: string;
}
