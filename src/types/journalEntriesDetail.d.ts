import { IJournalEntries } from "./journalEntries";
import { IChartAccount } from "./chartAccount";
import { ICostCenters } from "./costCenters";

export interface JournalEntriesDetail {
  _id: string;
  journal_entry: IJournalEntries;
  account: IChartAccount;
  debit: number;
  credit: number;
  cost_center: ICostCenters | null;
}

export interface JournalEntriesDetailForm {
  journal_entry: string;
  account: string;
  debit: number;
  credit: number;
  cost_center: string;
}
