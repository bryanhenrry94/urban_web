import {
  JournalEntriesDetail,
  JournalEntriesDetailForm,
} from "./journalEntriesDetail";

export interface IJournalEntries {
  _id: string;
  reference: string;
  description: string;
  date: Date;
  details?: JournalEntriesDetail[];
}

export interface IJournalEntriesForm {
  reference: string;
  description: string;
  date: Date;
  details: {
    ledgerAccount: string;
    debit: number;
    credit: number;
    costCenter: string | null;
  }[];
}

export interface JournalEntriesFormProps {
  id?: string;
}

export interface JournalEntriesTableProps {
  row: IJournalEntries;
}
