export type Person = {
  phone?: yup.Maybe<string | undefined>;
  address?: yup.Maybe<string | undefined>;
  companyName?: yup.Maybe<string | undefined>;
  name: string;
  email: string;
  idType: string;
  idNumber: string;
  roles: (string | undefined)[];
  companyId: string;
}

export interface APIPerson {
  _id: string;
  name: string;
  idType: string;
  idNumber: string;
  email: string;
  phone?: string;
  address?: string;
  roles: string[];
  companyName?: string;
  logo?: string;
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
