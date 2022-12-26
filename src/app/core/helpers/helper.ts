import { StatusChartsReport, StatusListChartReport } from '@core/interfaces';

export function previewUrlFile(file): any {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
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
