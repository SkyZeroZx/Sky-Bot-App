import { StatusChartsReport, StatusListChartReport } from '@core/interfaces';

export interface PreviewFile {
  result: string | ArrayBuffer;
  isDoc: boolean;
}

function IS_DOCX(type: string): boolean {
  return (
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
}

export function previewUrlFile(file: Blob): Promise<PreviewFile> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res({ result: e.target.result, isDoc: IS_DOCX(file.type) });
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
}

export function formatedStatusChartsData(
  res: StatusChartsReport[],
): StatusListChartReport {
  const listDays = res.map(({ date }) => date);
  const listRegister = res.map(({ register }) => +register);
  const listProcessing = res.map(({ processing }) => +processing);
  const listObserved = res.map(({ observed }) => +observed);
  const listFinalized = res.map(({ finalized }) => +finalized);

  const totalRegister = listRegister.reduce((previous, current) => previous + current, 0);
  const totalObserved = listObserved.reduce((previous, current) => previous + current, 0);
  const totalProcessing = listProcessing.reduce(
    (previous, current) => previous + current,
    0,
  );
  const totalFinalized = listFinalized.reduce(
    (previous, current) => previous + current,
    0,
  );

  return {
    listDays,
    listRegister,
    listProcessing,
    listObserved,
    listFinalized,
    totalRegister,
    totalObserved,
    totalProcessing,
    totalFinalized,
  };
}
