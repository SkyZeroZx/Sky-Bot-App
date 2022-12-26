import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { StatusListChartReport } from '@core/interfaces';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { labels, polarChartOptions } from '@core/config';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-polar',
  templateUrl: './dashboard-polar.component.html',
  styleUrls: ['./dashboard-polar.component.scss'],
})
export class DashboardPolarComponent {
  @Input()
  statusListChartReport: StatusListChartReport;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  polarAreaChartType: ChartType = 'polarArea';
  polarCharsPlugin = [DataLabelsPlugin];
  polarChartOptions: ChartConfiguration['options'] = polarChartOptions;
  polarAreaChartData: ChartData<'polarArea'> = {
    labels: labels,
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnChanges(): void {
    this.loadPolarChart();
  }

  loadPolarChart(): void {
    this.polarAreaChartData.datasets[0].data = [
      this.statusListChartReport.totalObserved,
      this.statusListChartReport.totalFinalized,
      this.statusListChartReport.totalProcessing,
      this.statusListChartReport.totalRegister,
    ];

    this.chart?.update();
  }
}
