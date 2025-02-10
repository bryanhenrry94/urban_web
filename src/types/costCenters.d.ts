export interface ICostCenters {
  name: string;
}

export interface ICostCentersAPI {
  _id: string;
  name: string;
}

export type CostCentersContextProps = {
  rows: ICostCentersAPI[] | null;
  isLoading: boolean;
  modeEdit: boolean;
  costCenters: ICostCentersAPI[] | null;
  openModal: boolean;
  costCenterSelected: ICostCentersAPI | null;
  search: string;
  setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
  loadCostCenters: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: React.Dispatch<React.SetStateAction<ICostCentersAPI[] | null>>;
  setCostCenterSelected: React.Dispatch<
    React.SetStateAction<ICostCentersAPI | null>
  >;
  handleFilter: (search: string) => void;
  handleSave: (data: ICostCenters) => void;
  handleDelete: () => void;
  handleEdit: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
