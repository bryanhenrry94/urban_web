export type Person = {
  name: string;
  email: string;
  identification: string;
  phone?: yup.Maybe<string | undefined>;
  address?: yup.Maybe<string | undefined>;
  roles: (string | undefined)[];
  companyName?: yup.Maybe<string | undefined>;
};

export interface APIPerson {
  _id: string;
  name: string;
  email: string;
  identification: string;
  phone?: yup.Maybe<string | undefined>;
  address?: yup.Maybe<string | undefined>;
  roles: (string | undefined)[];
  companyName?: yup.Maybe<string | undefined>;
  createdAt: string;
}
