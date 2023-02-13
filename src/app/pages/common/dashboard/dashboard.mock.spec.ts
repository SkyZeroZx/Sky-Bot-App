import {
  CreateDocument,
  Document as IDocument,
  Response,
  StatusChart,
  StatusListChartReport,
} from '@core/interfaces';

export class DashBoardMock {
  static readonly document: IDocument = {
    idDocument: 1,
    name: 'AWESOME NAME',
    requirements: 'AWESOME REQUIRED',
  };

  static readonly listDocument: IDocument[] = [this.document];

  static readonly statusListChartReport: StatusListChartReport = {
    listDays: ['2022-10-01', '2022-10-02', '2022-10-03', '2022-10-04', '2022-10-05'],
    listRegister: [1, 2, 3, 4, 5],
    listProcessing: [1, 2, 3, 4, 5],
    listObserved: [1, 2, 3, 4, 5],
    listFinalized: [1, 2, 3, 4, 5],
    totalRegister: 25,
    totalProcessing: 25,
    totalObserved: 25,
    totalFinalized: 25,
  };

  static readonly statusChart: StatusChart = {
    dateRange: [new Date().toDateString(), new Date().toDateString()],
    id: '1',
  };
}
