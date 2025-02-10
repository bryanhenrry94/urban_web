import {
  JournalEntriesDetail,
  JournalEntriesDetailForm,
} from "./journalEntriesDetail";

export interface IJournalEntries {
  _id: string;
  date: Date;
  description: string;
  details?: JournalEntriesDetail[];
}

export interface IJournalEntriesForm {
  date: Date;
  description: string;
  details: {
    account: string;
    debit: number;
    credit: number;
    cost_center: string | null;
  }[];
}

export interface JournalEntriesFormProps {
  id?: string;
}

export interface JournalEntriesTableProps {
  row: IJournalEntries;
}
