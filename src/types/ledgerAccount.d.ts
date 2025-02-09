export interface LedgerAccount {
  _id: string;
  code: string;
  name: string;
  type: string;
  balance: number;
  level: number;
  parentAccount: string;
  children: LedgerAccount[];
}
