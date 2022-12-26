export interface StatusChart {
  dateRange: string[] | Date[];
  id?: string | number;
}

export interface StatusChartsReport {
  date: string;
  register: string;
  processing: string;
  observed: string;
  finalized: string;
}

export interface StatusListChartReport {
  listDays: string[];
  listRegister: number[];
  listProcessing: number[];
  listObserved: number[];
  listFinalized: number[];
  totalRegister: number;
  totalProcessing: number;
  totalObserved: number;
  totalFinalized: number;
}

export interface CardsStatus {
  totalRegister: number;
  totalProcessing: number;
  totalObserved: number;
  totalFinalized: number;
}
