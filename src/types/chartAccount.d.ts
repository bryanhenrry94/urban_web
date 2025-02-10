export interface IChartAccount {
  code: string;
  name: string;
  type: string;
  level: number;
  parent_account: string;
  children: ChartAccount[];
}

export interface IChartAccountAPI {
  _id: string;
  code: string;
  name: string;
  type: string;
  level: number;
  parent_account: string;
  children: ChartAccount[];
}

export interface IAccount {
  code: string;
  name: string;
  type: string;
  level: number;
  parent_account: string;
}
