export interface IAccountingPeriod {
  name: string;
  start_date: Date;
  end_date: Date;
  status: "open" | "closed";
}

export interface IAccountingPeriodAPI {
  _id: string;
  tenant: string;
  name: string;
  start_date: Date;
  end_date: Date;
  status: "open" | "closed";
  created_at: Date;
  updated_at: Date;
}

export type AccountingPeriodContextProps = {
  rows: IAccountingPeriodAPI[] | null;
  isLoading: boolean;
  openModal: boolean;
  modeEdit: boolean;
  rowSelected: IAccountingPeriodAPI | null;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSave: (data: IAccountingPeriod) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setRowSelected: React.Dispatch<
    React.SetStateAction<IAccountingPeriodAPI | null>
  >;
  loadData: () => Promise<void>;
};
