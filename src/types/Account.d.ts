export interface Account {
  _id: string;
  code: string;
  name: string;
  type: string;
  balance: number;
  level: number;
  parentAccount: string;
  children: Account[];
}

export interface PostAccount {
  code: string;
  name: string;
  type: string;
  balance: number;
  level: number;
  parentAccount: string;
  children: Account[];
}

export interface PutAccount {
  code: string;
  name: string;
  type: string;
  balance: number;
  level: number;
  parentAccount: string;
  children: Account[];
}
