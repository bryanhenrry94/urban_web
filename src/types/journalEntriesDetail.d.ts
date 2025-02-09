import { JournalEntries } from "./journalEntries";
import { LedgerAccount } from "./ledgerAccount";
import { CostCenter } from "./costCenter";

export interface JournalEntriesDetail {
  _id: string;
  journalEntry: JournalEntries;
  ledgerAccount: LedgerAccount;
  costCenter: CostCenter | null;
  debit: number;
  credit: number;
}

export interface JournalEntriesDetailForm {
  journalEntry: string;
  ledgerAccount: string;
  costCenter: string;
  debit: number;
  credit: number;
}